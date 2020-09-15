import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { takeUntil } from 'rxjs/operators';
import { OcasionService } from 'src/app/services/ocasion.service';
declare var $:any;
@Component({
  selector: 'app-tienda-page',
  templateUrl: './tienda-page.component.html',
  styleUrls: ['./tienda-page.component.css']
})
export class TiendaPageComponent implements OnInit {

  constructor( private ocasionService:OcasionService, private categoryService:CategoryService, private router:Router) { }
  
  categoryData:any = [];
  ocacionsData:any = [];
  contCarrusel:number = 0;

  title = 'angularowlslider';
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    dots: false,
    navSpeed: 700,
    smartSpeed: 900,
    navText: [
      "<div class='nav-btn prev-slide'><i class='fa fa-chevron-left'></i></div>",
      "<div class='nav-btn next-slide'><i class='fa fa-chevron-right'></i></div>"
    ],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      1080: {
        items: 4
      }
    },
    nav: true
  }


  customOptionsOcasion: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      "<div class='nav-btn prev-slide'><i class='fa fa-chevron-left'></i></div>",
      "<div class='nav-btn next-slide'><i class='fa fa-chevron-right'></i></div>"
    ],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  customOptionsOcasionResponsive: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      "<div class='nav-btn prev-slide'><i class='fa fa-chevron-left'></i></div>",
      "<div class='nav-btn next-slide'><i class='fa fa-chevron-right'></i></div>"
    ],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  }


  ngOnInit(): void {
    

    //get category
    this.ocasionService.getOcasion().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.ocacionsData = data.res.filter(data => data._id !== "5ec01296781f295258425a64");
    }, err =>{
      console.log(err);
    }); 

    this.categoryService.getCategories().pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{
      const data:any = res;
      this.categoryData = data.res;
    }, err =>{
      console.log(err);
    });

  }

  cont = 0;

  class(){

    let rotate = "rotate";
    if (this.cont < 4) {
      rotate = rotate + this.cont;
    }else{
      this.cont = 0;
      rotate = rotate + this.cont;
    }

    this.cont ++;
    return "card-category "+ rotate;
  }

  private unsubscribe$ = new Subject<void>();

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this. unsubscribe$.next();
    this. unsubscribe$.complete();
  }

}
