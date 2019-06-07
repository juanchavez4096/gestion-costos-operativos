import { TipoUnidadDTO } from './TipoUnidadDTO';

export class ModifyProductoMaterialDTO {

    productoMaterialId: number;
    tipoUnidad: TipoUnidadDTO;
    cantidad: number;
    
    constructor(productoMaterialId: number, tipoUnidad: TipoUnidadDTO, cantidad: number){
        this.productoMaterialId = productoMaterialId;
        this.tipoUnidad = tipoUnidad;
        this.cantidad = cantidad;
    }

}