import { Imagenes } from "./imagenes";

export interface IActividad {
    id?:number,
    nombre:string,
    objetivo: string,
    descripcion:string,
    lugar:string,
    fecha:string,
    estado:number,
    imagenes?:any[];
}
