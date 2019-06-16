import { Component, Input, OnInit } from '@angular/core';
import { AppError } from '../error/app-error';
import { NotFoundError } from '../error/not-found-error';
import { Customer } from '../model/customer';
import { CustomerServiceService } from '../services/customer-service.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

   employeeList:Customer[];
   searchText:String;
   private  _pageNo:number=0;
   private  _limit:number=5;
   private  _totalNoOfRecords:number;
   @Input() isSearchNeeded: boolean=false;
   @Input()isDeleteNeeded: boolean=false;


  constructor(private services: CustomerServiceService, private notificattionService:NotificationService) { }

  ngOnInit() {
    this.employeeList=[];
    this.getEmployeeListWithPagination(this._pageNo,this._limit);
  }

/* This is to restrict to show the no of Rows it ll show */

//  makeTableScroll() {
  
//   var maxRows = 4;

//   var table = document.getElementById('myTable');
//   var wrapper = table.parentNode;
//   var rowsInTable = table.rows.length;
//   var height = 0;
//   if (rowsInTable > maxRows) {
//       for (var i = 0; i < maxRows; i++) {
//           height += table.rows[i].clientHeight;
//       }
//       wrapper.style.height = height + "px";
//   }
// }


  onSearchTextChange(event)
  {
    if(this.searchText=="")
    {
      this._pageNo=0;
      this._limit=2;
      this._totalNoOfRecords=0;
      this.ngOnInit();
    }
    else 
    {
    this.employeeList=this.employeeList.filter((res:Customer)=>{
      console.log("res.firstName",res.firstName)

      return  res.idDisplay.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
      ||res.firstName.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
      ||res.lastName.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
      ||res.email.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
      ||res.firstName.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase());

    });
  }
  }
  getEmployeeList()
  {
   
    this.services.getEmployeeList().subscribe((data:Customer[]) => {
      console.log(data);
      this.employeeList=data;
      this.employeeList.forEach(element => {
        element.idDisplay="IB"+element.id+"PN"
      });
      console.log(this.employeeList);
    }
    ,(error:AppError)=>{

      throw Error;
      
    }
    );
  }
  deleteEmployee(id:number)
  {
    var result = confirm("Are you sure to delete?");
    if(result)
    {
        this.services.deleteEmployee(id).subscribe((data:any) => {
          console.log(data);
          this.notificattionService.showSuccess("Deleted Successfully!","Success!");
          this.getEmployeeList();
        }
        ,(error:AppError)=>{

          if(error instanceof NotFoundError)
          this.notificattionService.showSuccess("Post already deleted!","Error!");
          else
          throw Error;
          
        });
      }
  }
  getEmployeeListWithPagination(pageNo:number,limit:number)
  {
   debugger;
   console.log("Before Call");
    this.services.getEmployeeListWithPagination(pageNo,limit).subscribe((data:any) => {
      console.log("After Response");
      console.log(data);
      this.employeeList=data.customers;
      console.log("After Response",this.employeeList);
      this._limit=(data.limit);
      this._pageNo=(data.page);
      this._totalNoOfRecords=(data.totalNoOfRecords);
      this.employeeList.forEach(element => {
        element.idDisplay="IB"+element.id+"PN"
      });
      console.log(this.employeeList);
    }
    ,(error:AppError)=>{

      throw Error;
      
    }
    );
  }

  /*************************************Pagination Related ************************************/
  firstPageClick()
  {
    this._pageNo=0;
    this.getEmployeeListWithPagination(this._pageNo,this._limit);
  }
  previousPageClick()
  {
    if(this._pageNo<=0)
    {
      this.getEmployeeListWithPagination(0,this._limit);
    }
    else
    {
      this._pageNo=this._pageNo-1;
      this.getEmployeeListWithPagination(this._pageNo,this._limit);
    }
  }
  nextPageClick()
  {
  
    console.log("Page No",this._pageNo);
    console.log("Limit",this._limit);
    if(this._pageNo<this.getTotalPages())
    {
      this._pageNo++;
    }
    else
    {
      this._pageNo=0;
    }
    this.getEmployeeListWithPagination(this.getTotalPages()-1,this._limit);
  }
  lastPageClick()
  {
    debugger;
      this.getEmployeeListWithPagination(this.getTotalPages()-1,this._limit);
  }

  getTotalPages():number
  {
    debugger;
    if(this._totalNoOfRecords%this._limit==0)
    {
     return this._totalNoOfRecords/this._limit;
    }
    else
    {
      return (this._totalNoOfRecords/this._limit)+1;
    }
  }
}
