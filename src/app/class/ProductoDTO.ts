export class ProductoDTO {

    productoId: number;
    costo: number;
    nombre: string;
    depreciacion: number;
    imageLoaded: boolean
    
    constructor(productoId: number, costo: number, nombre: string, depreciacion: number, imageLoaded: boolean){
        this.productoId = productoId;
        this.costo = costo;
        this.nombre = nombre;
        this.depreciacion = depreciacion;
        this.imageLoaded = imageLoaded;
    }

}