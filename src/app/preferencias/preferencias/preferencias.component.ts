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
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.scss']
})
export class PreferenciasComponent implements OnInit, OnDestroy {

  public preferenciasForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public progress = 0;

  constructor(
    private productService: ProductService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _loadingService: TdLoadingService
  ) {
    this.preferenciasForm = this.fb.group({
      iva: [true, Validators.required],
      porcentajeGanancia: ['', Validators.required],
      mostrarPrecioDolar: [false, Validators.required],
      actualizarDolarAuto: [true, Validators.required],
      precioDolar: [''],
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
    this.preferenciasForm.disable();
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
        this.preferenciasForm.reset();
        this.progress = 0;
        this._loadingService.resolve('replaceTemplateSyntax')
        this.router.navigate(['/products']);
      }
      
    }, error => {
      this.preferenciasForm.enable();
      this.progress = 0;
      this._loadingService.resolve('replaceTemplateSyntax')
      console.log(error);
    });
  }

}
