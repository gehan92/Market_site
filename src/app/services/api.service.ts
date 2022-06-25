import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { SubnavbarComponent } from '../components/subnavbar/subnavbar.component';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  constructor(private http: HttpClient){}

   url ="http://localhost:50656/api";
   public historypopup:any=934565412;
   public historypopup2:any;
   public headerValue:any;



  sample()
  {
    console.warn("test services",this.headerValue)
    return this.headerValue;
  }

   
  //product table- get product-------------------------------------------------------------
  getProduct()
  {
    return this.http.get<any>("http://localhost:50656/api/category/0/products")
    .pipe(map((res:any)=>{
      return res;
    })) 
  }
  getAllProducts()
  {
    return this.http.get<any>("http://localhost:50656/api/products")
    .pipe(map((res:any)=>{
      return res;
    })) 
  }



  //sub category---------------------------------------------------------------------------

  getartProduct()
  {
    return this.http.get<any>("http://localhost:50656/api/category/1/products")
    .pipe(map((res:any)=>{
      return res;
    })) 
  }
  getelectronicProduct()
  {
    return this.http.get<any>("http://localhost:50656/api/category/2/products")
    .pipe(map((res:any)=>{
      return res;
    })) 
  }
  getfasionProduct()
  {
    return this.http.get<any>("http://localhost:50656/api/category/3/products")
    .pipe(map((res:any)=>{
      return res;
    })) 
  }
  gethelthProduct()
  {
    return this.http.get<any>("http://localhost:50656/api/category/4/products")
    .pipe(map((res:any)=>{
      return res;
    })) 
  }
  gethomeandgardenProduct()
  {
    return this.http.get<any>("http://localhost:50656/api/category/6/products")
    .pipe(map((res:any)=>{
      return res;
    })) 
  }
  getmotorsProduct()
  {
    return this.http.get<any>("http://localhost:50656/api/category/8/products")
    .pipe(map((res:any)=>{
      return res;
    })) 
  }
  getsportProduct()
  {
    return this.http.get<any>("http://localhost:50656/api/category/5/products")
    .pipe(map((res:any)=>{
      return res;
    })) 
  }


//Cart--------------------------------------------------------------------------------
createCart()
{
  var datacart={
    cookieyId:"hahds225227hnhd",
    Status:"Activedata" 
  }
 return this.http.post("http://localhost:50656/api/cart",datacart)
}  



//add item to cart----------------------------------------------------------------------
 addtocartDatalist (data:any)
{
  console.warn("datalist api start-1")
  let cartIda :any=localStorage.getItem('session');
  var  cartdetails=JSON.parse(cartIda);
  console.warn("local data",cartdetails.id);
  var cartId=cartdetails.id
  return this.http.post("http://localhost:50656/api/cart/"+cartId+"/Items",data)
}

getCartItemData()
{
  console.warn("cart item get api start-2")
  let cartIda :any=localStorage.getItem('session');
  var  cartdetails=JSON.parse(cartIda);
  console.warn("local data",cartdetails.id)
  var dataId=cartdetails.id;
  return this.http.get<any>("http://localhost:50656/api/cart/"+dataId+"/Items")
    .pipe(map((res:any)=>{
      return res;
  })) 
}

getOneItem(data:any,j:any)
{
  console.warn("get one item")
  let cartIda :any=localStorage.getItem('session');
  var  cartdetails=JSON.parse(cartIda);

  console.warn("local data",cartdetails.id);

  var dataId=cartdetails.id;

  console.warn("show one item value",j);
  return this.http.get("http://localhost:50656/api/cart/"+dataId+"/Items/"+j)

}
getCartItemDataForPopup()
{
  console.warn("cart item get api start-2")
  let cartIda :any=localStorage.getItem('session');
  var  cartdetails=JSON.parse(cartIda);
  console.warn("local data",cartdetails.id)
  var dataId=cartdetails.id;
  return this.http.get<any>("http://localhost:50656/api/cart/"+this.historypopup2+"/Items")
    .pipe(map((res:any)=>{
      return res;
  })) 
}

DeleteCartItem(j:any)
{
  console.warn("delete cart item")
  let cartIda :any=localStorage.getItem('session');
  var  cartdetails=JSON.parse(cartIda);
  console.warn("local data",cartdetails.id);
  var dataId=cartdetails.id;
  console.warn("delete value",j);
  return this.http.delete("http://localhost:50656/api/cart/"+dataId+"/Items/"+j)
}

updateCartItem(ObjectData:any,cartId:any,userId:any)
{
/*  cartId: 934565979
created: "2022-06-09T16:48:32"
description: "motor product"
id: 137
image: "http://localhost:50656/Images/download (3).jpg"
name: "motor product"
price: 3200
productId: 3
qty: 65400
quantity: 5
totalpro: 3200*/
  var changeData=
  {
        productId: ObjectData.productId,
        name: ObjectData.name,
        image: ObjectData.image,
        description:ObjectData.description, 
        price:ObjectData.price,
        quantity: ObjectData.quantity,
        totalpro: ObjectData.price*ObjectData.quantity,
        qty: ObjectData.qty
  }

  console.warn("search update data 1",ObjectData)
  console.warn("changed services update data 2",changeData)
  console.warn("cart id",cartId)
  console.warn("user id",userId)

  console.warn("productId",ObjectData.ProductId)
  console.warn("qty",ObjectData.Qty)

  return this.http.put("http://localhost:50656/api/cart/"+cartId+"/Items/"+userId,changeData)
}

updateCartItem2(ObjectData:any,cartId:any,userId:any)
{
  var changeData=
  {
        productId: ObjectData.ProductId,
        name: ObjectData.name,
        image: ObjectData.image,
        description:ObjectData.description, 
        price:ObjectData.price,
        quantity: ObjectData.quantity,
        totalpro: ObjectData.price*ObjectData.quantity,
        qty: ObjectData.Qty
  }

  console.warn("search update data 1",ObjectData)
  console.warn("changed services update data 2",changeData)
  console.warn("cart id",cartId)
  console.warn("user id",userId)

  console.warn("productId",ObjectData.ProductId)
  console.warn("qty",ObjectData.Qty)

  return this.http.put("http://localhost:50656/api/cart/"+cartId+"/Items/"+userId,changeData)
}


  //user Table -user register-------------------------------------------------------
  addUser(data:any)
  {
    console.warn("useradd",data)
    return this.http.post("http://localhost:50656/api/auth/register",data);
  }

  //user Table - login--------------------------------------------------------------
   userLogin(loginData:any)
   {
     var reqHeader= new HttpHeaders({"Content-Type": "application/json"});
     return this.http.post("http://localhost:50656/api/auth/login",
     loginData,{headers:reqHeader});
   }

   //order data --------------------------------------------------------------------
   orderData(orderData:any)
   {
     console.warn("order service--->",orderData)
    return this.http.post("http://localhost:50656/api/order",orderData);
   }

   getOrderData()
   {
     //not completed
    let GetUid :any=localStorage.getItem('u_d_a_t');
    var  userId=JSON.parse(GetUid);
    return this.http.get("http://localhost:50656/api/order/"+userId.id+"/UserOrder");
   }





   //email------------------------
   SendEmail(emailTo:any,total:any)
   {
     console.warn("email data ----------------------------------->",emailTo)
     var emaildetails=
     {
       To:emailTo,
       Subject:"shopping cart",
       Body: "Thank you for Your Purchase!  your Amount paid $" +total
                      
     }
    return this.http.post("http://localhost:50656/api/email",emaildetails);
   }





   //payments----------------------
   AddPayment(jjj:any)
   {
     console.warn("add payment services",jjj)
    let OrderFulldata :any=localStorage.getItem('order_id');
    var  orderdetails=JSON.parse(OrderFulldata);
    var orderid=orderdetails.id;
    console.warn("Paymet app api run--->",orderid)
    return this.http.post("http://localhost:50656/api/user/order/"+orderid+"/payment",jjj);
   }
   Getpayments()
   {
     //not completed
    let GetUid :any=localStorage.getItem('u_d_a_t');
    var  userId=JSON.parse(GetUid);
    return this.http.get("http://localhost:50656/api/user/order/"+userId.id+"/payment");
   }

   //history------------------------
   AddHistory(orderData:any)
   {
    console.warn("history services")
    console.warn("history services order details",orderData)
    let GetUid :any=localStorage.getItem('u_d_a_t');
    var  userId=JSON.parse(GetUid);
    console.warn("history services get userId",userId.id)
    
    return this.http.post("http://localhost:50656/api/user/"+userId.id+"/history",orderData);
   }
   GetUserHistory()
   {
    let GetUid :any=localStorage.getItem('u_d_a_t');
    var  userId=JSON.parse(GetUid);
    return this.http.get("http://localhost:50656/api/user/"+userId.id+"/history");

   }

}


//https://fakestoreapi.com/products