import { Component, OnInit, Input, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {

  @Input() progress;
  onChange: Function;
  public file: File | null = null;
  public imgURL: any;
  croppedImage: any = '';
  @ViewChild('cropper')
  cropper:ImageCropperComponent;

  @HostListener('change', ['$event.target.files']) emitFiles(event: any): void {
      this.file = event;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  writeValue( value: null ) {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

  preview(event: File){
    var reader = new FileReader();
    reader.readAsDataURL(event); 
    reader.onload = (_event) => { 
      this.croppedImage = reader.result; 
    }
  }

  imageCropped(event: any) { 
    this.onChange(event.file);
    this.preview(event.file)
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}
