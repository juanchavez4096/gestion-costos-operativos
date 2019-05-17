import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  searchInputTerm: string;
  products: any[] = [];
  
  constructor(private productService: ProductService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(product => {
      this.products = product.content;
    });
  }

  goToProduct(productoId: number){
    this.router.navigate([`products`, productoId]); 
  }

  searchProduct(event: string){
    this.searchInputTerm = event
    this.productService.searchProducts(this.searchInputTerm).subscribe(product => {
      this.products = product.content;
    })
  }

}
