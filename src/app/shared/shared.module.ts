import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './dependencies/material.module';
import { CovalentModule } from './dependencies/covalent.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [LayoutComponent, SidenavComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    CovalentModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    LayoutComponent,
    FlexLayoutModule,
    SidenavComponent
  ]
})
export class SharedModule { }
