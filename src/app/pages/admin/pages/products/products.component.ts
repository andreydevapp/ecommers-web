import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BrandsService } from 'src/app/services/brands.service';
import { SizesService } from 'src/app/services/sizes.service';
import { ProductsService } from 'src/app/services/products.service';
import { PageSettingsModel, ToolbarItems, SearchSettingsModel, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { setCulture, L10n } from '@syncfusion/ej2-base';
import { Router, ActivatedRoute } from '@angular/router';
setCulture('es-LATAM');
declare var $: any;
interface HtmlInputEvent extends Event{
  target:HTMLInputElement &  EventTarget
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public searchOptions: SearchSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public orderData: object;
  public costRules: Object;

  constructor(private categoryService:CategoryService, private brandsService: BrandsService, private sizesService:SizesService, private productService:ProductsService, private route:Router, private rutaActiva: ActivatedRoute) { }

  productsData:any = [];
  catagoriesData:any = [];
  subCategoryData:any = [];
  sizesData:any = [];
  nameProduct:string = "";

  categorySelected = {
    nameCategory:"",
    idCategory:""
  };
  subCategorySelected = {
    nameCategory:"",
    idCategory:""
  };

  file:File;
  photoSelected:string | ArrayBuffer;
  fileSecundary:File;
  arrayImgs:any = [];
  photoSelectedArray:any = [];
  brandData:any = [];
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
  urlSelected = "";
  alertMessage = "";

  _id = "";  
  color: string;
  buttonText:Object;
  
  private unsubscribe$ = new Subject<void>();
  ngOnInit(): void {

    this.buttonText={cancel: "Cerrar", apply: "Guardar"};
    this.color ="#000000";
    console.log("color", this.color);

    console.log("id arams",this.rutaActiva.snapshot.params.id);
    this.nameProduct = this.rutaActiva.snapshot.params.id.split("&&")[0];
    this._id = this.rutaActiva.snapshot.params.id.split("&&")[1];
    L10n.load({
      'es-LATAM': {
        'grid': {
          'Add': 'Agregar',
          'ExcelExport': 'Exportar a Excel',
          'Edit': 'Editar',
          'Delete': 'Eliminar',
          'Update': 'Actualizar',
          'Cancel': 'Cancelar',
          'Search': 'Buscar',
          'EmptyRecord': 'Sin coincidencias',
          'PdfExport': 'Exportar a PDF',
          'OKButton': 'Aceptar',
          'CancelButton': 'Cancelar',    
          'SelectAll': 'Seleccionar todo',
          'ClearFilter': 'Limpiar filtro',
          'TextFilter': 'Filtros de texto',
          'Matchs': 'No se encontraron coincidencias',
          'NoResult': 'No se encontraron coincidencias',
          'Equal': 'Igual',
          'NotEqual': 'Diferente',
          'StartsWith': 'Inicia con',
          'EndsWith': 'Termina con',
          'Contains': 'Contiene',
          'LessThan': 'Menor que',
          'LessThanOrEqual': 'Menor ó igual que',
          'GreaterThan': 'Mayor que',
          'GreaterThanOrEqual': 'Mayor ó igual que',
          'EnterValue': 'Ingrese un valor',       
          'AND': 'Y',
          'OR': 'Ó',
          // 'MatchCase': 'Ó',
          'CustomFilter': 'Filtro personalizado',
          'ShowRowsWhere': 'Mostrar filas cuando:',
          'CustomFilterPlaceHolder': 'Ingrese un valor',
          "ConfirmDelete": "Se eliminara permanentemente del sistema. ¿Desea continua?", 
  
          "BatchSaveConfirm": "Change your text",
  
          "BatchSaveLostChanges": "Change your text",
  
          "CancelEdit": "Change your text" 
        },
        'pager': {
          'currentPageInfo': '{0} de {1} página(s)',
          'totalItemsInfo': '({0} elemento(s))'
        }
      }
    });

    this.pageSettings = { pageSize: 20 }; 
    this.toolbar = ['Search'];
  
    this.categoryService.getCategories().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      console.log(res);
      const data:any = res;
      this.catagoriesData = data.res;
    }, err =>{
      console.log(err);
    });

    this.productService.getProduct(this._id).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      
      const data:any = res;
      this.productsData = data.res.products;
      console.log("products", this.productsData);
      console.log("data",data);
      
    }, err =>{
      console.log(err);
    });

    this.sizesService.getSizes().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      
      const data:any = res;
      this.typeSizesData = data.res;
    }, err =>{
      console.log(err);
    });

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
        console.log(res);
        const data:any = res;
        this.subCategoryData = data.res;
      }, err =>{
        console.log(err);
      });
      this.getProductByUrl();
    }else{  
      console.log("Todass");
      
      this.productService.getProducts().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      
        const data:any = res;
        this.productsData = data.res;
        console.log(this.productsData);
      }, err =>{
        console.log(err);
      });
    }

    
  }

  subCategoryAccion(nameCategory, _id){
    this.subCategorySelected.nameCategory = nameCategory;
    this.subCategorySelected.idCategory = _id;
    this.urlSelected = this.categorySelected.nameCategory +"/"+ nameCategory;
    this.getProductByUrl();
  }

  getProductByUrl(){
    console.log("url",this.urlSelected);
    
    this.productService.getUrlProduct(this.urlSelected).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      
      const data:any = res;
      this.productsData = data.res;
      console.log("by url",this.productsData);
    }, err =>{
      console.log(err);
    });
  }

 
  editProduct(id){
     
    this.productService.saveProductGbl(this.productsData.filter(data => data._id === id)[0]);
    this.route.navigate(["/admin77/manage_type_products/manage_products/edit"])
    
  }

  productToDelete:string = "";
  idProduct:string = "";

  alertToDelete(_id){
    this.productToDelete = _id;
    this.idProduct = _id;
    $("#modalAlert").modal("show");
  }

  deleteProduct(){
   
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const product:any = this.productsData.filter(data => data._id === this.idProduct)[0];
    
    this.productService.deleteProduct(this._id, this.idProduct, this.nameProduct).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      spinner.classList.add("d-none");
      $('#modalAlert').modal('hide');
       this.categorySelected.nameCategory = "";
       this.categorySelected.idCategory = "";
       this.subCategorySelected.nameCategory = "";
       this.subCategorySelected.idCategory = "";
      const data:any = res;
      this.productsData = data.res;
      console.log("by url",this.productsData);
    }, err =>{
      spinner.classList.add("d-none");
      $('#modalAlert').modal('hide');
      console.log(err);
    });
  }



  //add product

  cleanModal(){
    this.arrayImgs = [];
    this.color = "#000000";
    this.file = null;
    this.fileSecundary = null;
    this.payloadProduct.quantityInStock = null;
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
    const spinner = document.getElementById("spinnerSave");
    spinner.classList.remove("d-none");
    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");

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
    }else{
      btn.setAttribute("disabled","false");
      spinner.classList.add("d-none");
    }
    
  }

  saveProduct(){
    const spinner = document.getElementById("spinnerSave");
    spinner.classList.remove("d-none");
    const btn =  document.getElementById("btn-add");
    btn.setAttribute("disabled","disabled");
    this.productService.newProduct(this.file, this.arrayImgs, this.payloadProduct, this._id, this.nameProduct).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      spinner.classList.add("d-none");
      $('#newDetailModal').modal('hide');
      const data:any = res;
      this.productsData = data.res;
      console.log("products", data);
      btn.removeAttribute("disabled");
      this.file = null;
      this.fileSecundary = null;
      this.arrayImgs = [];
      this.payloadProduct.quantityInStock = null;
      this.color = "#000000";
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



  

}
