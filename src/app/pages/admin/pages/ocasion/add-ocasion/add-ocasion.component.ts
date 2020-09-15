import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { OcasionService } from 'src/app/services/ocasion.service';
import { takeUntil } from 'rxjs/operators';

interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}
@Component({
  selector: 'app-add-ocasion',
  templateUrl: './add-ocasion.component.html',
  styleUrls: ['./add-ocasion.component.css']
})
export class AddOcasionComponent implements OnInit {

  constructor(private route:Router, private ocasionService:OcasionService) { }

  name:string = "";
  description:string = "";
  nameErr:string = "";
  imagenErr:string = "";
  file:File;
  photoSelected:string | ArrayBuffer;
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
  }

  validate(){
    if (this.name !== '') {
      if (this.file) {
        if (this.description === '') {
          this.description = "Sin descripción";
        }
        this.newOcasion();
      }else{
        this.imagenErr = "La imagen de la ocación es requerida";
      }
      
      
    }else{
      this.nameErr = "El nombre de la marca es requerido";
    }
  }

  newOcasion(){

    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");
    this.ocasionService.newOcasion(this.name,this.description,this.file).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      spinner.classList.add("d-none");
      btn.setAttribute("disabled","false");
      this.route.navigate(["/admin77/manage_type_ocasion"]);
    }, err =>{
      spinner.classList.add("d-none");
      btn.setAttribute("disabled","false");
      console.log(err);
    });
  }

  onImgSelected(event:HtmlInputEvent):void{
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
