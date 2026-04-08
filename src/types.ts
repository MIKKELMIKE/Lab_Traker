// Me pidieron usar Union Types obligatoriamente para que TypeScript me avise si escribo mal un estado.
export const EstadoEstudioEnum = {
  RECIBIDO: 'RECIBIDO',
  PROCESANDO: 'PROCESANDO',
  DIAGNOSTICADO: 'DIAGNOSTICADO',
} as const;

export type EstadoEstudioEnum = typeof EstadoEstudioEnum[keyof typeof EstadoEstudioEnum];

export type EstadoEstudio = `${EstadoEstudioEnum}`;

// Usé este diccionario para hacer una máquina de estados sencilla. Así es más fácil saber a dónde va cada tarjeta.
export const FLUJO_ESTADOS: Record<EstadoEstudioEnum, EstadoEstudioEnum | null> = {
  [EstadoEstudioEnum.RECIBIDO]: EstadoEstudioEnum.PROCESANDO,
  [EstadoEstudioEnum.PROCESANDO]: EstadoEstudioEnum.DIAGNOSTICADO,
  [EstadoEstudioEnum.DIAGNOSTICADO]: null, // aquí termina
};

// Textos extras que necesito para la UI, como los nombres bonitos y el número de paso en la barra de progreso.
export const ESTADO_META: Record<EstadoEstudioEnum, { label: string; step: number }> = {
  [EstadoEstudioEnum.RECIBIDO]: { label: 'Recibido', step: 1 },
  [EstadoEstudioEnum.PROCESANDO]: { label: 'Procesando', step: 2 },
  [EstadoEstudioEnum.DIAGNOSTICADO]: { label: 'Diagnosticado', step: 3 },
};

// Interfaz principal. La hice para mapear lo que me imagino que vendría de un backend o la API.
export interface Estudio {
  id: number;
  nombre: string;
  paciente: string;
  fecha: string;
  estado: EstadoEstudioEnum;
  tipo: string;
}
