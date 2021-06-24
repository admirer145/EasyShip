import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';

import { CartService } from './cart.service';
import { CustomFormValidations } from './custom-form-validations.service';
import { TalkWithDbService } from './talk-with-db.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { PaymentComponent } from './payment/payment.component'
import { DatePipe } from '@angular/common';
import { CategoriesMenComponent } from './categories-men/categories-men.component';
import { CategoriesWomenComponent } from './categories-women/categories-women.component';
import { CategoriesKidComponent } from './categories-kid/categories-kid.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ContactUsPageComponent } from './contact-us-page/contact-us-page.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    CartPageComponent,
    CheckoutPageComponent,
    SignupPageComponent,
    ProfilePageComponent,
    OrdersPageComponent,
    ErrorPageComponent,
    PaymentComponent,
    CategoriesMenComponent,
    CategoriesWomenComponent,
    CategoriesKidComponent,
    AdminPageComponent,
    ContactUsPageComponent,
    AboutUsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule
  ],
  providers: [CartService, CustomFormValidations, TalkWithDbService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
