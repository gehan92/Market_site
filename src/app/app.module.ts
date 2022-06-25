import { NgModule } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupdetailsComponent } from './components/signupdetails/signupdetails.component';
import { LogindetailsComponent } from './components/logindetails/logindetails.component';
import { SubnavbarComponent } from './components/subnavbar/subnavbar.component';
import { ElectronicsComponent } from './components/productcategory/electronics/electronics.component';
import { FasionComponent } from './components/productcategory/fasion/fasion.component';
import { HelthComponent } from './components/productcategory/helth/helth.component';
import { SportComponent } from './components/productcategory/sport/sport.component';
import { HomeandgardenComponent } from './components/productcategory/homeandgarden/homeandgarden.component';
import { ArtsComponent } from './components/productcategory/arts/arts.component';
import { MotorsComponent } from './components/productcategory/motors/motors.component'; 

import { JwtModule } from '@auth0/angular-jwt';
import { HistoryComponent } from './components/history/history.component';
import { OrderAndpayComponent } from './components/order-andpay/order-andpay.component';
import { PopupComponent } from './components/popupcomponent/popup/popup.component';

import {MatDialogModule}from '@angular/material/dialog';
import { PayComponent } from './components/popupcomponent/pay/pay.component';
import { OrderAndpaywithloginComponent } from './components/order-andpaywithlogin/order-andpaywithlogin.component';
import { HistorypopupComponent } from './components/popupcomponent/historypopup/historypopup.component';
import { FooterComponent } from './components/footer/footer.component';
import { BilPaymentComponent } from './components/bil-payment/bil-payment.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


export function tokenGetter()
{
  return localStorage.getItem("jwt")
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    HomeComponent,
    SignupdetailsComponent,
    LogindetailsComponent,
    SubnavbarComponent,
    ElectronicsComponent,
    FasionComponent,
    HelthComponent,
    SportComponent,
    HomeandgardenComponent,
    ArtsComponent,
    MotorsComponent,
    HistoryComponent,
    OrderAndpayComponent,
    PopupComponent,
    PayComponent,
    OrderAndpaywithloginComponent,
    HistorypopupComponent,
    FooterComponent,
    BilPaymentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    NgToastModule,
    MatDialogModule,
    ReactiveFormsModule,
   
    JwtModule.forRoot(
      {
        config:{
          tokenGetter:tokenGetter,
          allowedDomains:["localhost:4200"],
          disallowedRoutes:[]
        }
      }
    )
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
