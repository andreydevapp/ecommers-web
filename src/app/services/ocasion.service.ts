import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OcasionService {

  constructor(private http:HttpClient) { }

  public ocasion:any = [];
  
  newOcasion(name, description, file){
    const fm = new FormData;
    fm.append('name', name);
    fm.append('description', description);
    fm.append('imagen', file);
    return this.http.post(environment.URI+environment.methodHttp.newOcacion,fm);
  }

  getOcasion(){
    return this.http.get(environment.URI+environment.methodHttp.getOcacion);
  }

  putOcasion(_id, type, description){
    return this.http.post(environment.URI+environment.methodHttp.putOcacion,{_id, type, description});
  }

  putOcasionWhitImagen(_id, type, description, file){
    const fm = new FormData;
    fm.append('_id', _id);
    fm.append('type', type);
    fm.append('description', description);
    fm.append('imagen', file);
    return this.http.post(environment.URI+environment.methodHttp.putOcacionWhitImagen,fm);
  }

  deleteOcasion(_id){
    return this.http.post(environment.URI+environment.methodHttp.deleteOcacion,{_id});
  }
}
