import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SizesService } from 'src/app/services/sizes.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sizes',
  templateUrl: './add-sizes.component.html',
  styleUrls: ['./add-sizes.component.css']
})
export class AddSizesComponent implements OnInit {

  constructor(private sizesService:SizesService, private route:Router) { }

  typeSize:string = "";
  description:string = "";
  size:string = "";

  arraySizes:any = [];

  typeErr = "";
  arrayErr = "";
  private unsubscribe$ = new Subject<void>();
  ngOnInit(): void {
  }

  addSize(){
    const id = this.arraySizes.length + 1;
    const payload = {size:this.size, id};
    this.arraySizes.push(payload);
  }

  delete(id){
    this.arraySizes = this.arraySizes.filter(data => data.id !== id);
  }

  validate(){

    let error = false;

    if (this.typeSize === "") {
      this.typeErr = "El tipo de talla es necesario";
      error = true;
    }

    if (this.arraySizes.length === 0) {
      this.arrayErr = "Es necesario almenos una talla";
      error = true;
    }

    if (error === false) {
      if (this.description == '') {
        this.description = "Sin descripción";
      }
      
      this.save();
    }
    
  }

  save(){
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");
    this.sizesService.newSize(this.typeSize, this.description, this.arraySizes).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      spinner.classList.add("d-none");
      btn.setAttribute("disabled","false");
      this.route.navigate(["/admin77/manage_sizes"]);
    }, err =>{
      spinner.classList.add("d-none");
      btn.setAttribute("disabled","false");
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
