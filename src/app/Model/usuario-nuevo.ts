export class NuevoUsuario{
    id?: number;
    email?: string;
    password?: string;
    nombre?: string;
    titulo?: string;
    about?: string;
    foto?: string;
    authorities!: string[];

    }