import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdashboardComponent } from './component/adashboard/adashboard.component';
import { CartComponent } from './component/cart/cart.component';
import { LoginComponent } from './component/login/login.component';
import { ProductsComponent } from './component/products/products.component';

const routes: Routes = [
  {path: '',redirectTo:'products', pathMatch: 'full'},
  {path:'products', component: ProductsComponent},
  {path:'cart', component: CartComponent},
  {path:'Admin', component: AdashboardComponent},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
