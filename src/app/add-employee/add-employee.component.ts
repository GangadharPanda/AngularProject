import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../services/customer-service.service';
import { Router } from '@angular/router';
import { AppError } from '../error/app-error';
import { BadInput } from '../error/bad-input';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
    firstName:String;
	  lastName:String;
	  email:String;
  constructor(private services: CustomerServiceService
    ,private router :Router,
    private notificattionService:NotificationService
    ) { }

  ngOnInit() {
  }

  saveCustomer(form)
  {
    console.log("Form Value---",form.value);
    debugger;
    if(form.valid)
    {
      this.services.saveCustomer(form.value).subscribe(data => {
        console.log(data);
        this.notificattionService.showSuccess("Added Successfully!","Success!");
        this.router.navigate(['/employee-list']);
      }
      ,(error:AppError)=>{
  
        if(error instanceof BadInput)
          {
            this.notificattionService.showSuccess(error.originalError,"Error!");
          }
        else
          throw Error;
        
      }
      );
    }
    else
    {
      
    }
  }
}
