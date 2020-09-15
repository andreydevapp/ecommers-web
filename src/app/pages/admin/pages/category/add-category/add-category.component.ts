import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService, private route:Router) { }

  ngOnInit(): void {
  }

  nameCategory:string = "";
  description:string = "";
  nameErr:string = "";
  file:File;
  photoSelected:string | ArrayBuffer;
  private unsubscribe$ = new Subject<void>();
 
  validate(){
    if (this.nameCategory !== '') {
      if (this.description === '') {
        this.description = "Sin descripción";
      }
      this.newCategory();
    }else{
      this.nameErr = "El nombre de la categoria es requerido";
    }
  }

  newCategory(){
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");

    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");

    if (!this.file) {
      this.categoryService.newCategory(this.nameCategory,this.description,"category","").pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        spinner.classList.add("d-none");
        btn.setAttribute("disabled","false");
        this.route.navigate(["/admin77/manage_categories"]);
      }, err =>{
        btn.setAttribute("disabled","false");
        spinner.classList.add("d-none");
        console.log(err);
      });
    }else{
      btn.setAttribute("disabled","false");
      this.categoryService.newCategoryWhitImagen(this.nameCategory,this.description,"category","",this.file).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        spinner.classList.add("d-none");
        this.route.navigate(["/admin77/manage_categories"]);
      }, err =>{
        btn.setAttribute("disabled","false");
        spinner.classList.add("d-none");
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

