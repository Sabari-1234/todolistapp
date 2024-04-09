import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get(environment.URL).pipe(map((response) => response));
  }
  getSingleTodo(id: any) {
    return this.http
      .get(`${environment.URL}/${id}`)
      .pipe(map((response) => response));
  }
  postTodos(data: any) {
    return this.http
      .post(environment.URL, data)
      .pipe(map((response) => response));
  }
  deleteTodos(id: any) {
    return this.http
      .delete(`${environment.URL}/${id}`)
      .pipe(map((response) => response));
  }

  updateTodos(id: any, data: any) {
    return this.http
      .put(`${environment.URL}/${id}`, data)
      .pipe(map((response) => response));
  }
}
