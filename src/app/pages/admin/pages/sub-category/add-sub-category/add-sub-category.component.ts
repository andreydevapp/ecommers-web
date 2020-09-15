import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
declare var $:any;
interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService, private route:Router) { }

  categoryData:any = [];
  categoryFather = "";

  ngOnInit(): void {
    this.categoryService.getCategories().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.categoryData = data.res;
    }, err =>{
      console.log(err);
    });
  }

  nameCategory:string = "";
  description:string = "";
  nameErr:string = "";
  file:File;
  photoSelected:string | ArrayBuffer;
  private unsubscribe$ = new Subject<void>();
 
  categoryCheck(_id, nameCategory){
    for (const category of this.categoryData) {
      if (category._id === _id) {
  
        $("#"+_id).prop('checked', true); 
        this.categoryFather = _id;
        
      }else{
        $("#"+category._id).prop('checked', false);
      }
    }
  }

  validate(){
    if (this.categoryFather !== '') {
      if (this.nameCategory !== '') {
        if (this.description === '') {
          this.description = "Sin descripción";
        }
        this.newCategory();
      }else{
        this.nameErr = "El nombre de la categoria es requerido";
      }
    }else{
      $("#modalAlertAdd").modal("show");
    }
    
  }

  newCategory(){
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");

    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");


    if (!this.file) {
      this.categoryService.newCategory(this.nameCategory,this.description,"subCategory",this.categoryService.category._id).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        spinner.classList.add("d-none");
        btn.setAttribute("disabled","false");
        this.route.navigate(["/admin77/manage_sub_categories"]);
      }, err =>{
        btn.setAttribute("disabled","false");
        spinner.classList.add("d-none");
        console.log(err);
      });
    }else{
      this.categoryService.newCategoryWhitImagen(this.nameCategory,this.description,"subCategory",this.categoryFather,this.file).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        spinner.classList.add("d-none");
        btn.setAttribute("disabled","false");
        this.route.navigate(["/admin77/manage_sub_categories"]);
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
