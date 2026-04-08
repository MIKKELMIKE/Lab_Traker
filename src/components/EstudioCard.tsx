import type { Estudio } from '../types';
import { EstadoEstudioEnum, FLUJO_ESTADOS, ESTADO_META } from '../types';
import { EstadoBadge } from './EstadoBadge';
import './EstudioCard.css';

interface Props {
  estudio: Estudio;
  onAvanzar: (id: number) => void;
}

export function EstudioCard({ estudio, onAvanzar }: Props) {
  const estado = estudio.estado as EstadoEstudioEnum;
  const siguiente = FLUJO_ESTADOS[estado];
  const puedeAvanzar = siguiente !== null;
  const siguienteMeta = siguiente ? ESTADO_META[siguiente] : null;

  return (
    <article
      className={`tarjeta ${estado.toLowerCase()}`}
      tabIndex={0}
      aria-label={`Estudio de ${estudio.paciente}: ${estudio.nombre}. Estado: ${estado}`}
    >
      {/* Pongo el encabezado con el nombre y fecha. */}
      <header className="tarjeta-header">
        <span className="paciente-nombre">{estudio.paciente}</span>
        <time className="fecha-estudio" dateTime={estudio.fecha}>{estudio.fecha}</time>
      </header>

      {/* Muestro el nombre principal del estudio */}
      <h3 className="estudio-titulo">{estudio.nombre}</h3>

      {/* Indico si es de sangre, orina, etc. */}
      <div className="tipo-estudio">{estudio.tipo}</div>

      {/* Esta barra sirve para que visualmente se entienda que hay avance. */}
      <div className="progress-bar" role="progressbar"
        aria-valuenow={ESTADO_META[estado].step}
        aria-valuemin={1} aria-valuemax={3}
        aria-label={`Paso ${ESTADO_META[estado].step} de 3`}
      >
        <div className="progress-fill" />
      </div>

      {/* Abajo pongo el botón para cambiar de etapa. Si ya terminó (es null), muestro que está completado. */}
      <footer className="tarjeta-footer">
        <EstadoBadge estado={estudio.estado} />

        {puedeAvanzar ? (
          <button
            id={`btn-avanzar-${estudio.id}`}
            className="btn-avanzar"
            onClick={() => onAvanzar(estudio.id)}
            aria-label={`Avanzar estudio ${estudio.nombre} a ${siguienteMeta?.label}`}
            title={`Pasar a: ${siguienteMeta?.label}`}
          >
            {siguienteMeta?.label}
            <span className="btn-avanzar-icon" aria-hidden="true">→</span>
          </button>
        ) : (
          <span className="estado-final" aria-label="Estudio completado">
            ✓ Completado
          </span>
        )}
      </footer>

      {/* Le puse un ID inventado a la muestra para que parezca más real. */}
      <p className="estudio-id">Muestra #{String(estudio.id).padStart(4, '0')}</p>
    </article>
  );
}
