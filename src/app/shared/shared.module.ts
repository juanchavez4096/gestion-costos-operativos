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
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReporteComponent } from './components/reporte/reporte.component';

@NgModule({
  entryComponents: [ReporteComponent],
  declarations: [LayoutComponent, SidenavComponent, FileUploadComponent, ReporteComponent],
  providers: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    CovalentModule,
    ImageCropperModule
    
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    LayoutComponent,
    FlexLayoutModule,
    SidenavComponent,
    FileUploadComponent,
    ImageCropperModule
  ]
})
export class SharedModule { }
