import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BrandsService } from 'src/app/services/brands.service';
import { SizesService } from 'src/app/services/sizes.service';
import { ProductsService } from 'src/app/services/products.service';
import { PageSettingsModel, ToolbarItems, SearchSettingsModel, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { setCulture, L10n } from '@syncfusion/ej2-base';
import { Router } from '@angular/router';
import { OcasionService } from 'src/app/services/ocasion.service';
setCulture('es-LATAM');
declare var $: any;
interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  constructor(private categoryService:CategoryService, private brandsService: BrandsService, private sizesService:SizesService, private productService:ProductsService, private ocasionService:OcasionService,  private router:Router) { }

  private unsubscribe$ = new Subject<void>();

  idProduct:string = "";
  productsData:any = [];
  catagoriesData:any = [];
  subCategoryData:any = [];
  sizesData:any = [];
  brandData:any = [];
  ocasionsData:any = [];

  categorySelected = {
    nameCategory:"",
    idCategory:""
  };

  subCategorySelected = {
    nameCategory:"",
    idCategory:""
  };

  typeSizesData:any = [];

  typeSizeSelected = {
    typeProduct:"",
    idTypeProduct:""
  };

  sizesSelected:any = [];
  brandSelected:string = "";

  payloadProduct:any = {
    nameProduct:"",
    imagenUrl:"",
    url:"",
    categorySelected: {
      nameCategory:"",
      idCategory:""
    },
    subCategorySelected: {
      nameCategory:"",
      idCategory:""
    },
    description:"",
    price:0,
    discount:0,
    code:"",
    brand:{
      idBrand:"5ebca6684ecbde38442b7c69",
      brand:"Sin Marca"
    },
    typeOcasion:{
      idType:"5ec01296781f295258425a64",
      type:"Sin tipo de ocasión",
    },
    size:{
      typeProduct:"",
      sizes:[
        // {
        //   size:"",
        //   description:""
        // }
      ]
    },
    quantityInStock:0,
    createAt:""
  }
  urlSelected = "";
  alertMessage = "";

  file:File;
  photoSelected:string | ArrayBuffer;

  payloadConst:any = {};

  ngOnInit(): void {

    //load
    const productGbl:any = this.productService.getProductGbl();
    this.idProduct = productGbl._id;
    this.typeSizeSelected = {
      typeProduct:productGbl.size.typeProduct,
      idTypeProduct:productGbl.size.idTypeProduct
    };

    this.categorySelected.idCategory = productGbl.categorySelected.idCategory;
    this.categorySelected.nameCategory = productGbl.categorySelected.nameCategory;

    this.subCategorySelected.idCategory = productGbl.subCategorySelected.idCategory;
    this.subCategorySelected.nameCategory = productGbl.subCategorySelected.nameCategory

    this.sizesSelected = productGbl.size.sizes;
    
    
    this.payloadProduct = {
      nameProduct:productGbl.nameProduct,
      imagenUrl:productGbl.imagenUrl,
      url:productGbl.url,
      categorySelected: productGbl.categorySelected,
      subCategorySelected:  productGbl.subCategorySelected,
      description:productGbl.description,
      price:productGbl.price,
      discount:productGbl.discount,
      code:productGbl.code,
      brand:{
        idBrand:productGbl.brand.idBrand,
        brand:productGbl.brand.brand
      },
      typeOcasion:{
        idType:productGbl.typeOcasion.idType,
        type:productGbl.typeOcasion.type,
      },
      size:{
        idTypeProduct:productGbl.size.idTypeProduct,
        typeProduct:productGbl.size.typeProduct,
        sizes:[
          // {
          //   size:"",
          //   description:""
          // }
        ]
      },
      quantityInStock:productGbl.quantityInStock,
      createAt:""
    }
    //

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

    this.sizesService.getSizes().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      
      const data:any = res;
      this.typeSizesData = data.res;


      this.sizesData = this.typeSizesData.filter(data => data._id === productGbl.size.idTypeProduct)[0].sizes;
      setTimeout(() => {
        
        for (let i = 0; i < this.sizesData.length; i++) {
          for (let a = 0; a < this.sizesSelected.length; a++) {
            if (this.sizesData[i].size === this.sizesSelected[a].size) {
              
              const sizeD = document.getElementById(this.sizesSelected[a].size);
              
              sizeD.classList.add("container-size-active");
            } 
          } 
        }
      }, 200);
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

    this.payloadProduct.brand.brand = nameBrand;
    this.payloadProduct.brand.idBrand = _id;
    for(let brand of this.brandData) {
      if (brand._id === _id) {
        $("#"+_id).prop('checked', true); 
      }else{
        $("#"+brand._id).prop('checked', false);
      }
    }

  }

  ocasionSelectedAccion(_id, type){

    for(let ocasion of this.ocasionsData) {
      if (ocasion._id === _id) {
        $("#"+_id).prop('checked', true); 
        this.payloadProduct.typeOcasion.idType = _id;
        this.payloadProduct.typeOcasion.type = type;
      }else{
        $("#"+ocasion._id).prop('checked', false);
      }
    }

  }

  categoryAccion(nameCategory,idCategory){

    this.categorySelected.nameCategory = nameCategory;
    this.categorySelected.idCategory = idCategory;
    this.urlSelected = nameCategory;
    this.subCategoryData = [];
    this.subCategorySelected.nameCategory = "";
    this.subCategorySelected.idCategory = "";

    if (nameCategory !== '' && idCategory !== '') {
      this.categoryService.getSubCategories(this.categorySelected.idCategory).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        const data:any = res;
        this.subCategoryData = data.res;
      }, err =>{
        console.log(err);
      });
    }else{  
    }

    
  }

  subCategoryAccion(nameCategory, _id){
    this.subCategorySelected.nameCategory = nameCategory;
    this.subCategorySelected.idCategory = _id;
    this.urlSelected = this.categorySelected.nameCategory +"/"+ nameCategory;
    
  }

  typeSizeAccion(_id,typeProduct){

    if (this.typeSizeSelected.typeProduct !== typeProduct) {
      this.sizesData = [];
      this.sizesSelected = [];
      const size:any = this.typeSizesData.filter(data => data._id === _id);
      this.sizesData = size[0].sizes;
      
      this.payloadProduct.size.typeProduct = typeProduct;
      this.typeSizeSelected.typeProduct = typeProduct;
      this.typeSizeSelected.idTypeProduct = _id;
    }
    
  }

  sizeAction(_id,size,description){
    if (this.sizesSelected.length > 0) {
      
      let isSizeRepeat = false;
      for(let sizes of this.sizesSelected) {
        if (sizes.size === size) {
          isSizeRepeat = true;
          break;
        }
      }
      
      if (!isSizeRepeat) {
        this.addSize(size,description);
      }else{
        this.deleteSize(size,description);
      }

    }else{
      this.addSize(size,description);
    }

  }

  addSize(size,description) {
    const payload = {
      size,
      description
    };
    this.sizesSelected.push(payload);
    const sizeD = document.getElementById(size);
    sizeD.classList.add("container-size-active");
  }

  deleteSize(size,description) {
    const sizeD = document.getElementById(size);
    sizeD.classList.remove("container-size-active");
    this.sizesSelected = this.sizesSelected.filter(data => data.size !== size);
    
  }

  newProduct(){

    if (this.categorySelected.nameCategory !== '') {
      if (this.typeSizesData.length > 0) {
        $('#modalAddProduct').modal('show');
      }
      
    }else{
      this.alertMessage = "1";
      $('#modalAlert').modal('show');
    }

  }

  nameErr = "";
  priceErr = "";
  codeErr = ""; 
  brandErr = "";
  sizeErr = "";

  validateProduct(){

    let error = false;
    this.nameErr = "";
    this.priceErr = "";
    this.codeErr = "";
    this.brandErr = "";
    this.sizeErr = "";

    if (this.payloadProduct.nameProduct == "") {
      this.nameErr = "El nombre del producto es requerido";
      error = true;
    }

    if (this.payloadProduct.price <= 0 || this.payloadProduct.price == null || this.payloadProduct.price == undefined || this.payloadProduct.price == "") {
      this.priceErr = "El precio del producto es requerido";
      error = true;    
    }

    if (this.payloadProduct.code === "") {
      this.codeErr = "El código del producto es requerido"; 
      error = true;  
    }

    if (this.sizesSelected.length === 0) {
      this.sizeErr = "Las tallas del producto es requerido"
    }
    
    if (this.payloadProduct.discount < 0 || this.payloadProduct.discount == null || this.payloadProduct.discount == undefined || this.payloadProduct.discount == 0) {
      this.payloadProduct.discount = 0;
    }

    if (this.payloadProduct.quantityInStock < 0 || this.payloadProduct.quantityInStock == null || this.payloadProduct.quantityInStock == undefined || this.payloadProduct.quantityInStock == 0) {
      this.payloadProduct.quantityInStock = 0;
    }

    if (!error) {
      this.payloadProduct.size.sizes = this.sizesSelected;
      if(this.subCategorySelected.nameCategory !== ""){
        this.payloadProduct.url = this.categorySelected.nameCategory+"/"+this.subCategorySelected.nameCategory;
      }else{
        this.payloadProduct.url =this.categorySelected.nameCategory;
      }
      
      this.validateProduct2();
    }
    
  }

  validateProduct2(){
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");
    
    this.productService.getProduct(this.idProduct).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      let isChange = false;

      const data:any = res;
      const productGbl:any = data.res;
      
      if (JSON.stringify(productGbl.size.sizes) !== JSON.stringify(this.sizesSelected)) {
        isChange = true;
      }
      
      this.payloadProduct.size.sizes = [];
      this.payloadProduct.url = productGbl.url;
      this.payloadConst = {
        nameProduct:productGbl.nameProduct,
        imagenUrl:productGbl.imagenUrl,
        url:productGbl.url,
        categorySelected: productGbl.categorySelected,
        subCategorySelected:  productGbl.subCategorySelected, 
        description:productGbl.description,
        price:productGbl.price,
        discount:productGbl.discount,
        code:productGbl.code,
        brand:productGbl.brand,
        typeOcasion:productGbl.typeOcasion,
        size:{
          idTypeProduct:this.typeSizeSelected.idTypeProduct,
          typeProduct:this.typeSizeSelected.typeProduct,
          sizes:[
            // {
            //   size:"",
            //   description:""
            // }
          ]
        },
        quantityInStock:productGbl.quantityInStock,
        createAt:""
      }
        
      if (this.file) { 
        isChange = true;
        
      }
        
      if (JSON.stringify(this.payloadConst) !== JSON.stringify(this.payloadProduct)) {
        isChange = true;
      }else{
        if (!isChange) {
          this.alertMessage = "3";
          $("#modalAlert").modal("show");
         
        } 
      }  
      
  
      if (isChange === true) {
        
        
        this.payloadProduct.size.sizes = this.sizesSelected;
        this.saveProduct();
      }else{
        spinner.classList.add("d-none");
        btn.removeAttribute("disabled");
      }
    },
    err => {
      spinner.classList.add("d-none");
      btn.removeAttribute("disabled");
    });

    
  }
  

  saveProduct(){

    
    this.payloadProduct.size.idTypeProduct = this.typeSizeSelected.idTypeProduct;
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");

    if (this.file) {
 
      this.productService.putProductWhitImagen(this.idProduct,this.payloadProduct,this.file).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        spinner.classList.add("d-none");
        
        const data:any = res;
        this.productsData = data.res;
        btn.setAttribute("disabled","false");
        this.router.navigate(["admin77/manage_products"]);
      }, err =>{
        spinner.classList.add("d-none");
        console.log(err);
      });
    }else{
      this.productService.putProduct(this.idProduct,this.payloadProduct).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
        spinner.classList.add("d-none");
        const data:any = res;
        this.productsData = data.res;
        btn.setAttribute("disabled","false");
        this.router.navigate(["admin77/manage_products"]);
      }, err =>{
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
