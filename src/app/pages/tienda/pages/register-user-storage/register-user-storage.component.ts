import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register-user-storage',
  templateUrl: './register-user-storage.component.html',
  styleUrls: ['./register-user-storage.component.css']
})
export class RegisterUserStorageComponent implements OnInit {
  
  private unsubscribe$ = new Subject<void>();
  constructor(private router:Router, private aunthetincationService:AuthenticationService) { }

  name:string = "";
  email:string = "";
  pass1:string = "";
  pass2:string = "";
  check:boolean = false;

  err1:string = "";
  err2:string = "";
  err3:string = "";
  err4:string = "";

  ngOnInit(): void {
  }

  validate(){
    this.err1 = "";
    this.err2 = "";
    let err = false;

    if (this.name === '') {
      err = true;
      this.err1 = "Es necesario que ingreses tu nombre completo";
    }

    if (this.email === '') {
      err = true;
      this.err2 = "Es necesario un correo electronico";
    }

    if (this.pass1 !== this.pass2) {
      err = true;
      this.err3 = "Las contraseñas no cohinciden"
    }

    if (!this.check) {
      err = true;
      this.err4 = "Es necesario que acepte los terminos y condiciones"
    }


    if (!err) {
      this.registerUser();
    }
  }

  registerUser(){

    const payload = {
      fullName: this.name,
      email: this.email,
      password: this.pass1
    }

    this.aunthetincationService.registerUserStorage(payload).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      console.log(data);
      if (data.res === "Successful registration") {
        //usuario logueado
      }else if (data.res === "Existing email") {
        
      }

      
    }, err =>{
      console.log(err);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
