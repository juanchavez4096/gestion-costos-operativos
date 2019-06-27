export class ProductoDTO {

    productoId: number;
    costo: number;
    nombre: string;
    depreciacion: number
    
    constructor(productoId: number, costo: number, nombre: string, depreciacion: number){
        this.productoId = productoId;
        this.costo = costo;
        this.nombre = nombre;
        this.depreciacion = depreciacion;
    }

}