import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from '../../core/services/material.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product:any;
  materials: any[];
  searchInputTerm: string = "";
  constructor(private productService: ProductService, private materialService: MaterialService, public auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.productService.getProduct(this.route.snapshot.params.id).subscribe(product => {
      this.product = product;
      
      if(this.product == null)
        this.router.navigate(['/products']);
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

}
