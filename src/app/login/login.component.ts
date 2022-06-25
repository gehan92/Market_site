import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    //private api:ApiService
    ) { }

  ngOnInit(): void {
  }

  // userLoginMethord(data:any)
  // {
  //   console.warn(data);
  //   this.api.userLogin(data).subscribe((result)=>{
  //     console.warn(result)
  //   });
  // }
  

}
