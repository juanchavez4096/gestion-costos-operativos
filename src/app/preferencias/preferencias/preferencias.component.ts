import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
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
  private porcentaje = new Subject<string>();
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _loadingService: TdLoadingService,
  ) {
    this.preferenciasForm = this.fb.group({
      iva: [true, Validators.required],
      valorIva: [''],
      porcentajeGanancia: ['', Validators.required],
      mostrarPrecioDolar: [false, Validators.required],
      actualizarDolarAuto: [true, Validators.required],
      precioDolar: [''],
    });
  }

  ngOnInit() {
    this.userService.myEmpresa().subscribe(data => {
      this.preferenciasForm.get('iva').setValue(data.iva);
      this.preferenciasForm.get('valorIva').setValue(data.valorIva);
      this.preferenciasForm.get('porcentajeGanancia').setValue(data.porcentajeGanancia);
      this.preferenciasForm.get('mostrarPrecioDolar').setValue(data.mostrarPrecioDolar);
      this.preferenciasForm.get('actualizarDolarAuto').setValue(data.actualizarDolarAuto);
      this.preferenciasForm.get('precioDolar').setValue(data.precioDolar);
    });

    this.preferenciasForm.controls['porcentajeGanancia'].valueChanges.pipe(takeUntil(this.destroy$), debounceTime(100)).subscribe(value => {
      if (Number(value) > 30) {
        this.preferenciasForm.get('porcentajeGanancia').setValue('30');
      }
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
    this.preferenciasForm.disable();
    this._loadingService.register('replaceTemplateSyntax');
    this.userService.updateEmpresaPreferences(values).pipe(takeUntil(this.destroy$)).subscribe(event => {
      
        this.preferenciasForm.enable();
        
        this._loadingService.resolve('replaceTemplateSyntax');
      
    }, error => {
      this.preferenciasForm.enable();
      
      this._loadingService.resolve('replaceTemplateSyntax')
      console.log(error);
    });
  }

}
