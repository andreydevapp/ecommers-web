import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, SearchSettingsModel, EditSettingsModel, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setCulture, L10n } from '@syncfusion/ej2-base';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { OcasionService } from 'src/app/services/ocasion.service';
setCulture('es-LATAM');
declare var $: any;

@Component({
  selector: 'app-ocasion',
  templateUrl: './ocasion.component.html',
  styleUrls: ['./ocasion.component.css']
})
export class OcasionComponent implements OnInit {

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

  constructor(private route:Router, private ocasionService:OcasionService) { }

  ocacionsData:any = [];
  toDelete = "";
  idToDelete = "";

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
          'EmptyRecord': 'Sin Ocaciones Creadas',
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

    this.ocasionService.getOcasion().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.ocacionsData = data.res.filter(data => data._id !== "5ec01296781f295258425a64");
    }, err =>{
      console.log(err);
    }); 
  }


  edit(id){
    this.ocasionService.ocasion = this.ocacionsData.filter(data => data._id === id)[0];
    this.route.navigate(["/admin77/manage_type_ocasion/edit"])
  }

  

  alertTodelete(id,name){
    this.idToDelete = id;
    this.toDelete = name;
    $("#modalAlert").modal("show");
  }

  deleteOcasion(){
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");

    this.ocasionService.deleteOcasion(this.idToDelete).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.ocacionsData = data.res.filter(data => data._id !== "5ec01296781f295258425a64");
      spinner.classList.add("d-none");
      $('#modalAlert').modal('hide');
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
