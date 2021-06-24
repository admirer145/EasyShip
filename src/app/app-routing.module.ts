import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesKidComponent } from './categories-kid/categories-kid.component';
import { CategoriesMenComponent } from './categories-men/categories-men.component';
import { CategoriesWomenComponent } from './categories-women/categories-women.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ContactUsPageComponent } from './contact-us-page/contact-us-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
  { path:'aboutus', component:AboutUsPageComponent },
  { path:'admin', component:AdminPageComponent },
  { path:'categories', component:CategoriesComponent },
  { path:'categories/kid', component:CategoriesKidComponent },
  { path:'categories/men', component:CategoriesMenComponent },
  { path:'categories/women', component:CategoriesWomenComponent },
  { path:'cart', component:CartPageComponent },
  { path:'checkout/address', component:CheckoutPageComponent },
  { path:'checkout/payment', component:PaymentComponent },
  { path:'contactus', component:ContactUsPageComponent },
  { path:'error', component:ErrorPageComponent },
  { path:'home', component:HomePageComponent },
  { path:'login', component:LoginPageComponent },
  { path:'orders', component:OrdersPageComponent },
  { path:'profile', component:ProfilePageComponent },
  { path:'signup', component:SignupPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
