import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-aside-menu-admin',
  templateUrl: './aside-menu-admin.component.html',
  styleUrls: ['./aside-menu-admin.component.css']
})
export class AsideMenuAdminComponent implements OnInit {

  constructor(private navigationService:NavigationService) { }

  navData:any = [];
  accIventory = false;
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    

    this.navigationService.getNavigation().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      console.log(res);
      const data:any = res;
      this.navData = data.res;
      console.log("navigation",this.navData);
      
    }, err =>{
      console.log(err);
    }); 

  }

  accIventoryActive(idUp, idDown){

    var panel = document.getElementById("panel");
    if (panel.style.maxHeight) {
      console.log("subir");
      document.getElementById(idUp).classList.add("d-none");
      document.getElementById(idDown).classList.remove("d-none");
      panel.style.maxHeight = null;
      if (this.idCaretActive != "") {
        document.getElementById(this.idCaretActive).classList.add("d-none");
        document.getElementById(this.idContainer).classList.remove("text-white");
      }
    } else {
      console.log("bajar");
      
      document.getElementById(idUp).classList.remove("d-none");
      document.getElementById(idDown).classList.add("d-none");
      panel.style.maxHeight = panel.scrollHeight + "px";
      if (this.idCaretActive != "") {
        document.getElementById(this.idCaretActive).classList.remove("d-none");
        document.getElementById(this.idContainer).classList.add("text-white");
      }
    }

    if (this.accIventory) {
      this.accIventory = false;
      const docIventory = document.getElementById("acc_iventory");
      const docBtnIventory = document.getElementById("btn_acc_iventory");
      docIventory.classList.remove("accordion-active");
      docBtnIventory.classList.remove("left-active");
    }else{
      this.accIventory = true;
      const docIventory = document.getElementById("acc_iventory");
      const docBtnIventory = document.getElementById("btn_acc_iventory");
      console.log(docBtnIventory);
      
      docIventory.classList.add("accordion-active");
      docBtnIventory.classList.add("left-active");
    }
  }

  idCaretActive:string = "";
  idContainer:string = "";
  subNavActive(idCaret, idContainer){
    
    
    document.getElementById(idCaret).classList.remove("d-none");
    document.getElementById(idContainer).classList.add("text-white");
    if (document.getElementById(this.idCaretActive)) {
      document.getElementById(this.idCaretActive).classList.add("d-none");
      document.getElementById(this.idContainer).classList.remove("text-white");
    }
    
    this.idCaretActive = idCaret;
    this.idContainer = idContainer
    console.log("id1",idCaret);
    console.log("id2",this.idCaretActive);
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
