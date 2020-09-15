import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, SearchSettingsModel, EditSettingsModel, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setCulture, L10n } from '@syncfusion/ej2-base';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { SizesService } from 'src/app/services/sizes.service';
import { BrandsService } from 'src/app/services/brands.service';
import { Router } from '@angular/router';
setCulture('es-LATAM');
declare var $: any;

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public searchOptions: SearchSettingsModel;
  public searchOptionsSubCategory: SearchSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public orderData: object;
  public costRules: Object;
  public costRules2: Object;
  private unsubscribe$ = new Subject<void>();
  @ViewChild('gridCategory') public grid: GridComponent;


  typeSizesData:any = [];
  sizesData:any = []
  idTypeSizeSelected = "";
  typeSizeSelected = "";
  brandToDelete = "";
  idToDelete = "";

  brandData:any = [];
  
  constructor(private sizesService:SizesService, private brandsService: BrandsService, private route:Router) { }

  ngOnInit(): void {
    this.pageSettings = { pageSize: 10 };
    this.toolbar = ['Search'];
    
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
          'EmptyRecord': 'Sin Marcas Creadas',
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

    //get category
    this.brandsService.getBrands().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.brandData = data.res.filter(brand => brand._id != "5ebca6684ecbde38442b7c69");
    }, err =>{
      console.log(err);
    }); 
  }

  edit(id){
    this.brandsService.brand = this.brandData.filter(data => data._id === id)[0];
    this.route.navigate(["/admin77/manage_brands/edit"])
  }

  

  alertTodelete(id,name){
    this.idToDelete = id;
    this.brandToDelete = name;
    $("#modalAlert").modal("show");
  }

  deleteBrand(){
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    this.brandsService.deleteBrand(this.idToDelete).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.brandData = data.res;
      spinner.classList.add("d-none");
      $('#modalAlert').modal('hide');
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
