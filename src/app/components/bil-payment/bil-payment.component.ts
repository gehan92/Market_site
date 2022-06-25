import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { UserOptions } from 'jspdf-autotable';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

interface JsPDFWithPlugin extends jsPDF{
  autotable:(options:UserOptions)=>jsPDF
}

@Component({
  selector: 'app-bil-payment',
  templateUrl: './bil-payment.component.html',
  styleUrls: ['./bil-payment.component.css']
})
export class BilPaymentComponent implements OnInit {

  public products :any = [];
  public grandTotal !: number;
  public totalprice :number | undefined;
  public num1 : number | undefined;
  public quntity :any;
  public timeset:any;

  public OrderUserName:any | null;
  public OrderUserLName:any | null;
  public State :any | null;
  public street:any | null;
  public emaildata:any | null;
  public mobile:any | null;

  @ViewChild('content',{static:true})el!: ElementRef
  constructor(private dialogRef:MatDialog,private router: Router,private api : ApiService,private cartService : CartService,private readonly sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res=>{
      this.products = res;
    })
    this.sumofProducts();
    this.issuDate()
    let orderget: any = localStorage.getItem('order');
    var Orderdetails = JSON.parse(orderget);

    this.OrderUserName=Orderdetails.fname;
    this.OrderUserLName=Orderdetails.lname;
    this.State=Orderdetails.address;
    this.street=Orderdetails.uname;
    this.emaildata=Orderdetails.email;
    this.mobile=Orderdetails.mobile;

  }
  
issuDate()
{
  let now = new Date();
  //dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  let millisecond= now.getMilliseconds();
  let second=now.getSeconds();
  let day=now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate()
  this.timeset=day
}

gotomain()

{
  this.emaildetails()
  this.clearData();
  this.router.navigate(['/home']);
}


emaildetails() {
  console.warn("eamil+++++-->",this.emaildata)
  let totalValue: any = localStorage.getItem('total');
  this.api.SendEmail(this.emaildata,totalValue).subscribe((result) => {
    console.warn(result);
    //this.router.navigate(['/login']);
  });
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




  sumofproductTotal(data:any)
  {
    this.totalprice=data;
  }

  clearData() {
    localStorage.removeItem('total');
    localStorage.removeItem('guest');
    localStorage.removeItem('order');
    localStorage.removeItem('session');
    localStorage.removeItem('u_d_a_t');
    localStorage.removeItem('payment_Id');
    localStorage.removeItem("cart_auth");
    localStorage.removeItem("temp_get _one_product");

    //temp_get _one_product
   

  }

  
  makePdf(){
    let pdf= new jsPDF('portrait','px','a4') as JsPDFWithPlugin;
    // pdf.autotable({
    //   this.el.
    // })
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        pdf.save('sampleone.pdf')
      }
    })
  }

}
