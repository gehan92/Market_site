import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-helth',
  templateUrl: './helth.component.html',
  styleUrls: ['./helth.component.css']
})
export class HelthComponent implements OnInit {

  public productList : any ;
  constructor(private router: Router,private toast:NgToastService,private api : ApiService,private cartService : CartService,private readonly sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.api.gethelthProduct().subscribe(res=>{
    
      this.productList=res;
    })
  }


  
  addtocart(item:any)
  {
    var data={
      name:item.productName,
      image:item.image,
      description:item.pDescription,
      price:item.pPrice,
      quantity:item.pUnit,
      totalpro:item.pUnit*item.pPrice,
      Qty: item.pQty,
      ProductId:item.id};
      console.warn("tempdata",data);
  
    // this.api.addtocartDatalist(data).subscribe((result)=>{
    //   console.warn("item result",result);
    //   this.router.navigate(['/cart']);
    // })

    // this.api.addtocartDatalist(data).subscribe(
    //   {  
    //    next:(result:any)=>{
    //     console.warn("item result2",result);
    //     this.toast.success( {detail:"success",summary:item.pUnit+" Product added succesfully",duration:2000})
    //     //this.router.navigate(['/cart']);
    //     }, 
    //     error:(err:HttpErrorResponse)=>{
    //       //this.isLoginError=true;
    //       this.toast.error( {detail:"ErrorMessage",summary:"try again later",duration:2000})
    //     },
    //   }
    // )
    this.api.getOneItem(data,item.id).subscribe((result:any)=>{
      //var checkOutput=(result);
      localStorage.setItem('temp_get _one_product',JSON.stringify(result));
     
      let checkOutput :any=localStorage.getItem('temp_get _one_product');
      var  cartdetails=JSON.parse(checkOutput);

      let CartId :any=localStorage.getItem('session');
      var  CartData=JSON.parse(CartId);
      console.warn("cart Data=====>",CartData.id)
      console.warn("product id=====>",cartdetails.id)


      console.warn("add",cartdetails.status);
      if(cartdetails.status=="no data")
      {
             this.api.addtocartDatalist(data).subscribe(
           {  
               next:(result:any)=>{
                      console.warn("item result2",result);
                      this.toast.success( {detail:"success",summary:item.pUnit+" Product added succesfully",duration:2000})
               }, 
                error:(err:HttpErrorResponse)=>{
                      this.toast.error( {detail:"ErrorMessage",summary:"try again later",duration:2000})
               },
           }
         )

      }else{
       console.warn("update data",data)
         this.api.updateCartItem2(data,CartData.id,cartdetails.id).subscribe((res:any)=>{
             console.warn("update data")
             this.toast.success( {detail:"success",summary:item.pUnit+" Product added succesfully",duration:2000})
         })
      }
 },)
  
  }

  inc(prod :any)
  {
    prod.pUnit += 1;
      console.warn("increesedata ->->",prod.pUnit)
  }
  dec(prod :any)
  {
    if(prod.pUnit !=1){
      prod.pUnit -= 1;
    }
    
  }

}
