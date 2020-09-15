import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BrandsService } from 'src/app/services/brands.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  constructor(private brandsService: BrandsService, private route:Router) { }

  name:string = "";
  description:string = "";
  nameErr:string = "";
  file:File;
  photoSelected:string | ArrayBuffer;
  private unsubscribe$ = new Subject<void>();


  ngOnInit(): void {
  }

  validate(){
    if (this.name !== '') {
      if (this.description === '') {
        this.description = "Sin descripción";
      }
      this.newBrand();
    }else{
      this.nameErr = "El nombre de la marca es requerido";
    }
  }

  newBrand(){

    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    if (!this.file) {
      
      this.brandsService.newBrand(this.name,this.description).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        const data:any = res;
        spinner.classList.add("d-none");
        this.route.navigate(["/admin77/manage_brands"]);
      }, err =>{
        console.log(err);
      });

    }else{
      this.brandsService.newBrandWhithImagen(this.name,this.description,this.file).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
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
