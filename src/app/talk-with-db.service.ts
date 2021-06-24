import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TalkWithDbService {
  myBaseServiceUrl = environment.serverUrl;
  constructor(public httpClient:HttpClient) { 
  }

  doUserValidation(obj){
    var myServerUrl = this.myBaseServiceUrl + "/api/login";
    return this.httpClient.post(myServerUrl, obj);
  }

  doUserUpdation(obj){
    var myServerUrl = this.myBaseServiceUrl + "/api/signup";
    return this.httpClient.post(myServerUrl, obj);
  }

  doUserExists(obj){
    var myServerUrl = this.myBaseServiceUrl + "/api/userExists";
    return this.httpClient.post(myServerUrl, obj);
  }
}

