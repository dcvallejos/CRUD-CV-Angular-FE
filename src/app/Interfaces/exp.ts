export interface User{
    id?:"1";
    nombre:"Daniel Vallejos";
    titulo:"Licenciado en Psicologia";
    about:"Lorem ipsum dolor sit amet, consectetur adipis";
    Exp:{
        id?: number;
        puesto: string;
        logo:string;
        empresa: string;
        periodo: string;
        tareas: string;
    }
    Study:{
        id?: number;
        puesto: string;
        logo: string;
        institucion: string;
        periodo: string;        
    }
}
export interface Exp{
    id?: number;
    puesto: string;
    logo:string;
    empresa: string;
    periodo: string;
    tareas: string;
    }