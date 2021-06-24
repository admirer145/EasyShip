import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  productItems: Array<Object>;

  constructor(public htpClient: HttpClient) {
  
    this.productItems = [];
  }

  getAllProducts(): Array<Object>{
    let serverUrl =   environment.serverUrl + '/api/products';
    this.htpClient
        .get(serverUrl)
        .subscribe(
          data => {
            console.log("Got the data at service ", data);
            this.productItems = data["messaage"];
          },
          err =>{
            console.log("Error while fetching the products ", err);
          }
    );
    return this.productItems;
  }

  getProductById(productId: string){
    let serverUrl =  environment.serverUrl + '/api/products/byProductId';
    return this.htpClient.get(serverUrl, {params: {productId}});
  }

  getProductByFilter(filterValue: string){
    let serverUrl =   environment.serverUrl + '/api/products/byFilter';
    return this.htpClient.get(serverUrl, {params: {filter: filterValue}});
  }
  
  getProductByCategory(filter:string, category: string){
    let serverUrl =   environment.serverUrl + '/api/products/byCategory';
    return this.htpClient.get(serverUrl, {params: {filter, category}});
  }

  getProductByBrand(brand: string){
    let serverUrl =   environment.serverUrl + '/api/products/byBrand';
    return this.htpClient.get(serverUrl, {params: {brand}});
  }

  removeProductById(productId){
    let serverUrl =   environment.serverUrl + '/api/products/removeProductbyId';
    console.log("request for deleting the item ", productId);
    return this.htpClient.post(serverUrl, {productId});
  }
  addProduct(product:Object){
    let serverUrl = environment.serverUrl + '/api/products/addProduct';
    return this.htpClient.post(serverUrl, product);
  }
}
