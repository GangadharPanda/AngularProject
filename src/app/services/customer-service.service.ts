import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
 import 'rxjs/add/operator/catch';
 import 'rxjs/add/observable/throw';
 import {Observable} from 'rxjs/Observable';

import { AppError } from '../error/app-error';
import { NotFoundError } from '../error/not-found-error';
import { BadInput } from '../error/bad-input';

@Injectable()
export class CustomerServiceService {
  private baseurl:string='http://localhost:8080/spring-crm-rest/api';
  public employeeList:[];
  constructor(private http:HttpClient) 
  { 

  }
  doLoginService(userName:string,password:string)
  {
    let params = new HttpParams().set("email",userName).set("password", password);
    return this.http.get(this.baseurl+'/login',{params})
  }

//-------------------------------------------------------------------------------------------------

  getEmployeeList()
  {
    return this.http.get(this.baseurl+'/customers').catch(this.handleError)
  }
  deleteEmployee(id:number)
  {
       return this.http.delete(this.baseurl+'/customer/'+id).catch(this.handleError)
  }
  saveCustomer(json:JSON)
  {
       return this.http.post(this.baseurl+'/addcustomer',json).catch(this.handleError)
  }
  getEmployeeListWithPagination(pageNo:number,limit:number)
  {
    console.log("Pageno",pageNo  ,"limit" ,limit ,this.baseurl+'/customersp')
    let params = new HttpParams().set("page",pageNo+'').set("limit", limit+"");
    console.log(this.http.get(this.baseurl+'/customersp',{params}));
    return this.http.get(this.baseurl+'/customersp',{params}).catch(this.handleError)
  }
  private handleError(error:Response)
  {
    if(error.status==400)
     return Observable.throw(new BadInput(error.json));

    if(error.status==404)      
     return Observable.throw(new NotFoundError());     
           
   return Observable.throw(new AppError(error));
           
  }
//-------------------------------------------------------------------------------------------------
}
