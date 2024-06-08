import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasketModule } from './basket/basket.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { RegisterModule } from './register/register.module';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    BasketModule,
    HomeModule,
    ProductsModule,
    RegisterModule,

  ],
  exports: [
    BasketModule
    ]
})
export class ComponentsModule { }
