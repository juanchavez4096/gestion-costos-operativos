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

  products: any[] = [];
  
  constructor(private productService: ProductService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(product => {
      this.products = product.content;
    });
  }

  goToProduct(productoId: number){
    this.router.navigate([`products/product`, productoId]); 
  }

}
