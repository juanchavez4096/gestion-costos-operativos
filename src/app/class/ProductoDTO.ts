export class ProductoDTO {

    productoId: number;
    costo: number;
    nombre: string;
    depreciacion: number;
    imageLoaded: boolean;
    fechaCreacion: Date
    
    constructor(productoId: number, costo: number, nombre: string, depreciacion: number, imageLoaded: boolean, fechaCreacion: Date){
        this.productoId = productoId;
        this.costo = costo;
        this.nombre = nombre;
        this.depreciacion = depreciacion;
        this.imageLoaded = imageLoaded;
        this.fechaCreacion = fechaCreacion;
    }

}