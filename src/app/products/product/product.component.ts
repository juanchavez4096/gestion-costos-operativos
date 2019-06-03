import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from '../../core/services/material.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TdDialogService } from '@covalent/core/dialogs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  product:any;
  materials: any[];
  searchInputTerm: string = "";
  constructor(private productService: ProductService, private materialService: MaterialService, public auth: AuthService, private route: ActivatedRoute, private router: Router
    ,private fb: FormBuilder, private _dialogService: TdDialogService, private _viewContainerRef: ViewContainerRef) {
      this.productForm = this.fb.group({
        nombre: ['', Validators.required]
      });
     }

  ngOnInit() {
    this.productService.getProduct(this.route.snapshot.params.id).subscribe(product => {
      this.product = product;
      
      if(this.product == null){
        this.router.navigate(['/products']);
      }
      this.productForm = this.fb.group({
        nombre: [this.product.nombre, Validators.required]
      });

      
        
      this.materialService.getMaterialsByProduct(this.product.productoId, this.searchInputTerm).subscribe(materials => {
        this.materials = materials.content;
      })
    });
  }

  goToMaterial(materialId: number){
    this.router.navigate([`materials`, materialId]); 
  }

  searchMaterial(event: string){
    this.searchInputTerm = event;
    this.materialService.getMaterialsByProduct(this.product.productoId, this.searchInputTerm).subscribe(materials => {
      this.materials = materials.content;
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
        this.productForm = this.fb.group({
          nombre: [this.product.nombre, Validators.required]
        });
      
      
    }, error => {
      this.productForm.enable();
      console.log(error);
    });
  }


  confirmDelete(productoId: number){
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

}
