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
import { MAT_DATE_LOCALE } from '@angular/material';
import { UploadUserImagesComponent } from './components/upload-user-images/upload-user-images.component';

@NgModule({
  entryComponents: [ReporteComponent, UploadUserImagesComponent],
  declarations: [LayoutComponent, SidenavComponent, FileUploadComponent, ReporteComponent, UploadUserImagesComponent],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-VE'},],
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
