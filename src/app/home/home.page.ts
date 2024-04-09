import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  OSName = 'Unknown OS';
  constructor() {
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
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

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
}
