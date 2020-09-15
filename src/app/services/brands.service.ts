import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) { }

  public brand:any = [];

  newBrand(nameBrand,description){
    return this.http.post(environment.URI+environment.methodHttp.newBrand,{nameBrand,description});
  }

  newBrandWhithImagen(nameBrand,description,file:File){
    const fm = new FormData;
    fm.append('nameBrand', nameBrand);
    fm.append('description', description);
    fm.append('imagen', file);
    return this.http.post(environment.URI+environment.methodHttp.newBrandWhitImagen,fm);
  }

  getBrands(){
    return this.http.get(environment.URI+environment.methodHttp.getBrands);
  }

  putBrand(_id,nameBrand,description){
    return this.http.post(environment.URI+environment.methodHttp.putBrand,{_id, nameBrand, description});
  }

  putBrandWhitImagen(_id,nameBrand,description,file:File){
    console.log(nameBrand);
    const fm = new FormData;
    fm.append('_id', _id);
    fm.append('nameBrand', nameBrand);
    fm.append('description', description);
    fm.append('imagen', file);
    return this.http.post(environment.URI+environment.methodHttp.putBrandWhithImagen,fm);
  }

  deleteBrand(_id){
    return this.http.post(environment.URI+environment.methodHttp.deleteBrand,{_id});
  }
}
