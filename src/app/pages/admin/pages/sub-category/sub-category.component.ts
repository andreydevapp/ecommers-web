import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, SearchSettingsModel, EditSettingsModel, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setCulture, L10n } from '@syncfusion/ej2-base';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

setCulture('es-LATAM');
declare var $: any;
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public searchOptions: SearchSettingsModel;
  public searchOptionsSubCategory: SearchSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public orderData: object;
  public costRules: Object;
  public costRulesSubCategory: Object;
  private unsubscribe$ = new Subject<void>();
  @ViewChild('gridCategory') public grid: GridComponent;

  categoryData:any = [];
  subCategoriasData:any = []
  idCategorySelected = "";
  categoryToDelete = "";
  idCategoryToDelete = "";

  payloadCategorySelected:any = {
    id:"",
    name:""
  }

  constructor(private categoryService:CategoryService, private router:Router) { }

  ngOnInit(): void {
    this.categoryService.category = [];
    this.pageSettings = { pageSize: 10 };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog:true, mode: 'Normal' };
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
          'EmptyRecord': 'Sin Sub Categorías que mostrar',
          'PdfExport': 'Exportar a PDF',
          'OKButton': 'Aceptar',
          'CancelButton': 'Cancelar',    
          'SelectAll': 'Seleccionar todo',
          'ClearFilter': 'Limpiar filtro',
          'TextFilter': 'Filtros de texto',
          'Matchs': 'Sin Sub Categorias que mostrar',
          'NoResult': 'Sin Sub Categorias que mostrar',
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

    this.categoryService.getCategories().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      console.log(res);
      const data:any = res;
      this.categoryData = data.res;
    }, err =>{
      console.log(err);
    });

    this.categoryService.getAllSubCategories().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.subCategoriasData = data.res.filter(data => data.categoryFather !== "");
    }, err =>{
      console.log(err);
    });

  }

  editSubCategory(_id){
    this.categoryService.subCategory = this.subCategoriasData.filter(data => data._id === _id)[0];
    this.router.navigate(["admin77/manage_sub_categories/edit"]);
  }

  openModalDelete(id,nameCategory){
    this.categoryToDelete = nameCategory;
    this.idCategoryToDelete = id;
    $('#modalAlert').modal('show');
  }

  deleteCategory(){
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");

    this.categoryService.deleteCategory(this.idCategoryToDelete,"subCategory").pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      console.log("delete res",res);
      const data:any = res;
      console.log("respuesta del delete",data.res.subCategories);
      
      if (this.payloadCategorySelected.id === "") {
        this.categoryService.getAllSubCategories().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
          const data:any = res;
          this.subCategoriasData = data.res.filter(data => data.categoryFather !== "");
          spinner.classList.add("d-none");
          $('#modalAlert').modal('hide');
        }, err =>{
          console.log(err);
        });
      }else{
        this.subCategoriasData = data.res.subCategories;
        spinner.classList.add("d-none");
        $('#modalAlert').modal('hide');
      }

      
    }, err =>{
      spinner.classList.add("d-none");
      $('#modalAlert').modal('hide');
      console.log(err);
    });
  }

  getSubCategories(categoryFather){
    console.log("get sub category", categoryFather);
    
    this.categoryService.getSubCategories(categoryFather).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      console.log("sub categories", data);
      
      this.subCategoriasData = data.res;
    }, err =>{
      console.log(err);
    });
  }

  getAllSubCategories(){
    this.categoryService.getAllSubCategories().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.subCategoriasData = data.res.filter(data => data.categoryFather !== "");
    }, err =>{
      console.log(err);
    });
  }

}
