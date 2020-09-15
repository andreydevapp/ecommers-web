import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SizesService {

  private size:any = [];

  constructor(private http:HttpClient) { }

  newSize(typeProduct,description,sizes){
    console.log();
    return this.http.post(environment.URI+environment.methodHttp.newSize,{typeProduct,description,sizes});
  }

  getSizes(){
    return this.http.get(environment.URI+environment.methodHttp.getSizes);
  }

  getSize(_id){
    return this.http.post(environment.URI+environment.methodHttp.getSize,{_id});
  }

  putSize(_id, typeProduct,description,sizes){
    return this.http.post(environment.URI+environment.methodHttp.putSize,{_id, typeProduct, description, sizes});
  }

  deleteSize(_id){
    return this.http.post(environment.URI+environment.methodHttp.deleteSize,{_id});
  }

  addArray(payload){
    this.size = payload;
  }

  getArray(){
    return this.size;
  }

}
