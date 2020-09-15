import { Component, OnInit } from '@angular/core';
import { OcasionService } from 'src/app/services/ocasion.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}
declare var $:any;

@Component({
  selector: 'app-edit-ocasion',
  templateUrl: './edit-ocasion.component.html',
  styleUrls: ['./edit-ocasion.component.css']
})
export class EditOcasionComponent implements OnInit {

  constructor(private route:Router, private ocasionService:OcasionService) { }

  _id:string = "";
  name:string = "";
  description:string = "";
  nameErr:string = "";
  imagenUrl:string = "";
  imagenErr:string = "";
  file:File;
  photoSelected:string | ArrayBuffer;
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    console.log(this.ocasionService.ocasion);
    this._id = this.ocasionService.ocasion._id;
    this.name = this.ocasionService.ocasion.type;
    this.description = this.ocasionService.ocasion.description;
    this.imagenUrl = this.ocasionService.ocasion.imagenUrl;
  }

  validate(){
    console.log(this.ocasionService.ocasion);
    
    let isChange = false;
    if (this.file) {
      isChange = true;
    }

    if (this.name !== this.ocasionService.ocasion.type) {
      isChange = true;
    }

    if (this.description !== this.ocasionService.ocasion.description) {
      isChange = true;
    }

    if (isChange) {
      console.log("con cambios");
      this.validate2();
    }else{
      console.log("sin cambios");
      
      $("#modalAlert").modal("show");
    }
  }

  validate2(){
    console.log("entre a validate 2");
    
    if (this.name !== '') {
      if (this.description === '') {
        this.description = "Sin descripción";
      }
      this.editOcasion();
    }else{
      this.nameErr = "El nombre de la ocación es requerido";
    }
  }

  editOcasion(){
    console.log("voy a realizar los cambios");
    
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");

    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");

    if (!this.file) {
      this.ocasionService.putOcasion(this._id,this.name,this.description,).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        spinner.classList.add("d-none");
        btn.setAttribute("disabled","false");
        this.route.navigate(["/admin77/manage_type_ocasion"]);
      }, err =>{
        btn.setAttribute("disabled","false");
        console.log(err);
      });
    }else{
      
      this.ocasionService.putOcasionWhitImagen(this._id,this.name,this.description,this.file).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        spinner.classList.add("d-none");
        btn.setAttribute("disabled","false");
        this.route.navigate(["/admin77/manage_type_ocasion"]);
      }, err =>{
        btn.setAttribute("disabled","false");
        console.log(err);
      });
    } 
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
