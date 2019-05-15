import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product:any;
  constructor(private productService: ProductService, public auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.productService.getProduct(this.route.snapshot.params.id).subscribe(product => {
      this.product = product;
      if(this.product == null)
        this.router.navigate(['/products']);
    });
  }

}
