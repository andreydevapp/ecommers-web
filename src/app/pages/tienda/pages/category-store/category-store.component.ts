import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { DOCUMENT } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-category-store',
  templateUrl: './category-store.component.html',
  styleUrls: ['./category-store.component.css']
})
export class CategoryStoreComponent implements OnInit {

  categoryData:any = [];
  subCategoryData:any = [];
  productsData:any = [];
  typeSizesData:any = [];
  brandsData:any = [];
  ocacionsData:any = [];
  colorData:any = [];
  idParams:string = "";
  nameParams:string = "";


  //filter

  //filter data
  toShowFilter:any = [];
  
  quantityOfProducts:number = 60;
  payloadFilterBrand:any = [];
  payloadFilterOcasion:any = [];
  payloadFilterSize:any = [];
  payloadFilterColor:any = [];

  productsDataWhitFilter:any = [];
  priceMin: number;
  priceMax: number;
  filterPrice: number = 1;

  //to filter brand
  idBrandFilter = "";
  idSizeFilter = "";
  countProducts;
  
  rute = "";

  //errores
  precioErr = false;
  
  private unsubscribe$ = new Subject<void>();
  constructor(private rutaActiva: ActivatedRoute, private productService:ProductsService, private router:Router, @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    
    console.log("id arams",this.rutaActiva.snapshot.params.id);
    this.idParams = this.rutaActiva.snapshot.params.id.split("#id:")[1];
    this.nameParams = this.rutaActiva.snapshot.params.id.split("#id:")[0];
    
    this.productService.getProductsStoreCategory(this.idParams, this.filterPrice).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.productsData = data.res.products;
      this.countProducts = this.productsData.length;
      this.categoryData = data.res.categories;
      this.subCategoryData = this.categoryData.filter(data => data.categoryFather === this.idParams);
      console.log(this.productsData);
      this.buildBrand();
      this.buildSizes();
      this.buildColor();
      this.buildOcasion();
    }, err =>{
      console.log(err);
    });
  }

  buildBrand(){
    let payloadBrand:any = [];
    for (let i = 0; i < this.productsData.length; i++) {
      if ( payloadBrand.length > 0) {
        let isRepeat = false;
        for (let l = 0; l < payloadBrand.length; l++) {
          if (this.productsData[i].brand.idBrand == payloadBrand[l].idBrand) {
            isRepeat = true;
            break;
          }
        }
        if (!isRepeat) {
          payloadBrand.push({
            idBrand: this.productsData[i].brand.idBrand,
            brand: this.productsData[i].brand.brand,
            cont:0
          });
        }
      }else{
        payloadBrand.push({
          idBrand: this.productsData[i].brand.idBrand,
          brand: this.productsData[i].brand.brand,
          cont:0
        });
      } 
    }
    this.brandsData = payloadBrand;

    for (let i = 0; i < this.brandsData.length; i++) {
      this.brandsData[i].cont = this.productsData.filter(data => data.brand.idBrand === this.brandsData[i].idBrand).length;
    }

    console.log("marcas",this.brandsData);
    
  }

  buildSizes(){
    let payloadSizes:any = [];
    for (let p = 0; p < this.productsData.length; p++) {
      for (let d = 0; d < this.productsData[p].products.length; d++) {
        for (let s = 0; s < this.productsData[p].products[d].size.sizes.length; s++) {
          console.log(payloadSizes.length);
           if (payloadSizes.length == 0) {
             payloadSizes.push({size:this.productsData[p].products[d].size.sizes[s].size,cont:0});
           }else{
             payloadSizes = this.validateToAddSize(this.productsData[p].products[d].size.sizes[s].size,payloadSizes);
           }
         }
        
      }
      
    } 

    for (let i = 0; i < payloadSizes.length; i++) {
      payloadSizes[i].cont = this.productsData.filter(data => data.products.find(isSize => isSize.size.sizes.find(isSize => isSize.size === payloadSizes[i].size))).length;
    }

    this.typeSizesData = payloadSizes;

    console.log("sizes", this.typeSizesData);
    
    
  }

  validateToAddSize(size, payloadSizes){
    let isRepeat = false;
    for (let i = 0; i < payloadSizes.length; i++) {
      if (payloadSizes[i].size === size) {
        isRepeat = true;
      }
    }
    if (!isRepeat) {
      payloadSizes.push({size,cont:0});
    }
    return payloadSizes;
  }

  buildOcasion(){
    let payloadOcasion:any = [];
    
    for (let i = 0; i < this.productsData.length; i++) {
      if (payloadOcasion.length == 0) {
        payloadOcasion.push({
          idType:this.productsData[i].typeOcasion.idType,
          type:this.productsData[i].typeOcasion.type,
          cont:0
        });
      }else{
        for (let l = 0; l < payloadOcasion.length; l++) {
          
          let isRepeat = false;
          for (let l = 0; l < payloadOcasion.length; l++) {
            if (this.productsData[i].typeOcasion.idType == payloadOcasion[l].idType) {
              isRepeat = true;
              break;
            }
          }

          if (!isRepeat) {
            payloadOcasion.push({
              idType:this.productsData[i].typeOcasion.idType,
              type:this.productsData[i].typeOcasion.type,
              cont:0
            });
          }
        }
      }
    }


    for (let i = 0; i < payloadOcasion.length; i++) {
      payloadOcasion[i].cont = this.productsData.filter(data => data.typeOcasion.idType === payloadOcasion[i].idType).length;
    }

    this.ocacionsData = payloadOcasion;

    console.log("ocasion data", this.ocacionsData);
  }


  buildColor(){

    for (let i = 0; i < this.productsData.length; i++) {
      for (let d = 0; d < this.productsData[i].products.length; d++) {
        
        
        if (this.colorData.length === 0) {
          this.colorData.push({color:this.productsData[i].products[d].color,cont:0});
        }else{
          let isRepeat = false;
          for (let l = 0; l < this.colorData.length; l++) {
            if (this.productsData[i].products[d].color == this.colorData[l].color) {
              isRepeat = true;
              break;
            }
          }

          if (!isRepeat) {
            this.colorData.push({color:this.productsData[i].products[d].color,cont:0});
          }
        }
        
      }
      
    }

    console.log("colores", this.colorData);
    

  }
  
  brandAccion(idBrand,brand){
    
    let isRepeat = false;
    let index = 0;

    for (let i = 0; i < this.payloadFilterBrand.length; i++) {
      if (this.payloadFilterBrand[i] === idBrand) {
        isRepeat = true;
        index = i;
        break;
      }
    }

    if (!isRepeat) {
      this.payloadFilterBrand.push(idBrand);
      this.toShowFilter.push({name:brand});
    }else{
      
      let newPayload:any = [];
      this.toShowFilter = this.toShowFilter.filter(data => data.name !== brand);
      for (let i = 0; i < this.payloadFilterBrand.length; i++) {
        if (this.payloadFilterBrand[i] !== idBrand) {
          newPayload.push(this.payloadFilterBrand[i]);
        }
      }
      this.payloadFilterBrand = newPayload;
    }

     
    if (this.payloadFilterBrand.length == 0 && this.payloadFilterSize.length === 0 && this.payloadFilterOcasion.length === 0 && this.payloadFilterColor.length == 0) {
      this.productsDataWhitFilter = [];
    }else{
      this.aplyFilter();
    }
    //rute?brand
  }

  

  sizeAccion(idSize,i){

    let isRepeat = false;
    let index = 0;

    for (let i = 0; i < this.payloadFilterSize.length; i++) {
      if (this.payloadFilterSize[i] === idSize) {
        isRepeat = true;
        index = i;
        break;
      }
    }

    if (!isRepeat) {
      this.toShowFilter.push({name:idSize});
      this.payloadFilterSize.push(idSize);
    }else{
      this.toShowFilter = this.toShowFilter.filter(data => data.name !== idSize);
      let newPayload:any = [];
      for (let i = 0; i < this.payloadFilterSize.length; i++) {
        if (this.payloadFilterSize[i] !== idSize) {
          newPayload.push(this.payloadFilterSize[i]);
        }
      }
      this.payloadFilterSize = newPayload;
    }

    if (this.payloadFilterBrand.length == 0 && this.payloadFilterSize.length === 0 && this.payloadFilterOcasion.length === 0 && this.payloadFilterColor.length == 0) {
      this.productsDataWhitFilter = [];
    }else{
      this.aplyFilter();
    }
    
  }

  

  ocasionAccion(idOcasion,ocasion){
    let isRepeat = false;
    let index = 0;

    for (let i = 0; i < this.payloadFilterOcasion.length; i++) {
      if (this.payloadFilterOcasion[i] === idOcasion) {
        isRepeat = true;
        index = i;
        break;
      }
    }

    if (!isRepeat) {
      this.toShowFilter.push({name:ocasion});
      this.payloadFilterOcasion.push(idOcasion);
    }else{
      this.toShowFilter = this.toShowFilter.filter(data => data.name !== ocasion);
      let newPayload:any = [];
      for (let i = 0; i < this.payloadFilterSize.length; i++) {
        if (this.payloadFilterOcasion[i] !== idOcasion) {
          newPayload.push(this.payloadFilterOcasion[i]);
        }
      }
      this.payloadFilterOcasion = newPayload;
    }

    if (this.payloadFilterBrand.length == 0 && this.payloadFilterSize.length === 0 && this.payloadFilterOcasion.length === 0 && this.payloadFilterColor.length == 0) {
      this.productsDataWhitFilter = [];
    }else{
      this.aplyFilter();
    }

  }

  

  colorAccion(color){
    let isRepeat = false;
    let index = 0;

    for (let i = 0; i < this.payloadFilterColor.length; i++) {
      if (this.payloadFilterColor[i] === color) {
        isRepeat = true;
        index = i;
        break;
      }
    }

    if (!isRepeat) {
      this.toShowFilter.push({name:color});
      this.payloadFilterColor.push(color);
    }else{
      this.toShowFilter = this.toShowFilter.filter(data => data.name !== color);
      let newPayload:any = [];
      for (let i = 0; i < this.payloadFilterColor.length; i++) {
        if (this.payloadFilterColor[i] !== color) {
          newPayload.push(this.payloadFilterColor[i]);
        }
      }
      this.payloadFilterColor = newPayload;
    }

    if (this.payloadFilterBrand.length == 0 && this.payloadFilterSize.length === 0 && this.payloadFilterOcasion.length === 0 && this.payloadFilterColor.length == 0) {
      this.productsDataWhitFilter = [];
    }else{
      this.aplyFilter();
    }
  }

  orderByAccion(num){
    this.filterPrice = num;
    this.aplyFilter();
  }

  

  priceAccion(){
    console.log("precio", this.priceMin);
    console.log("precio", this.priceMax);
    this.precioErr = false;
    if(this.priceMin === undefined || this.priceMax === undefined){
      this.precioErr = true;
    }

    if (this.priceMin < this.priceMax && !this.precioErr) {
      this.toShowFilter.push({name:this.priceMin+" - "+this.priceMax});
      this.aplyFilter();
    }else{

    }

  }

  deleteAllFilter(){
    this._document.defaultView.location.reload();
  }

  yes = false;

  aplyFilter(){
    let brandIsEmpy = false;
    let sizeIsEmpy = false;
    let ocasionIsEmpy = false;
    let colorIsEmpy = false;

    if (this.payloadFilterBrand.length == 0) {
      for (let i = 0; i < this.brandsData.length; i++) {
        this.payloadFilterBrand.push(this.brandsData[i].idBrand);    
      }
      brandIsEmpy = true;
    }

    if (this.payloadFilterSize.length == 0) {
      for (let i = 0; i < this.typeSizesData.length; i++) {
        this.payloadFilterSize.push(this.typeSizesData[i].size)
      }
      sizeIsEmpy = true;
    }

    if (this.payloadFilterOcasion.length == 0) {
      for (let i = 0; i < this.ocacionsData.length; i++) {
        this.payloadFilterOcasion.push(this.ocacionsData[i].idType);
      }
      ocasionIsEmpy = true;
    }

    if (this.payloadFilterColor.length == 0) {
      for (let i = 0; i < this.colorData.length; i++) {
        this.payloadFilterColor.push(this.colorData[i].color);
      }
      colorIsEmpy = true;
    }
    
    this.productService.filterProduct(this.payloadFilterBrand, this.payloadFilterSize, this.payloadFilterOcasion, this.payloadFilterColor, this.filterPrice, this.priceMin, this.priceMax).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;

      this.productsDataWhitFilter = data.res.products;
      this.yes = true;
      console.log("filtro aplicado",this.yes);
      
      if (brandIsEmpy) {
        this.payloadFilterBrand = [];
      }

      if (sizeIsEmpy) {
        this.payloadFilterSize = [];
      }

      if (ocasionIsEmpy) {
        this.payloadFilterOcasion = [];
      }

      if (colorIsEmpy) {
        this.payloadFilterColor = [];
      }
      console.log("filtro", data);
    }, err =>{
      console.log(err);
    });
    
  }

  quatityProductsAccion(opc){
    if (opc == 60) {
      document.getElementById("opc60").classList.add("number-products-active");
      document.getElementById("opc120").classList.remove("number-products-active");
    }else{
      document.getElementById("opc60").classList.remove("number-products-active");
      document.getElementById("opc120").classList.add("number-products-active");
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
