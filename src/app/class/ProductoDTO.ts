export class ProductoDTO {

    productoId: number;
    costo: number;
    nombre: string;
    
    constructor(productoId: number, costo: number, nombre: string){
        this.productoId = productoId;
        this.costo = costo;
        this.nombre = nombre;
    }

}