import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public productoHistory: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Tiempo';
  showYAxisLabel = true;
  yAxisLabel = 'Precio de Venta';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(public dialogRef: MatDialogRef<HistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProductsHistory(this.data.producto.productoId).subscribe(data => {
      let productoHistory = {
        "name":this.data.producto.nombre,
        "series":[]
      }
      data.forEach(element => {
        productoHistory.series.push({
          "name":new Date(element.fechaCreacion),
          "value":element.precioVenta
        })
      });
      this.productoHistory = [];
      this.productoHistory.push(productoHistory);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelect(event) {
    console.log(event);
  }

  dateTickFormatting(val: any): String {
    if (val instanceof Date) {
      var options = { month: 'long',day:'numeric',year:'numeric'};
      return (<Date>val).toLocaleString('es-CL', options);
    }
  }

  numberFormatting(val:any): String{
      return '$'+val;
  }
  
}
