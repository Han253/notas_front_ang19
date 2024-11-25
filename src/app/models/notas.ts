export class Nota{
    id:number;
    titulo:string;
    contenido:string;
    fecha: Date;

    constructor(){
        this.id = 0;
        this.titulo = "";
        this.contenido = "";
        this.fecha = new Date();
    }
}