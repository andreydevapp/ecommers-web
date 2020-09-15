import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatCheckboxModule} from '@angular/material/checkbox';

//syncfusion
import { GridModule, PageService, SortService, FilterService, GroupService, SearchService, ToolbarService, EditService} from '@syncfusion/ej2-angular-grids';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

//admin
import { AdminComponent } from './pages/admin/admin.component';

//tienda

import { FootherComponent } from './pages/tienda/components/foother/foother.component';
import { BodyComponent } from './pages/tienda/components/body/body.component';
import { HeaderComponent } from './pages/tienda/components/header/header.component';
import { HeaderAdminComponent } from './pages/admin/components/header-admin/header-admin.component';
import { BodyAdminComponent } from './pages/admin/components/body-admin/body-admin.component';
import { AsideMenuAdminComponent } from './pages/admin/components/aside-menu-admin/aside-menu-admin.component';
import { CategoryComponent } from './pages/admin/pages/category/category.component';
import { ProductsComponent } from './pages/admin/pages/products/products.component';
import { SizesComponent } from './pages/admin/pages/sizes/sizes.component';
import { BrandsComponent } from './pages/admin/pages/brands/brands.component';
import { SubCategoryComponent } from './pages/admin/pages/sub-category/sub-category.component';
import { AddCategoryComponent } from './pages/admin/pages/category/add-category/add-category.component';
import { EditCategoryComponent } from './pages/admin/pages/category/edit-category/edit-category.component';
import { AddSubCategoryComponent } from './pages/admin/pages/sub-category/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './pages/admin/pages/sub-category/edit-sub-category/edit-sub-category.component';
import { AddBrandComponent } from './pages/admin/pages/brands/add-brand/add-brand.component';
import { EditBrandComponent } from './pages/admin/pages/brands/edit-brand/edit-brand.component';
import { AddSizesComponent } from './pages/admin/pages/sizes/add-sizes/add-sizes.component';
import { EditSizesComponent } from './pages/admin/pages/sizes/edit-sizes/edit-sizes.component';
import { AddProductsComponent } from './pages/admin/pages/products/add-products/add-products.component';
import { EditProductsComponent } from './pages/admin/pages/products/edit-products/edit-products.component';
import { OcasionComponent } from './pages/admin/pages/ocasion/ocasion.component';
import { AddOcasionComponent } from './pages/admin/pages/ocasion/add-ocasion/add-ocasion.component';
import { EditOcasionComponent } from './pages/admin/pages/ocasion/edit-ocasion/edit-ocasion.component';
import { TiendaPageComponent } from './pages/tienda/pages/tienda-page/tienda-page.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { CategoryStoreComponent } from './pages/tienda/pages/category-store/category-store.component';
import { TypeProductComponent } from './pages/admin/pages/type-product/type-product.component';
import { AddTypeProductComponent } from './pages/admin/pages/type-product/add-type-product/add-type-product.component';
import { EditTypeProductComponent } from './pages/admin/pages/type-product/edit-type-product/edit-type-product.component';
import { RegisterUserStorageComponent } from './pages/tienda/pages/register-user-storage/register-user-storage.component';

const routes: Routes = [
  { path: '',   redirectTo: '/admin77', pathMatch: 'full' },
  { path: 'tienda',   redirectTo: '/tienda/home', pathMatch: 'full' },
  { path: 'tienda', component: TiendaComponent, children:[
    { path: 'home', component: TiendaPageComponent },
    { path: 'category/:id', component: CategoryStoreComponent },
    { path: 'register', component: RegisterUserStorageComponent },
    
  ]},
  { path: 'admin77', component: AdminComponent, children:[
    {path: 'manage_categories', component: CategoryComponent},
    {path: 'manage_categories/add', component: AddCategoryComponent},
    {path: 'manage_categories/edit', component: EditCategoryComponent},
    {path: 'manage_sub_categories', component: SubCategoryComponent},
    {path: 'manage_sub_categories/add', component: AddSubCategoryComponent},
    {path: 'manage_sub_categories/edit', component: EditSubCategoryComponent},
    {path: 'manage_type_products', component: TypeProductComponent},
    {path: 'manage_type_products/add', component: AddTypeProductComponent},
    {path: 'manage_type_products/edit', component: EditTypeProductComponent},
    {path: 'manage_type_products/manage_products/:id', component: ProductsComponent},
    {path: 'manage_type_products/manage_products/:id/add', component: AddProductsComponent},
    {path: 'manage_type_products/manage_products/:id/edit', component: EditProductsComponent},
    {path: 'manage_sizes', component: SizesComponent},
    {path: 'manage_sizes/add', component: AddSizesComponent},
    {path: 'manage_sizes/edit', component: EditSizesComponent},
    {path: 'manage_brands', component: BrandsComponent},
    {path: 'manage_brands/add', component: AddBrandComponent},
    {path: 'manage_brands/edit', component: EditBrandComponent},
    {path: 'manage_type_ocasion', component: OcasionComponent},
    {path: 'manage_type_ocasion/add', component: AddOcasionComponent},
    {path: 'manage_type_ocasion/edit', component: EditOcasionComponent},

  ]},
  { path: '**', component: TiendaComponent },
]; // sets up routes constant where you define your routes


@NgModule({
  declarations: [
    TiendaComponent,
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FootherComponent,
    AdminComponent,
    HeaderAdminComponent,
    BodyAdminComponent,
    AsideMenuAdminComponent,
    ProductsComponent,
    CategoryComponent,
    SizesComponent,
    BrandsComponent,
    SubCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent,
    AddBrandComponent,
    EditBrandComponent,
    AddSizesComponent,
    EditSizesComponent,
    AddProductsComponent,
    EditProductsComponent,
    OcasionComponent,
    AddOcasionComponent,
    EditOcasionComponent,
    TiendaPageComponent,
    CategoryStoreComponent,
    TypeProductComponent,
    AddTypeProductComponent,
    EditTypeProductComponent,
    RegisterUserStorageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    GridModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    ColorPickerModule
  ],
  exports: [RouterModule],
  providers: [
    PageService, SortService, FilterService, GroupService, SearchService, ToolbarService, EditService,
    HeaderComponent,
    BodyComponent,
    FootherComponent,
    AdminComponent,
    HeaderAdminComponent,
    BodyAdminComponent,
    AsideMenuAdminComponent,
    ProductsComponent,
    CategoryComponent,
    SizesComponent,
    BrandsComponent,
    SubCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent,
    AddBrandComponent,
    EditBrandComponent,
    AddSizesComponent,
    EditSizesComponent,
    AddProductsComponent,
    EditProductsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
