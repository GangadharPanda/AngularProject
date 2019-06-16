import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private notifyService : NotificationService) { }
  title = 'Employee-Management';

  showToaster(){
    this.notifyService.showSuccess("Hello, I'm the toastr message.", "Notification")
}
}
