import type { Estudio } from '../types';
import './EstudioCard.css';

interface Props {
  estudio: Estudio;
  onAvanzar: (id: number) => void;
}

export function EstudioCard({ estudio, onAvanzar }: Props) {
  const puedeAvanzar = estudio.estado !== 'DIAGNOSTICADO';

  return (
    <div className="tarjeta">
      <h3>{estudio.nombre}</h3>
      
      <div className="estado-container">
        <span className={`badge ${estudio.estado.toLowerCase()}`}>
          {estudio.estado}
        </span>
      </div>

      {puedeAvanzar && (
        <button 
          className="btn-avanzar"
          onClick={() => onAvanzar(estudio.id)}
        >
          Siguiente Etapa
        </button>
      )}
    </div>
  );
}
