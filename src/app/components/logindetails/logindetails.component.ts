import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';

import { HeaderComponent } from '../header/header.component';
import { SubnavbarComponent } from '../subnavbar/subnavbar.component';

@Component({
  selector: 'app-logindetails',
  templateUrl: './logindetails.component.html',
  styleUrls: ['./logindetails.component.css'],
})
export class LogindetailsComponent implements OnInit {
  exform: any=FormGroup;
 

  isLoginError: boolean = false;
  invalidLogin: boolean | undefined;
  parentPost:any;

  constructor(private api: ApiService, private router: Router,private toast:NgToastService) {}

 
  ngOnInit(): void {
    this.exform = new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,[Validators.required,])
    });
  }
  
  userLoginMethord(data: any) {
    // console.warn(data);
   

    this.api.userLogin(data).subscribe(


      { 
        next: (result: any) => {
       
        var userdata = JSON.stringify(result);
        var getuserData = JSON.parse(userdata);
        var localdata_userData = {
          id: getuserData.id,
          name: getuserData.name,
          email: getuserData.email,
        };
        
        localStorage.setItem('u_d_a_t', JSON.stringify(localdata_userData));
        console.warn('user private data', localdata_userData);
        const token = (<any>result).accessToken;
        localStorage.setItem('cart_auth', token);
        this.invalidLogin = false;
        this.getUser(token);
        this.toast.success( {detail:"success",summary:"Login is success",duration:4000})
        this.router.navigate(['/home']);
        console.warn(result);

        //https://www.youtube.com/watch?v=NSQHiIAP7Z8
      },
      error:(err:HttpErrorResponse)=>{
           //this.isLoginError=true;
           this.toast.error( {detail:"ErrorMessage",summary:"try again later",duration:4000})
         },
         
      


    }






      
      // err=>
      // {
      //   this.invalidLogin=true;
      // }

      //  (error:HttpErrorResponse)=>{
      //    this.isLoginError=true;
      //  }
    );
  }

//check headerValues
  private getUser(getTokenVal: string) {
    console.warn('login page 123456');
    var data = JSON.parse(atob(getTokenVal.split('.')[1]));
    //var datanew = JSON.parse(data);
   //  localStorage.setItem('token_data', JSON.stringify(data));
    console.warn('login page', data.id);
    return data;
  }

  


}
