import { IPersona } from './persona';
import { IActividad } from './actividad';

export interface IVisita {
    id?: number;
    observaciones: string;
    tipo: string;
    estado?: number|null;
    InstitucionId: number;
    persona: IPersona;
    ActividadId: number;
}
