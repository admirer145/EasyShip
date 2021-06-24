import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomFormValidations} from '../custom-form-validations.service'
import {TalkWithDbService} from "../talk-with-db.service";
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  loginForm:FormGroup;
  userValidationFailMessage:string;
  userValidationFailFlag:boolean;
  constructor(public router: Router, public talkWithDbService:TalkWithDbService, public userService: UserService) {
    this.userValidationFailFlag = false;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, CustomFormValidations.emailValidation]),
      password: new FormControl('', Validators.required)
    });
  }

  loginEventHandler(): void{
    var user = {
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    };
    this.talkWithDbService
        .doUserValidation(user)
        .subscribe((data)=>{
          console.log(data);
          if(data["message"] == true){
            this.userService.setUserAuthentication(true);
            this.userService.setUserEmail(user.email);
            this.router.navigateByUrl('/checkout/address');
          }else{
            this.userService.setUserAuthentication(false);
            this.userValidationFailFlag = true;
            this.userValidationFailMessage = "Please enter the correct email and password";
            alert(this.userValidationFailMessage);
            this.router.navigateByUrl('/login');
          }
        },(err)=>{
          console.log(err);
      });
      this.loginForm.reset();
  }
}
