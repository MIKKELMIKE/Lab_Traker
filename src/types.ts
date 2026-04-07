export type EstadoEstudio = 'RECIBIDO' | 'PROCESANDO' | 'DIAGNOSTICADO';

export interface Estudio {
  id: number;
  nombre: string;
  estado: EstadoEstudio;
}
