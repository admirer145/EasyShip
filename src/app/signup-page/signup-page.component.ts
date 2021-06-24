import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomFormValidations} from '../custom-form-validations.service'
import {TalkWithDbService} from "../talk-with-db.service";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  signupForm:FormGroup;
  userValidationFailMessage:string;
  userValidationFailFlag:boolean;

  constructor(public router: Router, public talkWithDbService:TalkWithDbService) {
    this.userValidationFailFlag = false;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, CustomFormValidations.emailValidation]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      mobileNumber: new FormControl('', [Validators.required, CustomFormValidations.phoneValidation])
    });
  }

  signupEventHandler(): void{
    var user = {
      email:this.signupForm.value.email,
      password:this.signupForm.value.password,
      mobileNumber: this.signupForm.value.mobileNumber
    };
    this.talkWithDbService
        .doUserExists(user)
        .subscribe((data)=>{
          if(data["message"] != true){
            this.talkWithDbService
            .doUserUpdation(user)
            .subscribe((InnerData)=>{
              if(InnerData["message"] != true){
                this.router.navigateByUrl('/login');
                this.userValidationFailFlag = false;
              }else{
                this.userValidationFailFlag = true;
                this.userValidationFailMessage = "Something goes wrong! Retry";
                alert(this.userValidationFailMessage);
                this.router.navigateByUrl('/signup');
              }
            },(err)=>{
              console.log(err);
            });
          }else{
            this.userValidationFailFlag = true;
            this.userValidationFailMessage = "User Already Exists";
            alert(this.userValidationFailMessage);
            this.router.navigateByUrl('/login');
          }
        },(err)=>{
          console.log(err);
        });
      this.signupForm.reset();
  }
}
