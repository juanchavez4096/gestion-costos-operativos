import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MaterialService } from '../../core/services/material.service';
import { AuthService } from '../../core/services';
import { Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core/loading';
import { takeUntil } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { MaterialDTO } from '../../class/MaterialDTO';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public materialForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public progress = 0;
  public unidades: any[];

  constructor(
    private materialService: MaterialService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _loadingService: TdLoadingService
  ) {
    this.materialForm = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      cantidad: ['', Validators.required],
      tipoUnidadId: ['', Validators.required],
      imagen: ['']
    });
  }

  ngOnInit() {
    this.materialService.getTipoUnidad(null).subscribe(content => {
      this.unidades = content;
    })
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
    this.materialForm.disable();
    let materialDTO = new MaterialDTO(null, values.tipoUnidadId, values.nombre, values.costo, values.cantidad, null)
    let formData: FormData = new FormData();
    formData.append('materialDTO', JSON.stringify(materialDTO));
    formData.append('imagen', values.imagen);
    this._loadingService.register('replaceTemplateSyntax');
    this.materialService.addMaterial(formData).pipe(takeUntil(this.destroy$)).subscribe(event => {
      if ( event.type === HttpEventType.UploadProgress ) {
        this.progress = Math.round((100 * event.loaded) / event.total);
        this._loadingService.setValue('replaceTemplateSyntax', this.progress);
      }
      if ( event.type === HttpEventType.Response ) {
        console.log(event.body);
        this.materialForm.reset();
        this.progress = 0;
        this._loadingService.resolve('replaceTemplateSyntax')
        this.router.navigate(['/materials']);
      }
      
    }, error => {
      this.materialForm.enable();
      this.progress = 0;
      this._loadingService.resolve('replaceTemplateSyntax')
      console.log(error);
    });
  }

}
