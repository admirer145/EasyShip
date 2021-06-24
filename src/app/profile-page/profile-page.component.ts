import { KeyValue } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  userDetails;
 
  @ViewChild('closeBtn') closeBtn: ElementRef;
  
  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
    if(!this.userService.getUserAuthentication()){
      // console.log("Not a valid user");
      this.router.navigateByUrl('/login');
    }else{

      this.userDetails = {};
      this.userService
          .getUserDetailsByEmail(this.userService.getUserEmail())
          .subscribe(
            data => {
              let userData = data["message"];
              this.userDetails = {
                "Full Name": (userData["name"] ? userData["name"]  : "-- Not Added --"),
                "Mobile Number": (userData["phone"] ?  userData["phone"] : "-- Not Added --"),
                "Email": (userData["email"] ? userData["email"] : "-- Not Added --"),
                "Gender":(userData["gender"] ? userData["gender"] : "-- Not Added --"),
                "DOB": (userData["dob"] ? userData["dob"] : "-- Not Added --"),
                "Location":(userData["location"] ? userData["location"] : "-- Not Added --"),
                "Alternate Mobile": (userData["altMobile"] ? userData["altMobile"] : "-- Not Added --")
              };
              console.log("user data at component ", userData);
              console.log("user details at component ", this.userDetails);
            },
            err => {
              console.log("Error occured while fetching the user details ", err);
            }
          );
    }
  }
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
  updateUserDetailsHandler(): void{
   
    for(let i=0; i<Object.keys(this.userDetails).length; i++){
      var ele = document.getElementById("userDetails"+i);
      var key = Object.keys(this.userDetails)[i];
      console.log("Key: ", key, "Value ", ele['value']);
      if(key!="Email" && this.userDetails[key] != ele['value']){
        this.userDetails[key] = ele['value'];
        this.userService
            .updateUserDetailsByEmail(this.userService.getUserEmail(), this.mapCurrentToReal(key), ele['value'])
            .subscribe(
              data => {
                if(data["message"]){
                  console.log("Update details successfully");
                }else{
                  console.log("Update is not successful");
                }
              },
              err => {
                console.log("Error occurred while updating the details ", err);
              }
            );     
      }

    }

    //hide the modal
    this.closeBtn.nativeElement.click();
  }

  mapCurrentToReal(key: string): string{

    if(key == "Full Name"){
      return "name";
    }
    if(key == "Mobile Number"){
      return "phone";
    }
    if(key == "Gender"){
      return "gender";
    }
    if(key == "DOB"){
      return "dob";
    }
    if(key == "Location"){
      return "location";
    }
    if(key == "Alternate Mobile"){
      return "altMobile";
    }
    return key;
  }
}
