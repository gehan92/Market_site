import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { HistorypopupComponent } from '../popupcomponent/historypopup/historypopup.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
//public histori:any=5;
public historyList : any| null  ;
public paymentList : any ;
public orderList : any ;
  constructor(private dialogRef:MatDialog,private router: Router,private toast:NgToastService,private api : ApiService,private cartService : CartService,private readonly sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.api.GetUserHistory().subscribe((res)=>{
    this.historyList=res;
      console.warn("history",res);
    //  this.getuserhistory();
    });
    this.api.getOrderData().subscribe((res)=>{
      console.warn("order",res);
    this.orderList=res;
    });
    this.api.Getpayments().subscribe((res)=>{
      console.warn("payments",res);
      this.paymentList=res;
    });
  }
getuserhistory(){
  for(var i :any=5 ; i<10;i++)
  {
    console.warn("check=>",i)
  }
}

openDialog(a:any)
  {
    this.api.historypopup2=a;
    this.dialogRef.open(HistorypopupComponent);
  }

}
