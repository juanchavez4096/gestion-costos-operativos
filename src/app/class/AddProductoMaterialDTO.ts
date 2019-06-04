import { TipoUnidadDTO } from './TipoUnidadDTO';

export class AddProductoMaterialDTO {

    materialId: number;
    productoId: number;
    tipoUnidad: TipoUnidadDTO;
    cantidad: number;
    
    constructor(){
        
    }

}