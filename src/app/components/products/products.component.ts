import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList : any ;
  public itemcount :number | undefined;
 
 public message: string  = "hello gehan";
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private router: Router,private toast:NgToastService,private api : ApiService,private cartService : CartService,private readonly sanitizer: DomSanitizer) {
    //var a = api.getProduct;
    
   }

   sendMessage()
   {
     this.messageEvent.emit(this.message)
   }

   

  ngOnInit(): void {
    // this.api.getProduct().subscribe(res=>{
    //   this.productList = res;

    //   this.productList.forEach((a:any)=>{
    //     Object.assign(a,{quantity:1,total:a.price});
    //   });
    // })

    this.api.getAllProducts().subscribe(res=>{
      this.productList=res;
      console.warn("get all products",res);
    })
  }






  addtocart(item:any)
  {
    console.warn("call the event -->",this.itemcount)
    console.warn("check--create cart",item.pUnit)
    console.warn("check-->>>>>>>>>>>>--create cart",item.id)
    var data={
      name:item.productName,
      image:item.image,
      description:item.pDescription,
      price:item.pPrice,
      quantity:item.pUnit,
      totalpro:item.pUnit*item.pPrice,
      Qty: item.pQty,
      ProductId:item.id,
    };

      console.warn("tempdata",data);
     // console.warn("itemcount",this.itemcount)
  //  this.api.createCart().subscribe((result)=>{
  //  // this.cartId=result;
  //  var datcart = result;
  //   console.warn("cart data",datcart);
  // }),


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
                this.toast.success( {detail:"",summary:item.pUnit+" Product added succesfully",duration:2000})
            })
         }
    },)
    
// for original------------------
  
  //   this.api.addtocartDatalist(data).subscribe(
  //   {  
  //    next:(result:any)=>{
  //     console.warn("item result2",result);
  //     this.toast.success( {detail:"success",summary:item.pUnit+" Product added succesfully",duration:2000})
      
  //     }, 
  //     error:(err:HttpErrorResponse)=>{
       
  //       this.toast.error( {detail:"ErrorMessage",summary:"try again later",duration:2000})
  //     },
  //   }
  // )

  //---------------------------

  // console.warn(data);
  //   this.api.addUser(data)
  //   .subscribe((result)=>{
  //     console.warn(result);
  //     this.router.navigate(['/login']);
  //   });
  }
  inc(prod :any)
  {
    console.warn("increesedata ->->inc")
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
