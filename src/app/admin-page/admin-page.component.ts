import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  addProductForm: FormGroup;
  constructor(public router: Router, public userService: UserService, public productService: ProductService) { }

  ngOnInit(): void {
    if( !this.userService.isAdmin()){
      this.router.navigateByUrl('/home');
    }else{
      this.addProductForm = new FormGroup({
        'productName': new FormControl('', Validators.required),
        'productBrand': new FormControl('', Validators.required),
        'productSeller': new FormControl('', Validators.required),
        'productPrice': new FormControl('', Validators.required),
        'productFilter': new FormControl('', Validators.required),
        'productCategory': new FormControl('', Validators.required),
        'productImage': new FormControl('', Validators.required)
      });
      console.log("Welcome Admin");
    }
  }

  addProductFormEventHandler(): void{
    let filter = this.addProductForm.value.productFilter;
    let category = this.addProductForm.value.productCategory;
    let currentImageId = (parseInt(this.getLastImageId(filter)) + 1).toString();
    let imageUrl = this.addProductForm.value.productImage;
    // let imageUrl = "../../assets/" + filter + "/" + category + "/" + category + currentImageId + ".jpg";

    var productInfo = {
      'productId': filter[0] + currentImageId,
      'productName': this.addProductForm.value.productName,
      'productBrand': this.addProductForm.value.productBrand,
      'productSeller': this.addProductForm.value.productSeller,
      'productFilter': filter,
      'productPrice': this.addProductForm.value.productPrice,
      'productQuantity': 1,
      'productCategory': category,
      'productImages': {
        "imageId": "i" + currentImageId,
        "imageUrl": imageUrl,
        "imageAlt": category + currentImageId
      }
    }
    this.addProductForm.reset();
    console.log("product to be added ", productInfo);

    this.productService
        .addProduct(productInfo)
        .subscribe(
          data => {
            if(data["message"]){
              alert("Product inserted successfully");
              console.log("Product inserted successfully");
            }else{
              alert("Error while adding");
              console.log("Product does not insert successfully");
            }
          },
          err => {
            console.log("Error occured while inserting the data ", err);
          }
        );
  }
  getLastImageId(filter:string): string{
    // let lastImageId = "0";
    // this.productService
    //     .getProductByFilter(filter)
    //     .subscribe(
    //       data =>{
    //         let res = data["message"];
    //         if(res){
    //           lastImageId = res[0].productId;
    //           lastImageId = lastImageId.substring(1);
    //         }
    //         console.log("updated last image id ", lastImageId);
    //       },
    //       err => {
    //         console.log("error while fetching the data ", err);
    //       }
    //     );
    let num = (Math.floor(Math.random()*1000)%1000 + 100);
    // console.log("returning last image id ", lastImageId);
    return num.toString();
  }
}