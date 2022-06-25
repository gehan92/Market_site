import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-historypopup',
  templateUrl: './historypopup.component.html',
  styleUrls: ['./historypopup.component.css']
})
export class HistorypopupComponent implements OnInit {

  constructor(private dialogRef:MatDialog,private router: Router,private api : ApiService,) { }
  public cartItems:any;
  ngOnInit(): void {
    this.api.getCartItemDataForPopup().subscribe((res)=>{
      console.warn(res);
      this.cartItems=res;
    })
  }
  
  closeDialog()
  {
    this.dialogRef.closeAll();
  }

}
