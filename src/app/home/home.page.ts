import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todoData!: any;
  isModalOpen = false;
  getData() {
    this.api.getTodos().subscribe(
      (res) => {
        this.todoData = res;
      },
      (err) => console.log(err)
    );
  }
  ngOnInit(): void {
    this.getData();
  }
  OSName = 'Unknown OS';
  constructor(private api: ApiService) {
    if (navigator.platform.indexOf('Win') !== -1) {
      this.OSName = 'Windows';
    } else if (navigator.platform.indexOf('Mac') !== -1) {
      this.OSName = 'MacOS';
    } else if (navigator.platform.indexOf('Linux') !== -1) {
      this.OSName = 'Linux';
    } else if (navigator.platform.indexOf('iPhone') !== -1) {
      this.OSName = 'iOS';
    } else if (navigator.platform.indexOf('Android') !== -1) {
      this.OSName = 'Android';
    }
    console.log('Operating System: ' + this.OSName);
  }

  ischecked: boolean[] = new Array(10);

  //model

  @ViewChild(IonModal) modal!: IonModal;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.isModalOpen = false;
    //setTimeout(() => {
    this.editData = {};
    this.isedit = false;
    //}, 3000);
  }

  // confirm() {
  //   this.modal.dismiss(this.name, 'confirm');
  // }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  isDateClicked = false;
  date() {
    this.isDateClicked = !this.isDateClicked;
  }
  submit(form1: any) {
    if (!this.isedit) {
      this.api.postTodos({ ...form1.value, status: false }).subscribe(
        (res) => {
          console.log(res);
          this.getData();
        },
        (err) => console.log(err)
      );
    } else {
      this.api.updateTodos(this.editData._id, form1.value).subscribe(
        (res) => {
          console.log(res);
          this.getData();
        },
        (err) => console.log(err)
      );
    }
  }

  checked(id: any, status1: boolean) {
    this.api.updateTodos(id, { status: !status1 }).subscribe(
      (res) => {
        console.log(res);
        this.getData();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  delete(id: any) {
    this.api.deleteTodos(id).subscribe(
      (res) => {
        console.log(res);
        this.getData();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  editData: any = {
    _id: '',
    taskName: '',
    date: '',
    status: '',
    startTime: '',
    endTime: '',
    description: '',
  };
  isedit = false;
  edit(id: any) {
    this.isedit = true;
    this.isModalOpen = true;
    this.api.getSingleTodo(id).subscribe(
      (todo) => {
        this.editData = todo;
        console.log(this.editData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openModel() {
    this.isModalOpen = true;
  }
}
