import type { EstadoEstudio } from '../types';
import { ESTADO_META, EstadoEstudioEnum } from '../types';
import './EstadoBadge.css';

interface Props {
  estado: EstadoEstudio;
}

// Muestra el estado actual como una etiqueta de color
export function EstadoBadge({ estado }: Props) {
  const meta = ESTADO_META[estado as EstadoEstudioEnum];

  return (
    <span
      className={`badge ${estado.toLowerCase()}`}
      aria-label={`Estado: ${meta.label}`}
    >
      {meta.label}
    </span>
  );
}
