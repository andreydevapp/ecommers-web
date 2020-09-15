import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandsService } from 'src/app/services/brands.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}
@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  constructor(private route:Router, private brandsService:BrandsService) { }

  _id:string = "";
  name:string = "";
  description:string = "";
  nameErr:string = "";
  imagenUrl:string = "";
  file:File;
  photoSelected:string | ArrayBuffer;
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this._id = this.brandsService.brand._id;
    this.name = this.brandsService.brand.nameBrand;
    this.description = this.brandsService.brand.description;
    this.imagenUrl = this.brandsService.brand.imagenUrl;
  }

  validate(){
    if (this.name !== '') {
      if (this.description === '') {
        this.description = "Sin descripción";
      }
      this.editBrand();
    }else{
      this.nameErr = "El nombre de la marca es requerido";
    }
  }

  editBrand(){

    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    if (!this.file) {
      
      this.brandsService.putBrand(this._id,this.name,this.description).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        const data:any = res;
        spinner.classList.add("d-none");
        this.route.navigate(["/admin77/manage_brands"]);
      }, err =>{
        console.log(err);
      });

    }else{
      this.brandsService.putBrandWhitImagen(this._id,this.name,this.description,this.file).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        const data:any = res;
        spinner.classList.add("d-none");
        this.route.navigate(["/admin77/manage_brands"]);
      }, err =>{
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
