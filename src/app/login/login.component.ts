import { Component, OnInit } from '@angular/core';
import { FormsModule, Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../services/customer-service.service';
import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router :Router,
    private services: CustomerServiceService,
    private authService: AuthService,
    private notificattionService:NotificationService) { }
  userName:string="";
  password:string="";
  errorMesaage:String='';
  
  ngOnInit() {
  }
  doLogin(f:NgForm)
  {
    if(f.invalid)
    {
      this.errorMesaage="Please correct the Errors!";
    }
    else
    {
      this.services.doLoginService(f.value.email,f.value.password).subscribe(data => {
        console.log(data);
        this.authService.isLoggedIn=true;
        this.notificattionService.showSuccess("Logged In Succesfully!","Success!")
        this.router.navigate(['/home']);
      }
      ,error=>{
        debugger;
              console.log(error.error.message);
              this.notificattionService.showSuccess(error.error.message,"Error!")
              this.errorMesaage=error.error.message;
            }
      );
    }
    
  }
  

}
