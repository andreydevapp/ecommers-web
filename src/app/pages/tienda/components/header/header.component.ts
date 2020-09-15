import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  asideMenuShow = false;
  showContainterCar = false;
  scrollDir = 0;
  headerPresentAt = 0;
  categoryData:any = [];
  subCategoriasData:any = []
  imgSubCategories:any = [];
  imgIsLoad = false;

  navData:any = [];
  
  private unsubscribe$ = new Subject<void>();
  constructor(private categoryService:CategoryService, private router:Router) {
    
  }

  
  ngOnInit(): void {
    var coll = document.getElementsByClassName("collapsible");  
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    }

    

    $(window).scroll(function(event) {
      var scrollLeft = $(window).scrollLeft();
      var scrollTop = $(window).scrollTop();
      
      if (this.scrollDir > scrollTop) {
        if (scrollTop >= 421) {
          console.log("aplico el menu");
          const headerMin = document.getElementById("header-min");
            headerMin.classList.remove("header-min-show-none");
            headerMin.classList.add("header-min-show");
            this.headerPresentAt = scrollTop+100;
        }else{
          console.log("oculto el menu");
          const headerMin = document.getElementById("header-min");
          headerMin.classList.remove("header-min-show");
          headerMin.classList.add("header-min-show-none")
        }
        console.log("estoy subiendo");
        this.scrollDir = scrollTop;
      }else{
        console.log(this.headerPresentAt," es menor que ",scrollTop);
        
        if (scrollTop >= 421) {
          if (this.headerPresentAt < scrollTop) {
            const headerMin = document.getElementById("header-min");
            headerMin.classList.remove("header-min-show");
            headerMin.classList.add("header-min-show-none");
          }
        }
        
        console.log("estoy bajando");
        this.scrollDir = scrollTop;
      }
      console.log(scrollTop);
      
      
    });


    //get category
    this.categoryService.getCategories().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      console.log(res);
      const data:any = res;
      this.categoryData = data.res;
      this.getSubCaregories();
    }, err =>{
      console.log(err);
    });

  }


  getSubCaregories(){

    this.categoryService.getAllSubCategories().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.subCategoriasData = data.res.filter(data => data.categoryFather !== "");

      let cont = 0;
      for (let i = 0; i < this.categoryData.length; i++) {

        let payload = {
          category:this.categoryData[i].nameCategory,
          url:this.categoryData[i].nameCategory,
          subCategories:[],
          imgSubCategories:[]
        }
       
        for (let a = 0; a <this.subCategoriasData.length; a++) {
          
          if (this.categoryData[i]._id === this.subCategoriasData[a].categoryFather) {
            //agregar url
            const payloadUrl = {
              nameCategory:this.subCategoriasData[a].nameCategory,
              url:this.categoryData[i].nameCategory+"/"+this.subCategoriasData[a].nameCategory
            };
            payload.subCategories.push(payloadUrl);

            //agregar imagen
            if (cont < 2) {
              const payloadImg = {
                nameCategory: this.subCategoriasData[a].nameCategory,
                imagenUrl:this.subCategoriasData[a].imagenUrl,
                url:this.categoryData[i].nameCategory+"/"+this.subCategoriasData[a].nameCategory
              };
              payload.imgSubCategories.push(payloadImg);
              cont ++;
            }
           
          }
          
        }
        this.navData.push(payload);
        cont = 0;
      }
      this.imgIsLoad = true;
      console.log("payload",this.navData);
      

    }, err =>{
      console.log(err);
    });
  }

  name = 'Angular';

  over(){
    const containerMen = document.getElementById("id-container-men");
    containerMen.classList.remove("d-none");
    containerMen.classList.add("d-block");
    console.log("Mouseover called");
  }

  out(){
    const containerMen = document.getElementById("id-container-men");
    containerMen.classList.remove("d-block");
    containerMen.classList.add("d-none");
    console.log("Mouseout called");
  }

  showMenu(){
    const asideMenu = document.getElementById('aside-menu');
    if (this.asideMenuShow) {
      asideMenu.classList.add('show-menu-none');
      asideMenu.classList.add('d-block');
      asideMenu.classList.remove('show-menu');
      this.asideMenuShow = false;
    }else{
      asideMenu.classList.add('show-menu');
      asideMenu.classList.remove('show-menu-none');
      this.asideMenuShow = true;
    }
  }

  showCar(){
    const carConatiner = document.getElementById('car-container-movil');
    if (this.showContainterCar) {
      carConatiner.classList.add('show-container-car-none');
      carConatiner.classList.remove('show-container-car');
      this.showContainterCar = false;
    }else{
      carConatiner.classList.add('show-container-car');
      carConatiner.classList.remove('show-container-car-none');
      this.showContainterCar = true;
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
