import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {RouterModule, Routes} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { CustomerServiceService } from './services/customer-service.service';
import { AppErrorHandler } from './error/app-error-handler';
import { SearchEmployeeComponent } from './search-employee/search-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';

import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {path: '',redirectTo: 'home',pathMatch: 'full'},
  {path: 'home',component: HomeComponent},
  {path: 'about',component: AboutUsComponent ,canActivate: [ AuthGuard ]},
  {path: 'employee-list',component: EmployeeListComponent},
  {path: 'add-employee',component: AddEmployeeComponent },
  {path: 'search-employee',component: SearchEmployeeComponent },
  {path: 'delete-employee',component: DeleteEmployeeComponent },
  {path: 'customer-registration',component: CustomerRegistrationComponent },
  {path: '**',component: LoginComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AboutUsComponent,
    NavbarComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    SearchEmployeeComponent,
    DeleteEmployeeComponent,
    CustomerRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule , 
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule ,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened:1,
      autoDismiss:true,
      timeOut:2000,
      closeButton:false

    })
  ],
  providers: [CustomerServiceService,
  AppErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
