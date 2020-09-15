import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private product:any = {};
  productDetail:string = "";

  constructor(private http:HttpClient) { }

  newTypeProduct(payload){
    return this.http.post(environment.URI+environment.methodHttp.newTypeProduct,{payload});
  }

  putTypeProduct(_id,payload){
    return this.http.post(environment.URI+environment.methodHttp.putProduct,{_id,payload});
  }

  newProduct(file, files, payload, _id, nameProduct){
    payload = JSON.stringify(payload);
    const fm = new FormData;
    fm.append('payload', payload);
    fm.append('nameProduct', nameProduct);
    fm.append('imagen', file);
    fm.append('_id', _id);
    for (const imagen of files) {
      fm.append('images', imagen);
      
    }
    
    return this.http.post(environment.URI+environment.methodHttp.newProduct,fm);
  }

  // newProduct(payload, file:File){
  //   const fm = new FormData;
  //   const jsonString = JSON.stringify(payload);
  //   fm.append('payload', jsonString);
  //   fm.append('imagen', file);
  //   return this.http.post(environment.URI+environment.methodHttp.newProduct,fm);
  // }

  getProducts(){
    return this.http.get(environment.URI+environment.methodHttp.getProducts);
  }

  getProduct(_id){
    return this.http.post(environment.URI+environment.methodHttp.getProduct,{_id});
  }

  getUrlProduct(url){
    console.log(url);
    return this.http.post(environment.URI+environment.methodHttp.getUrlProducts,{url});
  }

  getProductsStoreCategory(_id,filterPrice){
    return this.http.post(environment.URI+environment.methodHttp.getProductsStoreCategory,{_id,filterPrice});
  }

  filterProduct(filterBrand, filterSizes, filterOcasion, filterColor,filterPrice, priceMin, priceMax){
    return this.http.post(environment.URI+environment.methodHttp.filterProducts,{filterBrand, filterSizes, filterOcasion, filterColor, filterPrice, priceMin, priceMax});
  }

  putProduct(_id,payload){
    return this.http.post(environment.URI+environment.methodHttp.putProduct,{_id,payload});
  }

  putProductWhitImagen(_id,payload, file){
    const fm = new FormData;
    const jsonString = JSON.stringify(payload);
    fm.append('payload', jsonString);
    fm.append('_id', _id);
    fm.append('imagen', file);
    return this.http.post(environment.URI+environment.methodHttp.putProductWhitImagen,fm);
  }

  deleteTypeProduct(_id){
    return this.http.post(environment.URI+environment.methodHttp.deleteTypeProduct,{_id});
  }

  deleteProduct(_id, idDetail, nameProduct){
    return this.http.post(environment.URI+environment.methodHttp.deleteProduct,{_id, idDetail, nameProduct});
  }

  saveProductGbl(product){
    this.product = product;
  }

  getProductGbl(){
    return this.product;
  }

}
