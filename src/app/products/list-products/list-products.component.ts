import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services';
import { Router } from '@angular/router';
import { IPageChangeEvent } from '@covalent/core/paging';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  pageSize: number = 0;
  total: number = 0;
  searchInputTerm: string = '';
  products: any[] = [];
  
  constructor(private productService: ProductService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.searchProducts(0,'');
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
    this.searchProducts(event.page-1, this.searchInputTerm);
    
  }

}
