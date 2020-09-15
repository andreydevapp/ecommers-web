import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SizesService } from 'src/app/services/sizes.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-edit-sizes',
  templateUrl: './edit-sizes.component.html',
  styleUrls: ['./edit-sizes.component.css']
})
export class EditSizesComponent implements OnInit {

  constructor(private sizesService:SizesService, private route:Router) {}

  _id = "";
  typeSize:string = "";
  description:string = "";
  size:string = "";
  sizes:any = [];

  constTypeSize = "";
  constDescription = "";

  typeErr = "";
  errSize = "";
  arrayErr = "";
  repeatErr = "";
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    const data:any = this.sizesService.getArray();
    this.sizes = data.sizes;
    this.typeSize = data.typeProduct;
    this.constTypeSize = this.typeSize;
    this.description = data.description;
    this.constDescription = this.description;
    this._id = data._id;

  }

  
  newSize(){
    this.errSize = "";
    this.repeatErr = "";
    if (this.size !== "") {
      let isReapeat = false;
      for(let item of this.sizes) {
        if (item.size === this.size) {
          isReapeat = true;
          break;
        }
      }
      
      if (!isReapeat) {
        const id = this.sizes.length + 1;
        const payload = {size:this.size, _id:id};
        this.sizes.push(payload);
        this.size = "";
      }else{
        this.repeatErr = "La talla "+this.size+" ya existe";
      }
      
      
    }else{
      this.errSize = "Ingresa un valor"
    }
    
    
    
  }

  delete(id){
    this.sizes = this.sizes.filter(data => data._id !== id);
    let array = this.sizesService.getArray();
    array = array;
  }

  validate(){

    let error = false;
    if (this.typeSize === "") {
      this.typeErr = "El tipo de talla es necesario";
      error = true;
    }

    if (this.sizes.length === 0) {
      this.arrayErr = "Es necesario almenos una talla";
      error = true;
    }

    if (error === false) {
      if (this.description == '') {
        this.description = "Sin descripción";
      }
      
      this.validatePart2();
    }     

  }

  validatePart2(){
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    let array:any = this.sizesService.getArray();
    array = array.sizes;

    this.sizesService.getSize(this._id).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      
      const constSizeArray = data.res.sizes;
      
      let isChange = false;
      let contGood = 0;
      if (array.length === this.sizes.length) {

        for (let i = 0; i < constSizeArray.length; i++) {
          for (let a = 0; a < this.sizes.length; a++) {
            if (constSizeArray[i].size == this.sizes[a].size) {
              contGood++;
            } 
          }
          
        }
        
        if (contGood !== array.length) {
          isChange = true;
        }
      
      }else{
        isChange = true;
      }
      
      if (this.typeSize !== this.constTypeSize || this.description !== this.constDescription) {
        isChange = true;
      }

      if (isChange === true) {
        this.edit()
      }else{
        spinner.classList.add("d-none");
        $("#modalAlert").modal("show");
      }

    }, err =>{
     
    }); 

    

  }

  edit(){

    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");
    this.sizesService.putSize(this._id, this.typeSize, this.description, this.sizes).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      spinner.classList.add("d-none");
      btn.setAttribute("disabled","false");
      this.route.navigate(["/admin77/manage_sizes"]);
    }, err =>{
      btn.setAttribute("disabled","false");
      spinner.classList.add("d-none");
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
