import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { SizesService } from 'src/app/services/sizes.service';
import { BrandsService } from 'src/app/services/brands.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OcasionService } from 'src/app/services/ocasion.service';
declare var $: any;
interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private categoryService:CategoryService, private brandsService: BrandsService, private sizesService:SizesService, private productService:ProductsService, private ocasionService:OcasionService, private router:Router, private rutaActiva: ActivatedRoute) { }

  private unsubscribe$ = new Subject<void>();

  productsData:any = [];
  sizesData:any = [];
  _id:string = "";
  
  typeSizesData:any = [];

  typeSizeSelected = {
    typeProduct:"",
    idTypeProduct:""
  };

  sizesSelected:any = [];
  brandSelected:string = "";

  payloadProduct = {
    images:{
      mainImagen:{
          imagenUrl:"",
          keyImagenS3:""
      },
      secundaryImages:[]
    },
    size:{
      idTypeProduct:"",
      typeProduct:"",
      sizes:[
        // {
        //   size:"",
        //   description:""
        // }
      ]
    },
    color:"",
    quantityInStock:null,
    createAt:""
  }
  
  alertMessage = "";

  file:File;
  photoSelected:string | ArrayBuffer;
  fileSecundary:File;
  arrayImgs:any = [];
  photoSelectedArray:any = [];

  color: string;
  buttonText:Object;
  nameProduct = ""; 

  ngOnInit(): void {

    console.log("id arams",this.rutaActiva.snapshot.params.id);
    this.nameProduct = this.rutaActiva.snapshot.params.id.split("&&")[0];
    this._id = this.rutaActiva.snapshot.params.id.split("&&")[1];

    this.buttonText={cancel: "Cerrar", apply: "Guardar"};
    this.color ="#000000";
    console.log("color", this.color);

    this.sizesService.getSizes().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      
      const data:any = res;
      this.typeSizesData = data.res;
    }, err =>{
      console.log(err);
    });

  }

  typeSizeAccion(_id,typeProduct){
    if (this.typeSizeSelected.typeProduct !== typeProduct) {
      this.sizesData = [];
      this.sizesSelected = [];
      const size:any = this.typeSizesData.filter(data => data._id === _id);
      this.sizesData = size[0].sizes;
      
      this.payloadProduct.size.typeProduct = typeProduct;
      this.payloadProduct.size.idTypeProduct = _id;
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

  // newProduct(){

  //   if (this.categorySelected.nameCategory !== '') {
  //     if (this.typeSizesData.length > 0) {
  //       $('#modalAddProduct').modal('show');
  //     }
      
  //   }else{
  //     this.alertMessage = "1";
  //     $('#modalAlert').modal('show');
  //   }

  // }

  sizeErr = "";

  validateProduct(){

    let error = false;
    this.sizeErr = "";

    if (this.sizesSelected.length === 0) {
      this.sizeErr = "Las tallas del producto es requerido"
    }

    if (this.payloadProduct.quantityInStock < 0 || this.payloadProduct.quantityInStock == null || this.payloadProduct.quantityInStock == undefined || this.payloadProduct.quantityInStock == 0) {
      this.payloadProduct.quantityInStock = 0;
    }

    if (!this.file) {
      this.alertMessage = "2"; 
      $('#modalAlert').modal('show');
      error = true;  
    }

    if (this.color === '') {
      error = true;
    }

    if (!error) {
      this.payloadProduct.size.sizes = this.sizesSelected;
      this.payloadProduct.color = this.color;
      this.saveProduct();
    }
    
  }

  saveProduct(){
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");
    this.productService.newProduct(this.file, this.arrayImgs, this.payloadProduct, this._id, this.nameProduct).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      spinner.classList.add("d-none");
      $('#modalAddProduct').modal('hide');
      const data:any = res;
      this.productsData = data.res;
      btn.setAttribute("disabled","false");
      this.router.navigate(["admin77/manage_products"]);
    }, err =>{
      btn.setAttribute("disabled","false");
      spinner.classList.add("d-none");
      console.log(err);
    });
  }

  onImgSelected(event:HtmlInputEvent):void{
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  onImgsSelected(event:HtmlInputEvent):void{
    if (event.target.files && event.target.files[0]) {
      this.fileSecundary = <File>event.target.files[0];
      this.arrayImgs.push(this.fileSecundary);
      const reader = new FileReader();
      reader.onload = e => this.photoSelectedArray.push(reader.result);
      reader.readAsDataURL(this.fileSecundary);
    }
    console.log("imagenes",this.arrayImgs);
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

  probar(){
    
  }

}
