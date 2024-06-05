import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { BasketComponent } from './ui/components/basket/basket.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes =
  [
    //ana layout'un dışındakilerden başla, sonra ana layout'u yap.
    {
      path: "admin", component: LayoutComponent, children:
        [
          { path: "", component: DashboardComponent, canActivate: [AuthGuard] }, //dashboard için bu şekilde olacak
          {
            path: "customers", loadChildren: () => import("./admin/components/customer/customer.module")
              .then(module => module.CustomerModule), canActivate: [AuthGuard]
          }, //https://www.xxx.com/admin/customers----->>>>
          {
            path: "products", loadChildren: () => import("./admin/components/products/products.module")
              .then(module => module.ProductsModule), canActivate: [AuthGuard]
          },
          {
            path: "orders", loadChildren: () => import("./admin/components/order/order.module")
              .then(module => module.OrderModule), canActivate: [AuthGuard]
          }
        ], canActivate: [AuthGuard]
    },
    //ana layout sonrası her bir layout için tek tek obje tanımı yapılır.
    { path: "", component: HomeComponent },
    {
      path: "basket", loadChildren: () => import("./ui/components/basket/basket.module")
        .then(module => module.BasketModule)
    },
    {
      path: "products", loadChildren: () => import("./ui/components/products/products.module")
        .then(module => module.ProductsModule)
    },
    {
      path: "products/:pageNo", loadChildren: () => import("./ui/components/products/products.module")
        .then(module => module.ProductsModule)
    },
    {
      path: "register", loadChildren: () => import("./ui/components/register/register.module")
        .then(module => module.RegisterModule)
    },
    {
      path: "login", loadChildren: () => import("./ui/components/login/login.module")
        .then(module => module.LoginModule)
    },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
