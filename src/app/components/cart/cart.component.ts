import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { PopupComponent } from '../popupcomponent/popup/popup.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products :any = [];
  public grandTotal !: number;
  public totalprice :number | undefined;
  public num1 : number | undefined;
   public quntity :any;
  constructor(private dialogRef:MatDialog,private api : ApiService,private cartService : CartService,private readonly sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    
    this.cartService.getProducts().subscribe(res=>{
      this.products = res;
    
    })

    this.sumofProducts();
    
  }
 


  sumofProducts()
  {
    this.api.getCartItemData().subscribe(res=>{
      this.products=res;
      
      console.warn("check---->",this.products)
      let gradTotal =0;

      this.products.map((a:any)=>{
      gradTotal += a.totalpro; 
      console.warn("grand total----->",gradTotal)
    })

    this.sumofproductTotal(gradTotal)

    console.warn("sum->",gradTotal);

    localStorage.setItem('total',JSON.stringify(gradTotal))
   
    });

  }




  
  openDialog()
  {
    this.dialogRef.open(PopupComponent);
  }

  removeItem(k:any){
    // this.cartService.removeCartItem(item);
    this.api.DeleteCartItem(k).subscribe(res=>{
      this.ngOnInit();
      console.warn(res);
    });
  }

  // updateItem()
  // {
  //   this.quntity=1;
  // }
  // updateItemredo()
  // {
  //   this.quntity=0;
  // }

  inc(prod :any)
  {
    console.warn("increesedata ->->inc",prod)
    prod.quantity += 1;
    console.warn("increesedata ->->",prod.quantity)
    this.api.updateCartItem(prod,prod.cartId,prod.id).subscribe((res)=>
    {
      console.warn("After incresing",res);
      this.products=0;
      this.ngOnInit();
    });

    
  }

  dec(prod :any)
  {
    if(prod.quantity !=1){
      prod.quantity -= 1;
      this.api.updateCartItem(prod,prod.cartId,prod.id).subscribe((res)=>
    {
      console.warn("After incresing",res);
      this.ngOnInit();
    });
    }
  }

  emptycart(){
    this.cartService.removeAllCart();
  }
  
  removecartId()
  {
    localStorage.removeItem("session")
  }



  sumofproductTotal(data:any)
  {
    this.totalprice=data;
  }


  // getTotalPrice(): number{
  //   let gradTotal =0;
  //   this.cartItemList.map((a:any)=>{
  //     gradTotal += a.total;
  //   });
  //   return gradTotal;
  // }





}
