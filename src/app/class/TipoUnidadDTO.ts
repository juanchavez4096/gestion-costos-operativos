export class TipoUnidadDTO {
    tipoUnidadId: number;
    tipo: string;
    unidad: string;
    referenciaEnGramos: number
    constructor(tipoUnidadId: number, tipo: string, unidad: string, referenciaEnGramos: number) {
        this.tipoUnidadId = tipoUnidadId;
        this.tipo = tipo;
        this.unidad = unidad;
        this.referenciaEnGramos = referenciaEnGramos;
    }
}