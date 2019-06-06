import { TipoUnidadDTO } from './TipoUnidadDTO';

export class MaterialDTO {

    materialId: number;
    tipoUnidad: TipoUnidadDTO;
    nombre: string;
    costo: number;
    cantidadCompra: number;
    
    constructor(materialId: number, tipoUnidad: TipoUnidadDTO, nombre: string, costo: number, cantidadCompra: number){
        this.materialId = materialId;
        this.tipoUnidad = tipoUnidad;
        this.nombre = nombre;
        this.costo = costo;
        this.cantidadCompra = cantidadCompra;
    }

}