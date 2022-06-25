import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-subnavbar',
  templateUrl: './subnavbar.component.html',
  styleUrls: ['./subnavbar.component.css']
})
export class SubnavbarComponent implements OnInit {

  constructor() { }
  public  checkVal:any;
  ngOnInit(): void {
    this.userLoged()
  }

  userLoged()
  {
    this.checkVal=1;
  }
  userLogedout()
  {
    this.checkVal=0;
  }

}
