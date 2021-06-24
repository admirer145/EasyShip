import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})

export class CartPageComponent implements OnInit {
  totalPriceOfProducts;
  cartItems;
  isUserAuthenticated:boolean;
  totalItemLength;

  constructor(public router: Router , public cartService: CartService, public userService: UserService) {
  }

  ngOnInit(): void {
    this.isUserAuthenticated = this.userService.getUserAuthentication(); 
    this.cartItems = this.cartService.getCartItems();
    this.totalPriceOfProducts = this.getTotalPrice();

    if(this.cartItems){
      this.totalItemLength = this.cartItems.length;
    }
  }

  placeOrder(): void{
    console.log("Order placed for price", this.totalPriceOfProducts );
    if(this.isUserAuthenticated){
      this.router.navigateByUrl('/checkout/address');
    }else{
      this.router.navigateByUrl('/login');
    }
  }
  getTotalPrice(): number{
    let totalPrice:number = 0;
    this.cartItems.forEach(element => {
      totalPrice+=(element.productPrice*element.productQuantity);
    });
    return totalPrice;
  }
  removeProduct(id: string): void{
    let indx = this.cartItems.findIndex((item)=> item.productId == id);
    if(indx!=-1){
      console.log("Item removed successfully");
      this.totalPriceOfProducts -= (this.cartItems[indx].productPrice * this.cartItems[indx].productQuantity);
      this.totalItemLength -= this.cartItems[indx].productQuantity;
      this.cartItems[indx].productQuantity = 1;
      this.cartItems.splice(indx, 1);
    }else{
      console.log("No such item exist for id ", id);
    }
  }

  quantityDecrement(indx): void{
    this.cartItems[indx].productQuantity =  this.cartItems[indx].productQuantity - 1;
    this.totalPriceOfProducts -= this.cartItems[indx].productPrice;
    this.totalItemLength -= 1;
  }
  
  quantityIncrement(indx): void{
    this.cartItems[indx].productQuantity =  this.cartItems[indx].productQuantity + 1;
    this.totalPriceOfProducts += this.cartItems[indx].productPrice;
    this.totalItemLength += 1;
  }
}
