import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';

import {LoginComponent} from './login/login.component'
import { SignupComponent } from './signup/signup.component';

import { ElectronicsComponent } from './components/productcategory/electronics/electronics.component';
import { FasionComponent } from './components/productcategory/fasion/fasion.component';
import { HelthComponent } from './components/productcategory/helth/helth.component';
import { SportComponent } from './components/productcategory/sport/sport.component';
import { HomeandgardenComponent } from './components/productcategory/homeandgarden/homeandgarden.component';
import { ArtsComponent } from './components/productcategory/arts/arts.component';
import { MotorsComponent } from './components/productcategory/motors/motors.component'; 
import { HistoryComponent } from './components/history/history.component';

import { HistorypopupComponent } from './components/popupcomponent/historypopup/historypopup.component';

import { SubnavbarComponent } from './components/subnavbar/subnavbar.component';
import { AuthGuardService } from './services/auth-guard.service';

import { OrderAndpayComponent } from './components/order-andpay/order-andpay.component';



import { PopupComponent } from './components/popupcomponent/popup/popup.component';
import { OrderAndpaywithloginComponent } from './components/order-andpaywithlogin/order-andpaywithlogin.component';
import { BilPaymentComponent } from './components/bil-payment/bil-payment.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'cart',component:CartComponent,},

//sub nav bar
  // {path:'electronic',component:ElectronicsComponent,canActivate:[AuthGuardService]},
  {path:'electronic',component:ElectronicsComponent},
  {path:'fasion',component:FasionComponent},
  {path:'helth',component:HelthComponent},
  {path:'sport',component:SportComponent,},
  {path:'homeandgarden',component:HomeandgardenComponent,},
  {path:'arts',component:ArtsComponent,},
  {path:'motors',component:MotorsComponent,},

  {path:'history',component:HistoryComponent,canActivate:[AuthGuardService]},
  {path:'historypopup',component:HistorypopupComponent},

 
  {path:'historypopup',component:HistorypopupComponent},

//testing
  {path:'bill',component:BilPaymentComponent,},
  
  

 //ordrsand payment
//  {path:'orderAndPay',component:OrderAndpayComponent,canActivate:[AuthGuardService]},
{path:'orderAndPay',component:OrderAndpayComponent},
{path:'orderAndPayuser',component:OrderAndpaywithloginComponent,canActivate:[AuthGuardService]},

{path:'Popup',component:PopupComponent,canActivate:[AuthGuardService]},


 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
