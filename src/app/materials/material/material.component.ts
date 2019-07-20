import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MaterialDTO } from '../../class/MaterialDTO';
import { MaterialService } from '../../core/services/material.service';
import { AuthService } from '../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core/dialogs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { TipoUnidadDTO } from '../../class/TipoUnidadDTO';
import { UploadUserImagesComponent } from '../../shared/components/upload-user-images/upload-user-images.component';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  url;
  pageSize: number = 0;
  total: number = 0;
  public materialForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  material: MaterialDTO;
  materials: any[];
  searchInputTerm: string = "";
  beginPage = false;
  unidades: TipoUnidadDTO[];
  materialImageLoadedVar = false;
  constructor(
    private materialService: MaterialService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.materialForm = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      cantidad: ['', Validators.required],
      tipoUnidadId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getMaterial();
    this.beginPage = true;
  }

  getMaterial(){
    this.materialService.getMaterial(this.route.snapshot.params.id).subscribe(material => {
      this.material = material;
      if (this.material == null) {
        this.router.navigate(['/materials']);
      }
      this.url = 'http://localhost:8081/api/materiales/file/download?a='+ Math.random() +'&token='+this.auth.getToken(true)+'&materialId='+material.materialId+'&size=500x500'
      this.getTipoMaterialByTipoMaterialId(this.material);
      this.materialForm.get('nombre').setValue(this.material.nombre);
      this.materialForm.get('costo').setValue(this.material.costo);
      this.materialForm.get('cantidad').setValue(this.material.cantidadCompra);
      this.materialForm.get('tipoUnidadId').setValue(this.material.tipoUnidad.tipoUnidadId);
      
    });
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    let values = form.value;
    
    let materialDTO = new MaterialDTO(this.material.materialId, new TipoUnidadDTO(values.tipoUnidadId, null, null, null) , values.nombre, values.costo, values.cantidad, null);
    this.materialForm.disable();

    this.materialService.updateMaterial(materialDTO).pipe(takeUntil(this.destroy$)).subscribe(event => {
      this.materialForm.reset();
      
      this.getMaterial();
      this.materialForm.enable();
    }, error => {
      this.materialForm.enable();
      console.log(error);
    });
  }


  confirmDelete(materialId: number) {
    this._dialogService.openConfirm({
      message: 'Se borrará el material y no podrá ser devuelto. Los productos se actualizarán quitando el costo de éste material. También se borrará la imagen de este material. ¿Estás de acuerdo?',
      disableClose: false,
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Confirmar Borrado', //OPTIONAL, hides if not provided
      cancelButton: 'Rechazar', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Aceptar', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.materialService.deleteMaterial(materialId).subscribe(event => {
          this.openSnackBar('Material Borrado exitosamente')
          this.router.navigate([`materials`]);
        }, error => {
          this._dialogService.openAlert({
            message: 'Ha ocurrido un error interno, intente de nuevo más tarde.',
            disableClose: false, // defaults to false
            viewContainerRef: this._viewContainerRef, //OPTIONAL
            title: 'Error', //OPTIONAL, hides if not provided
            closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
            width: '400px', //OPTIONAL, defaults to 400px
          });
        })
      }
    });
  }

  openSnackBar(texto: string) {
    this._snackBar.open(texto, 'Ok', {duration: 3000});
  }

  getTipoMaterialByTipoMaterialId(material: any){
    this.materialService.getTipoUnidad(material.tipoUnidad.tipoUnidadId).subscribe(content => {
      this.unidades = content;
    })
  }

  materialImageLoaded(){
    this.materialImageLoadedVar = true;
  }

  openModal(option: number) {
    let dialogRef: any;
    dialogRef = this.dialog.open(UploadUserImagesComponent, {
      width: '40%',
      height: '55%',
      panelClass: 'instance-dialog',
      disableClose: true,
      data: { option, userImage: true, section: 'user', type: 'material', id: this.material.materialId },
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.getMaterial();
    });
  }

  deleteImage() {
    this.materialService.deleteImage(this.material.materialId).subscribe(event => {
      this.openSnackBar('Imagen Actualizada');
      this.getMaterial();
      this.materialImageLoadedVar = false;
    }, error => {
      if (error.error.status === 409) {
        this.getMaterial();
        this._dialogService.openAlert({
          message: error.error.message,
          disableClose: false, // defaults to false
          viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'No se pudo ejecutar cambio de estado', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
      } else {
        this._dialogService.openAlert({
          message: 'Ha ocurrido un error interno, intente de nuevo más tarde.',
          disableClose: false, // defaults to false
          viewContainerRef: this._viewContainerRef, //OPTIONAL
          title: 'Error', //OPTIONAL, hides if not provided
          closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
          width: '400px', //OPTIONAL, defaults to 400px
        });
      }

    })
  }
}
