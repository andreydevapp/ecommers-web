import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public category:any = [];
  public subCategory:any = [];

  newCategory(nameCategory, description, opc, categoryFather){
    console.log("id",categoryFather);
    return this.http.post(environment.URI+environment.methodHttp.newCategory,{nameCategory, description, opc, idFather:categoryFather});
  }

  newCategoryWhitImagen(nameCategory, description, opc, categoryFather , file:File){
    const fm = new FormData;
    fm.append('nameCategory', nameCategory);
    fm.append('description', description);
    fm.append('opc', opc);
    fm.append('categoryFather', categoryFather);
    fm.append('imagen', file);
    return this.http.post(environment.URI+environment.methodHttp.newCategoryWhitImagen,fm);
  }

  getCategories(){
    return this.http.get(environment.URI+environment.methodHttp.getCategories);
  }

  getSubCategories(categoryFather){
    return this.http.post(environment.URI+environment.methodHttp.getSubCategories,{idFather:categoryFather});
  }

  getAllSubCategories(){
    return this.http.post(environment.URI+environment.methodHttp.getAllSubCategories,{});
  }

  putCategory(nameCategory, description, _id){
    return this.http.post(environment.URI+environment.methodHttp.putCategoy,{nameCategory, description, _id});
  }

  putCategoryWhitImagen(nameCategory, description, _id, file:File){
    const fm = new FormData;
    fm.append('nameCategory', nameCategory);
    fm.append('description', description);
    fm.append('_id', _id);
    fm.append('imagen', file);
    return this.http.post(environment.URI+environment.methodHttp.putCategoryWhitImagen,fm);
  }

  deleteCategory(_id,opc){
    return this.http.post(environment.URI+environment.methodHttp.deleteCategory,{_id,opc});
  }

}
