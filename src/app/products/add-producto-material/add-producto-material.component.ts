import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { RequireMatch as RequireMatch } from '../../shared/utils/requireMatch';
import { MaterialService } from '../../core/services/material.service';
import { AddProductoMaterialDTO } from '../../class/AddProductoMaterialDTO';
import { TipoUnidadDTO } from '../../class/TipoUnidadDTO';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { ModifyProductoMaterialDTO } from '../../class/ModifyProductoMaterialDTO';



@Component({
  selector: 'app-add-producto-material',
  templateUrl: './add-producto-material.component.html',
  styleUrls: ['./add-producto-material.component.scss']
})
export class AddProductoMaterialComponent implements OnInit {

  public productoMaterialForm: FormGroup;
  public materials: any[];
  public productoMaterial: any;
  public unidades: any[];
  public destroy$: Subject<boolean> = new Subject<boolean>();
  filteredMaterials: Observable<any[]>;

  constructor(public dialogRef: MatDialogRef<AddProductoMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private materialService: MaterialService) {
    this.productoMaterialForm = this.fb.group({
      material: ['', [Validators.required, RequireMatch]],
      tipoUnidadId: ['', Validators.required],
      cantidad: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.materialService.getAllMaterials().subscribe(content => {
      this.materials = content;
      this.filteredMaterials = this.productoMaterialForm.get('material').valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.materials.slice())
        );
    });

    if (this.data.productoMaterialId) {
      this.materialService.getProductoMaterialByProductMaterialId(this.data.productoMaterialId).subscribe(content => {
        this.productoMaterial = content;
        this.productoMaterialForm.get('material').setValue(this.productoMaterial.material);
        this.getTipoMaterialByTipoMaterialId(this.productoMaterial);
        this.productoMaterialForm.get('tipoUnidadId').setValue(this.productoMaterial.tipoUnidad.tipoUnidadId);
        this.productoMaterialForm.get('cantidad').setValue(this.productoMaterial.cantidad);
      })
    }




  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTipoMaterialByTipoMaterialId(material: any) {
    this.materialService.getTipoUnidad(material.tipoUnidad.tipoUnidadId).subscribe(content => {
      this.unidades = content;
    })
  }



  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    const values = form.value;
    this.productoMaterialForm.disable();
    if(this.data.productoMaterialId){
      let modifyProductoMaterialDTO: ModifyProductoMaterialDTO = new ModifyProductoMaterialDTO(this.data.productoMaterialId, new TipoUnidadDTO(values.tipoUnidadId, null, null, null), values.cantidad)
      this.materialService.updateProductoMaterial(modifyProductoMaterialDTO).pipe(takeUntil(this.destroy$)).subscribe(event => {
        this.productoMaterialForm.reset();
        this.dialogRef.close(true);
      }, error => {
        this.productoMaterialForm.enable();
        console.log(error);
      });
    }else{
      let addProductoMaterialDTO: AddProductoMaterialDTO = new AddProductoMaterialDTO(values.material.materialId, this.data.productoId, new TipoUnidadDTO(values.tipoUnidadId, null, null, null), values.cantidad)

      this.materialService.addProductoMaterial(addProductoMaterialDTO).pipe(takeUntil(this.destroy$)).subscribe(event => {
        this.productoMaterialForm.reset();
        this.dialogRef.close(true);
      }, error => {
        this.productoMaterialForm.enable();
        console.log(error);
      });
    }
    
  }

  displayWith(obj?: any): string | undefined {
    return obj ? obj.nombre : undefined;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.materials.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

}
