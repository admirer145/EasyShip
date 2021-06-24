import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  orderItems;
  baseUrl;
  lastOrderId:number;
  constructor(public cartService: CartService, public httpClient: HttpClient, public datePipe: DatePipe) {
    this.baseUrl = environment.serverUrl;
    this.lastOrderId = Math.floor(Math.random() * 10000) + 100;
  }

  getOrdersByEmail(userEmail: string){
    var serverUrl = this.baseUrl + '/api/orders';
    let params = new HttpParams();
    params = params.append("userEmail", userEmail);

    return this.httpClient.get(serverUrl, {params:params});
  }

  getEstimatedDeliveryDateById(productId: string): String{
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    let newDate = this.datePipe.transform(currentDate, 'd MMM y');
    return newDate;
  }

  getOrderId(): string{
    this.lastOrderId += 1;
    return "order"+this.lastOrderId;
  }

  getTodaysDate(): string{
    let currentDate = this.datePipe.transform(new Date(), 'd MMM y');
    return currentDate;
  }

  updateOrderByEmail(userEmail): void{
    this.orderItems = this.cartService.getCartItems();
    let totalOrders = [];
    this.orderItems.forEach(element => {
      let orderObject = {
        email: userEmail,
        orderId: this.getOrderId(),
        productId: element.productId,
        productQuantity: element.productQuantity,
        orderDate: this.getTodaysDate(),
        expectedDeliveryDate: this.getEstimatedDeliveryDateById(element.productId)
      }
      totalOrders.push(orderObject);
    });

    this.cartService.clearCart();
    var serverUrl = this.baseUrl + '/api/orders/updateOrder';
    let params = new HttpParams();
    params = params.append("userEmail", userEmail);

    this.httpClient
        .put(serverUrl, totalOrders)
        .subscribe(data => {
          if(data["message"]){
            console.log("Orders updated succesfully ", this.orderItems);
          }else{
            console.log("Orders does not updated ", this.orderItems);
          }
        },
        err =>{
          console.log("Error occured while updating the data ", err);
        }
    );
  }

}
