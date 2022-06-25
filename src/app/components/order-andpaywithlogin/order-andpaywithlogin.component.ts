import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-andpaywithlogin',
  templateUrl: './order-andpaywithlogin.component.html',
  styleUrls: ['./order-andpaywithlogin.component.css'],
})
export class OrderAndpaywithloginComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private dialogRef: MatDialog,
    private toast:NgToastService
  ) {}
  exform:any=FormGroup;
  handler: any = null;
  public total: any;
  public checkval: any;
  public checkpayval: any;
  public userIdcheck: any | null;

  ngOnInit(): void {
    // this.userIdcheck = 0;
    console.warn('1');
    let checktoken: any | null = localStorage.getItem('cart_auth');

    // var datacheck = JSON.parse(checktoken);

    if (checktoken == null) {
      this.alldata();
    }
    console.warn('2');
    let totaldata: any = localStorage.getItem('total');
    var totalvalue = JSON.parse(totaldata);
    console.warn('after login total', totalvalue);
    this.total = totalvalue;

    //Vlidation
    this.exform = new FormGroup({
      'country':new FormControl(null,[Validators.required]),
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

  OrderData(data: any) {
    console.warn('order ts file', data);
    localStorage.setItem('order', JSON.stringify(data));

    let cartIda: any = localStorage.getItem('session');
    let user: any = localStorage.getItem('u_d_a_t');
    let orderget: any = localStorage.getItem('order');

    var cartdetails = JSON.parse(cartIda);
    var userdetails = JSON.parse(user);
    var Orderdetails = JSON.parse(orderget);

    let checktoken: any | null = localStorage.getItem('cart_auth');
    //var datacheck = JSON.parse(checktoken);

    if (checktoken == null) {
      let guestdataset: any = localStorage.getItem('guest');
      console.warn('step3 start---------------->', guestdataset);
      var guestdata = JSON.parse(guestdataset);
      console.warn('no data please register user as a guest!', guestdata);
      this.userIdcheck = guestdata;
      // console.warn('---->',this.userIdcheck);
    } else {
      this.userIdcheck = userdetails;
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
        localStorage.setItem('order_id', JSON.stringify(result));
        console.warn('result----->order', result);
        this.toast.success( {detail:"success",summary:"Order is Created",duration:4000})
      },
      error:(err:HttpErrorResponse)=>{
        this.toast.error( {detail:"ErrorMessage",summary:"Try again ",duration:4000})
      }
    }
      
    
    
    
    );
  }




  alldata() {
    var data = {
      Uname: 'guset',
      Email: 'shoppingcart!15624@yahoo.com',
      Mobile: 5555,
      Address: '',
      Password: 'gusest1948024356!@gmail.com',
    };
    this.api.addUser(data).subscribe((result) => {
      localStorage.setItem('guest', JSON.stringify(result));
      console.warn('step1 ---------------->', result);
      //this.router.navigate(['/login']);
    });
  }



    historybutton()
   {
     this.addToHistory();
    //this.clearData()
   }

   pay(amount: any) {
    
     this.addDataPayment();
     
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JPqzpEHePfS4DcY26HcfUsd5ydoKvjXZQeMBkjIPRwqM0urh75TfUETIajFVRMSHZShKHbEVwV61a8JhXQQRpZF00oOqHxPeh',
      locale: 'auto',
      token: function (token: any) {
        console.warn('stripe token', token);
        //this.historybutton;

       
        alert('Token Created!!');
        this.fornavigate();

      },

      
      
    });


    handler.open({
      name: 'Payments',
      description: 'Pay',
      amount: amount * 100,
    });

    this.fornavigate();

  }

fornavigate()
{
  this.router.navigate(['/bill']);
}

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

            console.warn('this is load stripe');
            alert('Payment Success!!');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }




  async addDataPayment() {
    console.warn('payment methord');

    console.warn('-------------------------');
    let totalValue: any | null = localStorage.getItem('total');
    console.warn('---------', totalValue);

    let checktoken: any = localStorage.getItem('cart_auth');
    console.warn('-------------------------1', checktoken);
    //  var datacheck:any = JSON.parse(checktoken);
    console.warn('-------------------------2');
    let checkuid: any | null = localStorage.getItem('u_d_a_t');
    var datacheckuid = JSON.parse(checkuid);
    console.warn('-------------------------3');
    if (checktoken == null) {
      console.warn('-------------------------4');
      let guestdataset: any = localStorage.getItem('guest');
      console.warn('step start---------------->', guestdataset);
      var guestdata = JSON.parse(guestdataset);

      console.warn('no data please register user as a guest!', guestdata);
      this.userIdcheck = guestdata;
    } else {
      console.warn('-------------------------5', datacheckuid.id);
      this.userIdcheck = datacheckuid;
    }
    var paymentdata = {
      Amount: totalValue,
      UserId: this.userIdcheck.id,
    };
    console.warn('-------------------------6');
    this.api.AddPayment(paymentdata).subscribe((res) => {
      console.warn('-------------------------7');
      console.warn('addPayment', res);
      localStorage.setItem('payment_Id', JSON.stringify(res));
      this.historybutton();
      
    });
    // await  this.addToHistory();
    //await  this.addToHistory();
  }




  addToHistory() {
    console.warn('history methord start');

    let paymentDetails: any = localStorage.getItem('payment_Id');
    console.warn('history methord---get payment Id', paymentDetails);
    var payId = JSON.parse(paymentDetails);
    var paymentId = {
      PaymentId: payId.id,
    };
    console.warn('History methoerd data =', paymentId);
    this.api.AddHistory(paymentId).subscribe((res) => {
      console.warn('History function get payment id', res);
      console.warn("clear data ----------------------------------------------- after pay")
     localStorage.removeItem('guest');
     localStorage.removeItem('order');
    });
  }


  // emaildetails() {
  //   let b:any;
  //   this.api.SendEmail(b).subscribe((result) => {
  //     console.warn(result);
  //     //this.router.navigate(['/login']);
  //   });
  // }

  clearData() {
    //
    // localStorage.removeItem("cart_auth");
    console.warn("clear data ----------------------------------------------- after pay")
    // localStorage.removeItem('total');
    // localStorage.removeItem('guest');
    // localStorage.removeItem('order');
    // localStorage.removeItem('session');
    // localStorage.removeItem('u_d_a_t');
    // localStorage.removeItem('order_id'); 
    // localStorage.removeItem('payment_Id');

    //
    // localStorage.removeItem('total');
    // localStorage.removeItem('guest');
    // localStorage.removeItem('order');
    // localStorage.removeItem('session');
  }
}
