import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CartService } from './../cart.service';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-categories-women',
  templateUrl: './categories-women.component.html',
  styleUrls: ['./categories-women.component.css']
})
export class CategoriesWomenComponent implements OnInit {

  items:Array<Object>;
  cartItems: Array<object>;
  isAddedToCart = new Map<String, Boolean>();

  constructor(public cartService: CartService, public productService: ProductService,
              public router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.productService
        .getProductByFilter("women")
        .subscribe( data => {
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

  addToCart(id):void{
    this.isAddedToCart.set(id, true);
    console.log("Added to cart", this.isAddedToCart);
    this.cartService.addToCart(this.items.find((ele) => ele["productId"]==id));
  }
  onClickCategory(category: string): void{
    this.productService
        .getProductByCategory("women", category)
        .subscribe( data => {
          console.log(data);
            this.items  = data["message"];
            console.log("got men data", data["message"], " for category",category);
        },
        err => {
          console.log("got an error ", err);
        }
    );
  }
  deleteItem(id: string): void{
    this.productService
        .removeProductById(id)
        .subscribe(
          data => {
            if(data["message"]){
              console.log("Item Deleted Successfully");
              alert("Product Deleted Successfully");
              this.router.navigateByUrl('/categories', {state: {filter:"women"}});
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
