import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(public cartService: CartService, public router: Router, public userService: UserService) { }

  ngOnInit(): void {
    
  }

  userLogOutHandler(): void{
    this.userService.setUserAuthentication(false);
    this.userService.setUserEmail("");
    this.router.navigateByUrl('/home');  
  }
}
