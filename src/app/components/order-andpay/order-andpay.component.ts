import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-andpay',
  templateUrl: './order-andpay.component.html',
  styleUrls: ['./order-andpay.component.css'],
})


export class OrderAndpayComponent implements OnInit {

  //for validation
  exform:any=FormGroup;

  constructor(private api: ApiService, private router: Router,private toast:NgToastService) { }

  handler: any = null;
  public total: any;
  public checkval: any;
  public checkpayval: any;
  public userIdcheck: any | null;




  ngOnInit(): void {

    // this.userIdcheck = 0;  check loged or not
    let checktoken: any | null = localStorage.getItem('cart_auth');
    var datacheck = JSON.parse(checktoken);

    if (checktoken == null)
    {
      console.warn("token null register guest")
      this.alldata();
    }


    let totaldata: any = localStorage.getItem('total');
    var totalvalue = JSON.parse(totaldata);
    this.total = totalvalue;

    //Vlidation
    this.exform = new FormGroup({
      'uname':new FormControl(null,[Validators.required]),
      'fname':new FormControl(null,[Validators.required]),
      'lname':new FormControl(null,[Validators.required]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'address':new FormControl(null,[Validators.required,]),
      'city':new FormControl(null,[Validators.required]),
      'state':new FormControl(null,[Validators.required]),
      'zip':new FormControl(null,[Validators.required]),
      'mobile':new FormControl(null,[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]),   
    });
  }









  OrderData(data: any)
   {
    console.warn('order ts file', data);
    localStorage.setItem('order', JSON.stringify(data));

    //sessionStorage.setItem('sample',JSON.stringify(data))
    let cartIda: any = localStorage.getItem('session');
    var cartdetails = JSON.parse(cartIda);

    let user: any = localStorage.getItem('u_d_a_t');
    var userdetails = JSON.parse(user);

    let orderget: any = localStorage.getItem('order');
    var Orderdetails = JSON.parse(orderget);

   

    let checktoken: any | null = localStorage.getItem('cart_auth');
    var datacheck = JSON.parse(checktoken);


    if (checktoken == null) {

      let guestdataset: any = localStorage.getItem('guest');
      console.warn("step3 start---------------->", guestdataset);
      var guestdata = JSON.parse(guestdataset);

      console.warn('no data please register user as a guest!', guestdata);
      this.userIdcheck = guestdata;

    } 
    //update 21/06-------------> only else{}
    else if(checktoken != null)
    {
      this.userIdcheck = datacheck;
    }

    console.warn(Orderdetails.address);
    this.checkval = Orderdetails;

    // let Ordervalue :any=localStorage.getItem('order_details');
    // var  Orderdetails=JSON.parse(Ordervalue);

    console.warn('this.checkval', this.checkval);

    var orderidadata = {
      UserId: this.userIdcheck.id,
      CartId: cartdetails.id,
      Fname: Orderdetails.fname,
      Lname: Orderdetails.lname,
      Address1: Orderdetails.address,
      City: Orderdetails.address,
      State: Orderdetails.state,
      Zip: Orderdetails.zip,
      Email: Orderdetails.email,
      Mobile: Orderdetails.mobile,
    };

    this.api.orderData(orderidadata).subscribe(
      {
        next:(result) => {
          console.warn('result----->order', result);
          localStorage.setItem('order_id', JSON.stringify(result));
        
          this.toast.success( {detail:"success",summary:"Order is Created",duration:4000})
        },
        error:(err:HttpErrorResponse)=>{
          this.toast.error( {detail:"ErrorMessage",summary:"Try again ",duration:4000})
      }
  });
}





  //guset registerd data
  alldata() {

    let now = new Date();
    let millisecond= now.getMilliseconds();
    let second=now.getSeconds();

    console.warn("date",second)

    var data = {
      Uname: 'guset',
      Email: second+'shoppingcart'+millisecond+second+'@yahoo.com',
      Mobile: 55556,
      Address: '',
      Password: 'gusest1948024356!@gmail.com',
    };

    this.api.addUser(data).subscribe((result) => {
      localStorage.setItem('guest', JSON.stringify(result));
      console.warn("step1 ---------------->", result);
      //retuern guest details
    });
  }


  pay(amount: any) {

    this.addDataPayment() ;
    
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JPqzpEHePfS4DcY26HcfUsd5ydoKvjXZQeMBkjIPRwqM0urh75TfUETIajFVRMSHZShKHbEVwV61a8JhXQQRpZF00oOqHxPeh',
      locale: 'auto',
      token: function (token: any) {
        console.warn('stripe token', token);
        
        alert('Token Created!!');
      },
    });

    handler.open({
      name: 'Payments',
      description: 'Pay',
      amount: amount * 100,
    });
  }


  addDataPayment()
   {
    console.warn("start addPayment")
    let totalValue: any = localStorage.getItem('total');
    console.warn(totalValue);

    let checktoken: any | null = localStorage.getItem('cart_auth');
    var datacheck = JSON.parse(checktoken);

    if (checktoken == null) {

      let guestdataset: any = localStorage.getItem('guest');
      console.warn("step start---------------->addpayment", guestdataset);
      var guestdata = JSON.parse(guestdataset);

      console.warn('no data please register user as a guest!', guestdata);
      this.userIdcheck = guestdata;

    } else {
      this.userIdcheck = datacheck;
    }
    var paymentdata =
    {
      Amount: totalValue,
      UserId: this.userIdcheck.id
    }

    this.api.AddPayment(paymentdata).subscribe((res) => {
      console.warn("addPayment", res);
      this.router.navigate(['/bill']);
      //localStorage.setItem('payment_Id', JSON.stringify(res));
    });
  }


//   emaildetails() 
//   {
//     let a:any;
//     this.api.SendEmail(a).subscribe((result) => {
//       console.warn(result);
//       //this.router.navigate(['/login']);
    
//   });
// }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JPqzpEHePfS4DcY26HcfUsd5ydoKvjXZQeMBkjIPRwqM0urh75TfUETIajFVRMSHZShKHbEVwV61a8JhXQQRpZF00oOqHxPeh',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);

            alert('Payment Success!!');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }

  clearData() {
    localStorage.removeItem('total');
    localStorage.removeItem('guest');
    localStorage.removeItem('order');
    localStorage.removeItem('session');
  }


}
