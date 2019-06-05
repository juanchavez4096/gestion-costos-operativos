import { TipoUnidadDTO } from './TipoUnidadDTO';

export class AddProductoMaterialDTO {

    materialId: number;
    productoId: number;
    tipoUnidad: TipoUnidadDTO;
    cantidad: number;
    
    constructor(materialId: number, productoId: number, tipoUnidad: TipoUnidadDTO, cantidad: number){
        this.materialId = materialId;
        this.productoId = productoId;
        this.tipoUnidad = tipoUnidad;
        this.cantidad = cantidad;
    }

}