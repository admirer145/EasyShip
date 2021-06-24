import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  orderItems = new Array();
  userAddress: Array<Object>;
  totalPriceOfProducts;
  totalLengthOfProducts;
  estDeliveryDate = new Array();
  selectedAddress: Object;
  addressForm: FormGroup;
  
  @ViewChild('closeBtn') closeBtn: ElementRef;
  
  constructor(public orderService: OrderService, public cartService: CartService,
              public userService: UserService, public router: Router) { }

  ngOnInit(): void {
    if(!this.userService.isAuthenticated){
      this.router.navigateByUrl('/login');
    }

    this.addressForm = new FormGroup({
      name: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      houseNumber: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required)
    });

    this.orderItems = this.cartService.getCartItems();
    
    this.userService
        .getUserAddressByEmail(this.userService.getUserEmail())
        .subscribe(
          data => {
            this.userAddress = data["message"];
            this.userService.setUserAddress(this.userAddress);
            if(this.userAddress){
              this.selectedAddress = this.userAddress[0];
            }
            console.log("got selected Address ", this.selectedAddress);
          },
          err => {
            console.log("Error occured while fetching the address ", err);
          }
        );

    this.orderItems.forEach(element => {
      let estimatedDeliveryDate = this.orderService.getEstimatedDeliveryDateById(element['productId']);
      console.log(`current element` , element , ` gives product `,  estimatedDeliveryDate);
      this.estDeliveryDate.push(estimatedDeliveryDate);
    });
    this.totalLengthOfProducts = 0;
    this.totalPriceOfProducts = 0;
    this.orderItems.forEach(element => {
      console.log("order element ", element);
      this.totalPriceOfProducts+=(element['productPrice'] * element['productQuantity']);
      this.totalLengthOfProducts += element['productQuantity'];
    });

   

    if(!this.totalLengthOfProducts){
      this.router.navigateByUrl('/home');
    }
  }
  
  checkout(): void{
    console.log("selected Address ", this.selectedAddress);
    console.log("user Address", this.userAddress);
    if(this.selectedAddress){
      // console.log("Address selected ", this.selectedAddress);
      let checkoutObj = {
        totalPrice:this.totalPriceOfProducts,
        deliveryAddress: this.selectedAddress
      }
      this.router.navigate(['checkout/payment'], {state: checkoutObj});
    }else{
      // console.log("Address not Added");
      alert("Please Add Address");
    }
  }

  radioButtonHandler(selectedAddress): void{
    this.selectedAddress = selectedAddress;
  }

  addressFormHandler(addressData): void{
    console.log("Got the address data ", addressData);
    // let size = 0;
    // if(this.userAddress){
    //   size = this.userAddress.length;
    // } 
    let id:number =  (Math.floor(Math.random()*10000)%1000 + 100);
    addressData["addressId"] = id.toString();
    this.userAddress.push(addressData);
    this.selectedAddress = this.userAddress[0];
    this.addressForm.reset();
  
    this.closeBtn.nativeElement.click();
  }
  removeAddressById(addressId): void{
    var indx = this.userAddress.findIndex((ele) => ele['addressId'] ==addressId);
    if(indx!=-1){
      this.userAddress.splice(indx, 1);
      if(this.userAddress){
        this.selectedAddress = this.userAddress[0];
      }else{
        this.selectedAddress = "";
      }
    }else{
      // console.log("unable to remove delivery address")
    }
  }
}
