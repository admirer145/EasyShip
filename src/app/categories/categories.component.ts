import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CartService } from './../cart.service';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  brand:string;
  items:Array<Object>;
  cartItems: Array<object>;
  isAddedToCart = new Map<String, Boolean>();

  constructor(public cartService: CartService, public productService: ProductService,
              public router: Router , public userService: UserService) { }

  ngOnInit(): void {
    if(history.state.filter){
      let route = '/categories/' + history.state.filter;
      this.router.navigateByUrl(route);
    }else{
      this.brand = history.state.brand;
      console.log("history.state ", history.state);
      this.productService
      .getProductByBrand(this.brand)
      .subscribe( 
          data => {
            console.log(data);
            this.items  = data["message"];
          },
          err => {
            console.log("got an error ", err);
          }
      );
      this.cartItems = this.cartService.getCartItems();
      this.cartItems.forEach((ele) => {
        console.log(ele);
        this.isAddedToCart.set(ele["productId"], true);
      });
    }
  }

  addToCart(id):void{
    this.isAddedToCart.set(id, true);
    console.log("Added to cart", this.isAddedToCart);
    this.cartService.addToCart(this.items.find((ele) => ele["productId"]==id));
  }
  deleteItem(id: string): void{
    this.productService
        .removeProductById(id)
        .subscribe(
          data => {
            if(data["message"]){
              console.log("Item Deleted Successfully");
            }else{
              console.log("Error while deleting the product");
            }
          },
          err =>{
            console.log("Error while deleting the product ", err);
          }
        );
  }
}
