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
setCulture('es-LATAM');
declare var $: any;
@Component({
  selector: 'app-type-product',
  templateUrl: './type-product.component.html',
  styleUrls: ['./type-product.component.css']
})
export class TypeProductComponent implements OnInit {

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public searchOptions: SearchSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public orderData: object;
  public costRules: Object;

  constructor(private categoryService:CategoryService, private brandsService: BrandsService, private sizesService:SizesService, private productService:ProductsService, private route:Router) { }

  productsData:any = [];
  catagoriesData:any = [];
  subCategoryData:any = [];
  sizesData:any = [];

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
  brandData:any = [];
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
    description:"",
    price:0,
    discount:0,
    code:"",
    brand:"",
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

  private unsubscribe$ = new Subject<void>();
  ngOnInit(): void {

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

    this.brandsService.getBrands().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      console.log(res);
      const data:any = res;
      this.brandData = data.res;
    }, err =>{
      console.log(err);
    });

    this.sizesService.getSizes().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      
      const data:any = res;
      this.typeSizesData = data.res;
      console.log(this.typeSizesData);
    }, err =>{
      console.log(err);
    });

    this.productService.getProducts().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      
      const data:any = res;
      this.productsData = data.res;
      console.log("productos",this.productsData);
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

  brandAccion(nameBrand){
    console.log(nameBrand);
    this.payloadProduct.brand = nameBrand;
  }

  typeSizeAccion(_id,typeProduct){
    console.log(typeProduct);

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
    console.log(size);

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
    console.log("agrego una talla");
    const payload = {
      size,
      description
    };
    this.sizesSelected.push(payload);
    console.log(this.sizesSelected);
    const sizeD = document.getElementById(size);
    sizeD.classList.add("container-size-active");
  }

  deleteSize(size,description) {
    console.log("elimino una talla");
    const sizeD = document.getElementById(size);
    sizeD.classList.remove("container-size-active");
    this.sizesSelected = this.sizesSelected.filter(data => data.size !== size);
    console.log(this.sizesSelected);
    
  }

  

  payloadEdit:any = {
    nameProduct:"",
    imagenUrl:"",
    url:"",
    description:"",
    price:0,
    discount:0,
    code:"",
    brand:"",
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
 
  editProduct(id){
     
    this.productService.saveProductGbl(this.productsData.filter(data => data._id === id)[0]);
    this.route.navigate(["/admin77/manage_type_products/edit"])
    
  }

  viewDetailProduct(id){
     
    this.productService.productDetail = id;
    this.route.navigate(["/admin77/manage_type_products/manage_products/"+this.productsData.filter(data => data._id === id)[0].nameProduct+"&&"+id])
    
  }

  goAdd(){
    if (this.catagoriesData.length > 0) {
      this.route.navigate(["/admin77/manage_type_products/add"]);
    }else{
      this.alertMessage = "1";
      $("#modalAlert").modal("show");
    }
  }

  productToDelete:string = "";
  idProduct:string = "";

  alertToDelete(_id, nameProduct){
    this.productToDelete = nameProduct;
    this.idProduct = _id;
    $("#modalAlert").modal("show");
  }

  deleteProduct(){
   
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const product:any = this.productsData.filter(data => data._id === this.idProduct)[0];
    
    this.productService.deleteTypeProduct(this.idProduct).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
