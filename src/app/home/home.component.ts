import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public session:any;

  constructor(private api : ApiService,private cartService : CartService,private readonly sanitizer: DomSanitizer) { }

  


  ngOnInit(): void {

    var data :any | null = localStorage.length;
    console.warn("data length value ",data)
    


    //if(data==2)
    if(data==0||data==1)
    {
      this.createCart();
      // let cartIdDataset:any=localStorage.getItem('session');
      // var sessions:any = JSON.parse(cartIdDataset);
    }else{
      console.warn("home component error")
    }

    // if(data>1)
    // {
    // localStorage.removeItem('total');
    // localStorage.removeItem('guest');
    // localStorage.removeItem('order');
    // localStorage.removeItem('u_d_a_t');
    // localStorage.removeItem('payment_Id');
    // localStorage.removeItem('order_id');
    
    
    // }
    
  }

  
 async createCart()
  {
  await  this.api.createCart().subscribe((result)=>{
    localStorage.setItem('session',JSON.stringify(result))
    var datcart = result;
     console.warn("cart data",datcart);
  });
  }
  

}
