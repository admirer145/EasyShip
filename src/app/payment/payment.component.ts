import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { OrderService } from '../order.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  deliveryAddress: Object;
  totalPrice;

  constructor(public router: Router, public orderService: OrderService, public userService: UserService) { }

  ngOnInit(): void {
    console.log(history);
    if(!history.state.totalPrice){
        this.router.navigateByUrl('/checkout/address');
    }
    console.log(history.state);
    this.deliveryAddress = history.state.deliveryAddress;
    this.totalPrice = history.state.totalPrice;
    console.log(this.deliveryAddress);
  }
  cashOnDeliveryHandler(): void{
    // console.log("Order Succeeded at component level");
    this.orderService.updateOrderByEmail(this.userService.getUserEmail());
    alert("Order Succeeded");
    
    let userAddress = this.userService.getUserAddress();

    let indx = userAddress.findIndex(ele => ele['addressId'] == this.deliveryAddress['addressId']);

    if(indx == -1){
      this.userService
          .addUserAddressbyEmail(this.userService.getUserEmail(), this.deliveryAddress)
          .subscribe(
            data => {
              if(data["message"]){
                console.log("updated the address successfully");
              }else{
                console.log("address not updated successfully");
              }
            },
            err => {
              console.log("Error occured while updating the address ", err);
            }
          );
    }

    this.router.navigateByUrl('/orders');
  }
}
