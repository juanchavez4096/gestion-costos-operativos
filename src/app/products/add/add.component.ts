import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services';
import { HttpEventType } from '@angular/common/http';
import { TdLoadingService } from '@covalent/core/loading';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  public productForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public progress = 0;

  constructor(
    private productService: ProductService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _loadingService: TdLoadingService
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      imagen: ['']
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    const values = form.value;
    this.productForm.disable();
    let formData: FormData = new FormData();
    formData.append('nombre', values.nombre)
    formData.append('imagen', values.imagen)
    this._loadingService.register('replaceTemplateSyntax');
    this.productService.addProduct(formData).pipe(takeUntil(this.destroy$)).subscribe(event => {
      if ( event.type === HttpEventType.UploadProgress ) {
        this.progress = Math.round((100 * event.loaded) / event.total);
        this._loadingService.setValue('replaceTemplateSyntax', this.progress);
      }
      if ( event.type === HttpEventType.Response ) {
        console.log(event.body);
        this.productForm.reset();
        this.progress = 0;
        this._loadingService.resolve('replaceTemplateSyntax')
        this.router.navigate(['/products']);
      }
      
    }, error => {
      this.productForm.enable();
      this.progress = 0;
      this._loadingService.resolve('replaceTemplateSyntax')
      console.log(error);
    });
  }

}
