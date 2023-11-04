import { IPersona } from "./persona"

export interface IUsuario{
    idUsuario?:number,
    nombreUsuario:string,
    contraseniaUsuario:string,
    estadoUsuario:number,
    rolUsuario:string,
    persona:IPersona,
}