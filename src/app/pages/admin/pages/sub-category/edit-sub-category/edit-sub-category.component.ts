import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService, private route:Router) { }

  ngOnInit(): void {
   
    this.category = this.categoryService.subCategory;
    this.nameCategory = this.category.nameCategory;
    this.description = this.category.description; 
    this.imagenUrl = this.category.imagenUrl;
    this._id = this.category._id;
    
  }

  category:any = [];

  imagenUrl:string = "";
  nameCategory:string = "";
  description:string = "";
  _id:string = "";
  nameErr:string = "";
  file:File;
  photoSelected:string | ArrayBuffer;
  private unsubscribe$ = new Subject<void>();
 
  validate(){

    if (!this.file) {
      if (this.nameCategory !== '') {
        if (this.nameCategory !== this.category.nameCategory || this.description !== this.category.description) {
          if (this.description === '') {
            this.description = "Sin descripción";
          }
          this.editCategory();
        }else{
          alert("Realiza cambios para guardarlos");
        }
      }else{
        this.nameErr = "El nombre de la categoria es requerido";
      }
      
    }else{
      if (this.nameCategory !== '') {
        this.editCategory();
      }else{
        this.nameErr = "El nombre de la categoria es requerido";
      }
    }

    
  }

  editCategory(){
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");

    if (!this.file) {
      this.categoryService.putCategory(this.nameCategory,this.description,this._id).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        spinner.classList.add("d-none");
        btn.setAttribute("disabled","false");
        this.route.navigate(["/admin77/manage_sub_categories"]);
      }, err =>{
        btn.setAttribute("disabled","false");
        console.log(err);
      });
    }else{
      
      this.categoryService.putCategoryWhitImagen(this.nameCategory,this.description,this._id,this.file).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        spinner.classList.add("d-none");
        btn.setAttribute("disabled","false");
        this.route.navigate(["/admin77/manage_sub_categories"]);
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
