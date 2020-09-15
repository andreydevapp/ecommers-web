import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoryService } from 'src/app/services/category.service';
import { SizesService } from 'src/app/services/sizes.service';
import { OcasionService } from 'src/app/services/ocasion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
declare var $:any;
@Component({
  selector: 'app-add-type-product',
  templateUrl: './add-type-product.component.html',
  styleUrls: ['./add-type-product.component.css']
})
export class AddTypeProductComponent implements OnInit {



  


  private unsubscribe$ = new Subject<void>();

  nameErr = "";
  priceErr = "";
  codeErr = "";
  brandErr = "";
  sizeErr = "";
  alertMessage = "";

  constructor(private categoryService:CategoryService, private brandsService: BrandsService, private sizesService:SizesService, private productService:ProductsService, private ocasionService:OcasionService, private router:Router) { }

  catagoriesData:any = [];
  subCategoryData:any = [];
  ocasionsData:any = [];
  brandData:any = [];
  
  product = {
    nameProduct:"",
    description:"",
    price:null,
    discount:0,
    code:"",
    taxes:0.13,
    url:"",
    categorySelected:
    {
      nameCategory:"",
      idCategory:""
    },
    subCategorySelected:
    {
      nameCategory:"",
      idCategory:""
    },
    brand:{
      idBrand:"5ebca6684ecbde38442b7c69",
      brand:"Sin Marca"
    },
    typeOcasion:{
      idType:"5ec01296781f295258425a64",
      type:"Sin tipo de ocasión",
    },
    createAt:""
  }

  urlSelected = "";

  ngOnInit(): void {
    this.categoryService.getCategories().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.catagoriesData = data.res;
    }, err =>{
      console.log(err);
    });

    this.brandsService.getBrands().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.brandData = data.res;
    }, err =>{
      console.log(err);
    });

    this.ocasionService.getOcasion().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.ocasionsData = data.res;
    }, err =>{
      console.log(err);
    }); 
  }

  brandSelectedAccion(_id, nameBrand){

    if (_id !== "noBrand") {

      $("#noBrand").prop('checked', false); 

      for(let brand of this.brandData) {
        if (brand._id === _id) {
          $("#"+_id).prop('checked', true); 
          this.product.brand.brand = nameBrand;
          this.product.brand.idBrand = _id;
        }else{
          $("#"+brand._id).prop('checked', false);
        }
      }

    }else{
      $("#noBrand").prop('checked', true); 
      for(let brand of this.brandData) {
        $("#"+brand._id).prop('checked', false);
      }
    }

  }

  ocasionSelectedAccion(_id, type){

    for(let ocasion of this.ocasionsData) {
      if (ocasion._id === _id) {
        $("#"+_id).prop('checked', true); 
        this.product.typeOcasion.idType = _id;
        this.product.typeOcasion.type = type;
      }else{
        $("#"+ocasion._id).prop('checked', false);
      }
    }

  }

  categoryAccion(nameCategory,idCategory){

    this.product.categorySelected.nameCategory = nameCategory;
    this.product.categorySelected.idCategory = idCategory;
    this.urlSelected = nameCategory;
    this.subCategoryData = [];
    this.product.subCategorySelected.nameCategory = "";
    this.product.subCategorySelected.idCategory = "";

    if (nameCategory !== '' && idCategory !== '') {
      this.categoryService.getSubCategories(this.product.categorySelected.idCategory).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        const data:any = res;
        this.subCategoryData = data.res;
        console.log("sub category", this.subCategoryData);
      }, err =>{
        console.log(err);
      });
    }else{  
    }

    
  }

  subCategoryAccion(nameCategory, _id){
    this.product.subCategorySelected.nameCategory = nameCategory;
    this.product.subCategorySelected.idCategory = _id;
    this.urlSelected = this.product.subCategorySelected.nameCategory +"/"+ nameCategory;
    
  }

  validateProduct(){
    let error = false;
    this.nameErr = "";
    this.priceErr = "";
    this.codeErr = "";
    this.brandErr = "";
    this.sizeErr = "";

    if (this.product.nameProduct == "") {
      this.nameErr = "El nombre del producto es requerido";
      error = true;
    }

    if (this.product.price <= 0 || this.product.price == null || this.product.price == undefined || this.product.price == "") {
      this.priceErr = "El precio del producto es requerido";
      error = true;    
    }

    if (this.product.code === "") {
      this.codeErr = "El código del producto es requerido"; 
      error = true;  
    }

    if (this.product.description === '') {
      this.product.description = "Sin descripción"
    }
    
    if (this.product.discount < 0 || this.product.discount == null || this.product.discount == undefined || this.product.discount == 0) {
      this.product.discount = 0;
    }

    if (!error) {
      this.product.url = this.urlSelected;
      this.probar();
    }
    
  }

  probar(){
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");
    this.productService.newTypeProduct(this.product).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      spinner.classList.add("d-none");
      btn.setAttribute("disabled","false");
      const data:any = res;
      this.router.navigate(["/admin77/manage_type_products/manage_products/"+data.res.nameProduct+"&&"+data.res._id])
      console.log("hola perro");
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
