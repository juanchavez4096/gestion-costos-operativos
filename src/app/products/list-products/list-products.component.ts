import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services';
import { Router } from '@angular/router';
import { IPageChangeEvent } from '@covalent/core/paging';
import { TdDialogService } from '@covalent/core/dialogs';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  public environment = environment;
  pageSize: number = 0;
  total: number = 0;
  searchInputTerm: string = '';
  products: any[] = [];
  beginPage = false;
  
  constructor(private productService: ProductService, public auth: AuthService, private router: Router, private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.searchProducts(0,'');
    this.beginPage = true;
  }

  goToProduct(productoId: number){
    this.router.navigate([`products`, productoId]); 
  }

  searchProducts(page: number,event: string){
    this.searchInputTerm = event
    this.productService.getProducts(page,this.searchInputTerm).subscribe(product => {
      this.products = product.content;
      this.total = product.totalElements;
      this.pageSize = product.size;
    })
  }

  imageLoaded(i: number){
    this.products[i].imageLoaded = true;
  }

  changePage(event: IPageChangeEvent){
    if (!this.beginPage) {
      this.searchProducts(event.page-1, this.searchInputTerm);
    }else{
      this.beginPage = false;

    }
    
  }

  confirmDelete(productoId: number){
    this._dialogService.openConfirm({
      message: 'Se borrará el producto y no podrá ser devuelto. Los materiales asociados a este producto no se verán afectados. También se borrará la imagen de este producto. ¿Estás de acuerdo?',
      disableClose: true,
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Confirmar', //OPTIONAL, hides if not provided
      cancelButton: 'Rechazar', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Aceptar', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.productService.deleteProduct(productoId).subscribe(event => {
          this.searchProducts(0, '');
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
