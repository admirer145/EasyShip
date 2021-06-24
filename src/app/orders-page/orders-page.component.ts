import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';  
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})

export class OrdersPageComponent implements OnInit {
  orders;
  ordersProduct = new Array();

  constructor(public orderService: OrderService, public productService: ProductService, 
              public userService: UserService, public router: Router ) { 
  }

  ngOnInit(): void {
    if(!this.userService.getUserAuthentication()){
      this.router.navigateByUrl('/login');
    }else{
      this.orderService
          .getOrdersByEmail(this.userService.getUserEmail())
          .subscribe(data => {
            console.log("Got the data ", data, " with message ", data["message"]);
            if(data["message"]){
              this.orders =  data["message"];
            
              this.orders.forEach(element => {
                
                this.productService
                    .getProductById(element['productId'])
                    .subscribe(
                        data => {
                          console.log("Got the data at service ", data);
                          let productById = data["message"];
                          console.log(`current element` , element , ` gives product `,  productById);
                          if(productById && Object.keys(productById).length){
                            productById['productQuantity'] = element['productQuantity'];
                            this.ordersProduct.push(productById);
                          }
                        },
                        err =>{
                          console.log("Error while fetching the products ", err);
                        }
                    );
              }, 
              err =>{
                console.log("Error while fetching the orders ", err);
             }
          );
        }
      });
    }
  }
}