import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    // private api:ApiService,private router:Router
    ) { }

  ngOnInit(): void {  
  }
 
  // getUserFormData(data:any)
  // {
  //   console.warn(data);
  //   this.api.addUser(data)
  //   .subscribe((result)=>{
  //     console.warn(result);
  //     this.router.navigate(['/login']);
  //   });



    //.subscribe(next:this.router.navigate(command:['/login']))
    
  }


