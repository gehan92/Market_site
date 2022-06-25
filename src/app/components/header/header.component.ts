import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  public storagecheck:any;
  public totalItem : number =0;
  public check:any | null;
  
  constructor(private api : ApiService,private cartService :CartService,private router:Router,private jwtHelper:JwtHelperService) { }

  isUserAuthenticated()
   {
    const token: string | null =localStorage.getItem("jwt")
    if(token && !this.jwtHelper.isTokenExpired(token))
    {
      console.warn("loged");
      return true;
    }else{
      console.warn("logout");
     return false;
    }
      
   };

  

  ngOnInit(): void {
    this.storagecheck=localStorage.length;
    console.warn("header",this.storagecheck)
    // this.cartService.getProducts().subscribe(res=>{
    //   this.totalItem = res.length;
    //   console.warn("-->",res)
    // });
   

   this.check=this.api.sample()
   console.warn("test",this.check)

  }


  afterlogin()
  {
    //this.logincheckvalue=1;
   // this.ngOnInit();
  }
  Logout1(){
    this.api.headerValue=1;
    
    this.ngOnInit();
  }
  Logout2(){
    this.api.headerValue=2;
   // this.ngOnInit;
  }

  test()
  {
    this.router
  }
  Logout()
  {
    // localStorage.removeItem('userToken');
    // this.router.navigate(['/login']);
    
    localStorage.removeItem("cart_auth");
    localStorage.removeItem('total');
    localStorage.removeItem('guest');
    localStorage.removeItem('order');
    localStorage.removeItem('session');
    localStorage.removeItem('u_d_a_t');
    localStorage.removeItem('order_id'); 
    localStorage.removeItem('payment_Id');
    localStorage.removeItem("temp_get _one_product");
  }

}
