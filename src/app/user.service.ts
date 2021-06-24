import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAuthenticated: boolean;
  userEmail: string;
  userAddress: Array<Object>;
  
  constructor(public httpClient: HttpClient) {
    this.isAuthenticated = false;
    this.userAddress = [];
    this.userEmail = "";
  }
  isAdmin(): boolean{
    if(!this.getUserAuthentication()){
      return false;
    }
    if(this.getUserEmail() == "Admin@gmail.com"){
      return true;
    }
    return false;
  }
  getUserAuthentication(): boolean{
    return this.isAuthenticated;
  }

  setUserAuthentication(value: boolean): void{
    this.isAuthenticated = value;
  }
  setUserEmail(email: string): void{
    this.userEmail = email;
  }
  getUserEmail(): string{
    return this.userEmail;
  }
  getUserAddress(): Array<Object>{
    return this.userAddress;
  }
  setUserAddress(userAddress): void{
    this.userAddress.push(...userAddress);
  }
  getUserAddressByEmail(email: string){
    let serverUrl = environment.serverUrl + "/api/userAddress";
    return this.httpClient.get(serverUrl, {params: {email}});
  }

  getUserDetailsByEmail(email: string){
    let serverUrl = environment.serverUrl + "/api/getUserDetails";
    return this.httpClient.get(serverUrl, {params: {email}});
  }

  updateUserDetailsByEmail(email: string, key: string, value:string){
    let serverUrl = environment.serverUrl + "/api/updateUserDetails";
    return this.httpClient.get(serverUrl, {params: {email, key, value}});
  }

  addUserAddressbyEmail(email: string, address: object){
    let serverUrl = environment.serverUrl + "/api/updateUserAddress";
    return this.httpClient.post(serverUrl, {email, address});
  }
}
