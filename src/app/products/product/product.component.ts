import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from '../../core/services/material.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TdDialogService } from '@covalent/core/dialogs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { IPageChangeEvent } from '@covalent/core/paging';
import { AddProductoMaterialComponent } from '../add-producto-material/add-producto-material.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  pageSize: number = 0;
  total: number = 0;
  public productForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  product: any;
  materials: any[];
  searchInputTerm: string = "";
  constructor(private productService: ProductService,
    private materialService: MaterialService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getProductWithMaterials();
  }

  getProductWithMaterials(){
    this.productService.getProduct(this.route.snapshot.params.id).subscribe(product => {
      this.product = product;
      if (this.product == null) {
        this.router.navigate(['/products']);
      }
      this.searchMaterial(0, '');
      this.productForm.get('nombre').setValue(this.product.nombre);
    });
  }

  goToMaterial(materialId: number) {
    this.router.navigate([`materials`, materialId]);
  }

  searchMaterial(page:number, event: string) {
    this.searchInputTerm = event;
    this.materialService.getProductoMaterialByProductId(page,this.product.productoId, this.searchInputTerm).subscribe(materials => {
      this.materials = materials.content;
      this.total = materials.totalElements;
      this.pageSize = materials.size;
    })
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    let values = form.value;
    values.productoId = this.product.productoId;
    this.productForm.disable();

    this.productService.updateProduct(values).pipe(takeUntil(this.destroy$)).subscribe(event => {
      this.productForm.reset();
      this.product.nombre = values.nombre;
      this.productForm.get('nombre').setValue(this.product.nombre);
      this.openSnackBar('Nombre del producto actualizado.');
      this.productForm.enable();
    }, error => {
      this.productForm.enable();
      console.log(error);
    });
  }


  confirmDelete(productoId: number) {
    this._dialogService.openConfirm({
      message: 'Se borrará el producto y no podrá ser devuelto. Los materiales asociados a este producto no se verán afectados. También se borrará la imagen de este producto. ¿Estás de acuerdo?',
      disableClose: false,
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Confirmar Borrado', //OPTIONAL, hides if not provided
      cancelButton: 'Rechazar', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Aceptar', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.productService.deleteProduct(productoId).subscribe(event => {
          this.router.navigate([`products`]);
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

  confirmDeleteProductoMaterial(productoMaterialId: number) {
    this._dialogService.openConfirm({
      message: 'Se borrará el material asociado a éste producto. No se verá afectado éste material. ¿Estás de acuerdo?',
      disableClose: false,
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Confirmar Borrado', //OPTIONAL, hides if not provided
      cancelButton: 'Rechazar', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Aceptar', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.materialService.deleteProductoMaterial(productoMaterialId).subscribe(event => {
          this.getProductWithMaterials();
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

  changePage(event: IPageChangeEvent){
    this.searchMaterial(event.page-1, this.searchInputTerm);
    
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddProductoMaterialComponent, {
      width: '400px',
      disableClose: false,
      data: {productoId: this.product.productoId, added: false},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getProductWithMaterials();
      };
    });
  }

  imageLoaded(i: number){
    this.materials[i].imageLoaded = true;
  }

}
