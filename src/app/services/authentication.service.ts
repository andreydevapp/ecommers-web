import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  registerUserStorage(payload){
    console.log("register");
    return this.http.post(environment.URI+environment.methodHttp.registerClient,{payload});
  }
}
