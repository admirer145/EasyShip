import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private cartItems:Array<Object>;

  constructor() {
    this.cartItems = [];
  }

  getCartItems(): Array<Object>{
    return this.cartItems;
  }

  getCartItemsLength(): number{
    let totalItems = 0;
    this.cartItems.forEach(ele => {
      totalItems += ele['productQuantity'];
    });
    return totalItems;
  }
  
  addToCart(item): void{
    console.log("got the item ", item);
    this.cartItems.push(item);
    console.log(this.cartItems);
  }
  clearCart(): void{
    this.cartItems.splice(0, this.cartItems.length);
  }
}
