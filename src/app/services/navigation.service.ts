import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http:HttpClient) { }

  getNavigation(){
    return this.http.get(environment.URI+environment.methodHttp.navigation);
  }
}