import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signupdetails',
  templateUrl: './signupdetails.component.html',
  styleUrls: ['./signupdetails.component.css']
})
export class SignupdetailsComponent implements OnInit {
  exform: any=FormGroup;

 // constructor() { }
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.exform = new FormGroup({
      'uname':new FormControl(null,Validators.required),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      // 'mobile':new FormControl(null,[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]),
      'mobile':new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required])
    });
  }

  
  getUserFormData(data:any)
  {
    console.warn(data);

    this.api.addUser(data)
    .subscribe((result)=>{
      console.warn(result);
      this.router.navigate(['/login']);
    });
    //.subscribe(next:this.router.navigate(command:['/login']))
    
  }

}
