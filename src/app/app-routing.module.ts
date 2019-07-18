import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'materials',
    loadChildren: './materials/materials.module#MaterialsModule'
  },
  {
    path: 'preferencias',
    loadChildren: './preferencias/preferencias.module#PreferenciasModule'
  },
  {
    path: 'ayuda',
    loadChildren: './ayuda/ayuda.module#AyudaModule'
  },
  {
    path: 'administration',
    loadChildren: './administration/administration.module#AdministrationModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
