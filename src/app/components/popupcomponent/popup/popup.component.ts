import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(private dialogRef:MatDialog,) { }

  ngOnInit(): void {
  }
  // openDialog()
  // {
  //   this.dialogRef.open(PopupComponent);
  // }
  closeDialog()
  {
    this.dialogRef.closeAll();
  }

}
