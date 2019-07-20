import { Component, OnInit, OnDestroy, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService, UtilService } from '../../../core/services';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpEventType } from '@angular/common/http';
import { TdLoadingService } from '@covalent/core/loading';
import { ProductService } from '../../../core/services/product.service';
import { MaterialService } from '../../../core/services/material.service';
@Component({
  selector: 'int-upload-user-images',
  templateUrl: './upload-user-images.component.html',
  styleUrls: ['./upload-user-images.component.scss']
})

export class UploadUserImagesComponent implements OnInit, OnDestroy {

  public option: number;
  public imgExists: boolean;
  public file: Blob;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public croppedImage: any;
  public imageChangedEvent: any;
  public progress = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadUserImagesComponent>,
    private userService: UserService,
    private productService: ProductService,
    private materialService: MaterialService,
    private utilService: UtilService,
    private _snackBar: MatSnackBar,
    private sanitize: DomSanitizer,
    private _loadingService: TdLoadingService
  ) { }

  ngOnInit() {
    this.option = this.data.option;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }

  openSnackBar(texto: string) {
    this._snackBar.open(texto, 'Ok', { duration: 3000 });
  }

  manageFile(event: any) {
    if (event.size > 1000000) {
      this.openSnackBar(`El tamaño maximo es de ${(1000000 / 1000000).toFixed(1)} megabytes `);
    } else {
      this.imgExists = true;
      this.fileChangeEvent(event);
    }
  }

  fileChangeEvent(event: any): void {
    this.imgExists = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.createPath(event.file);
    this.file = event.file;
  }

  createPath(image: any): SafeUrl {
    const blob = URL.createObjectURL(image);
    const safe = this.sanitize.bypassSecurityTrustUrl(blob);
    return safe;
  }

  changeAvatar() {
    
    if (this.data.type === 'user') {
      this.setUserImage(this.file);  
    }else if(this.data.type === 'product'){
      this.setProductImage(this.file, this.data.id);
    }else if (this.data.type === 'material') {
      this.setMaterialImage(this.file, this.data.id)
    }
    
    
  }

  setUserImage(image: Blob) {
    let formData: FormData = new FormData();
    formData.append('file', image)

    this.userService.uploadImage(formData).pipe(takeUntil(this.destroy$)).subscribe(event => {
      console.log(event);
      console.log();
      
      
      if ( event.type === HttpEventType.UploadProgress ) {
        this.progress = Math.round((100 * event.loaded) / event.total);
        this._loadingService.setValue('replaceTemplateSyntax', this.progress);
      }
      if ( event.type === HttpEventType.Response ) {
        
        
        this.progress = 0;
        this._loadingService.resolve('replaceTemplateSyntax')
        this.dialogRef.close();
        this.openSnackBar(`La imagen de perfil se ha actualizado correctamente!`);
      }
      
    }, err => {
      console.log(err);
      
      this.openSnackBar(`Hubo un error al subir la imagen, intente de nuevo`);
    })
  }

  setProductImage(image: Blob, productoId: number) {
    let formData: FormData = new FormData();
    formData.append('file', image)
    formData.append('productoId', JSON.stringify(productoId));

    this.productService.uploadImage(formData).pipe(takeUntil(this.destroy$)).subscribe(event => {
      console.log(event);
      console.log();
      
      
      if ( event.type === HttpEventType.UploadProgress ) {
        this.progress = Math.round((100 * event.loaded) / event.total);
        this._loadingService.setValue('replaceTemplateSyntax', this.progress);
      }
      if ( event.type === HttpEventType.Response ) {
        
        
        this.progress = 0;
        this._loadingService.resolve('replaceTemplateSyntax')
        this.dialogRef.close();
        this.openSnackBar(`La imagen se ha actualizado correctamente!`);
      }
      
    }, err => {
      console.log(err);
      
      this.openSnackBar(`Hubo un error al subir la imagen, intente de nuevo`);
    })
  }

  setMaterialImage(image: Blob, materialId: number) {
    let formData: FormData = new FormData();
    formData.append('file', image)
    formData.append('materialId', JSON.stringify(materialId));

    this.materialService.uploadImage(formData).pipe(takeUntil(this.destroy$)).subscribe(event => {
      console.log(event);
      
      
      if ( event.type === HttpEventType.UploadProgress ) {
        this.progress = Math.round((100 * event.loaded) / event.total);
        this._loadingService.setValue('replaceTemplateSyntax', this.progress);
      }
      if ( event.type === HttpEventType.Response ) {
        
        
        this.progress = 0;
        this._loadingService.resolve('replaceTemplateSyntax')
        this.dialogRef.close();
        this.openSnackBar(`La imagen se ha actualizado correctamente!`);
      }
      
    }, err => {
      console.log(err);
      
      this.openSnackBar(`Hubo un error al subir la imagen, intente de nuevo`);
    })
  }
}
