import { useState } from 'react';
import './App.css';
import { EstadoEstudioEnum, FLUJO_ESTADOS, ESTADO_META } from './types';
import type { Estudio, EstadoEstudio } from './types';
import { EstudioCard } from './components/EstudioCard';

// Elegí poner estos datos estáticos aquí para simular lo que nos devolvería una base de datos más adelante.
const estudiosIniciales: Estudio[] = [
  { id: 1, nombre: 'Biometría Hemática',  paciente: 'Juan Pérez',      fecha: '2026-04-07', estado: EstadoEstudioEnum.RECIBIDO,      tipo: 'Sangre'        },
  { id: 2, nombre: 'Cultivo Faringeo',    paciente: 'Ana Gómez',       fecha: '2026-04-06', estado: EstadoEstudioEnum.PROCESANDO,    tipo: 'Microbiología' },
  { id: 3, nombre: 'Química Sanguínea',   paciente: 'Luis Torres',     fecha: '2026-04-05', estado: EstadoEstudioEnum.DIAGNOSTICADO, tipo: 'Sangre'        },
  { id: 4, nombre: 'Perfil Tiroideo',     paciente: 'María López',     fecha: '2026-04-04', estado: EstadoEstudioEnum.RECIBIDO,      tipo: 'Endocrinología'},
  { id: 5, nombre: 'Uroanálisis',         paciente: 'Carlos Ramírez',  fecha: '2026-04-03', estado: EstadoEstudioEnum.PROCESANDO,    tipo: 'Orina'         },
  { id: 6, nombre: 'Coprocultivo',        paciente: 'Sofía Herrera',   fecha: '2026-04-02', estado: EstadoEstudioEnum.DIAGNOSTICADO, tipo: 'Microbiología' },
  { id: 7, nombre: 'EGO',                 paciente: 'Pedro Díaz',      fecha: '2026-04-01', estado: EstadoEstudioEnum.RECIBIDO,      tipo: 'Orina'         },
  { id: 8, nombre: 'Prueba de Embarazo',  paciente: 'Laura Ruiz',      fecha: '2026-03-31', estado: EstadoEstudioEnum.PROCESANDO,    tipo: 'Orina'         },
];

// Definimos las columnas que va a tener nuestro kanban. Lo saqué del Enum para no equivocarme al escribir.
const columnas: { estado: EstadoEstudioEnum }[] = [
  { estado: EstadoEstudioEnum.RECIBIDO     },
  { estado: EstadoEstudioEnum.PROCESANDO   },
  { estado: EstadoEstudioEnum.DIAGNOSTICADO},
];

// Elegí usar un componente funcional de React y hooks (como manda la documentación oficial de React).
function App() {
  const [estudios,  setEstudios]  = useState<Estudio[]>(estudiosIniciales);
  const [busqueda,  setBusqueda]  = useState('');
  const [filtroEstado, setFiltroEstado] = useState<EstadoEstudio | 'TODOS'>('TODOS');

  // Objeto para contar cuántos estudios hay en cada etapa rápidamente.
  const stats = {
    [EstadoEstudioEnum.RECIBIDO]:      estudios.filter(e => e.estado === EstadoEstudioEnum.RECIBIDO).length,
    [EstadoEstudioEnum.PROCESANDO]:    estudios.filter(e => e.estado === EstadoEstudioEnum.PROCESANDO).length,
    [EstadoEstudioEnum.DIAGNOSTICADO]: estudios.filter(e => e.estado === EstadoEstudioEnum.DIAGNOSTICADO).length,
  };

  // Función para mover el estudio. Usamos map para crear un nuevo arreglo (inmutabilidad) como dice la documentación de React.
  const avanzarEtapa = (id: number) => {
    setEstudios(prev => prev.map(est => {
      if (est.id !== id) return est;
      const siguiente = FLUJO_ESTADOS[est.estado as EstadoEstudioEnum];
      return siguiente ? { ...est, estado: siguiente } : est;
    }));
  };

  // Aquí combiné los dos filtros: el de la barra de búsqueda y el de darle clic a las tarjetas de arriba. Elegí hacerlo junto para que no se pise la lógica.
  const estudiosFiltrados = estudios.filter(est => {
    const coincideTexto =
      est.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      est.paciente.toLowerCase().includes(busqueda.toLowerCase()) ||
      est.id.toString().padStart(4, '0').includes(busqueda);
    const coincideEstado = filtroEstado === 'TODOS' || est.estado === filtroEstado;
    return coincideTexto && coincideEstado;
  });

  return (
    <main className="dashboard">

      {/* Cabecera */}
      <header className="dashboard-header">
        <div className="header-titulos">
          <span className="header-eyebrow">Sistema de Gestión Clínica</span>
          <h1>Lab Tracker</h1>
          <p>Visualiza y controla el flujo de estudios en tiempo real</p>
        </div>
        <button
          id="btn-reiniciar"
          className="btn-reiniciar"
          onClick={() => { setEstudios(estudiosIniciales); setBusqueda(''); setFiltroEstado('TODOS'); }}
          aria-label="Reiniciar todos los estudios a su estado inicial"
        >
          Reiniciar Tracker
        </button>
      </header>

      {/* Panel interactivo de estadísticas que también sirve como filtro */}
      <section className="stats-panel" aria-label="Resumen de estudios">
        {columnas.map(col => {
          const meta = ESTADO_META[col.estado];
          return (
            <div
              key={col.estado}
              className={`stat-card stat-${col.estado.toLowerCase()}`}
              role="button"
              tabIndex={0}
              aria-pressed={filtroEstado === col.estado}
              aria-label={`Filtrar por ${meta.label}: ${stats[col.estado]} estudios`}
              onClick={() => setFiltroEstado(prev => prev === col.estado ? 'TODOS' : col.estado)}
              onKeyDown={e => e.key === 'Enter' && setFiltroEstado(prev => prev === col.estado ? 'TODOS' : col.estado)}
              style={{ cursor: 'pointer', outline: filtroEstado === col.estado ? '2px solid currentColor' : undefined }}
            >
              <div className="stat-info">
                <span className="stat-label">{meta.label}</span>
                <strong className="stat-value">{stats[col.estado]}</strong>
              </div>
            </div>
          );
        })}
      </section>

      {/* Buscador */}
      <div className="buscador-container">
        <input
          id="buscador-estudios"
          type="search"
          className="input-buscador"
          placeholder="Buscar por nombre, paciente o ID de muestra…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          aria-label="Buscar estudios"
        />
      </div>

      {/* Decidí poner este contador para saber si el filtro está funcionando bien de un vistazo */}
      <div className="contador-global" aria-live="polite">
        Mostrando <strong>{estudiosFiltrados.length}</strong> de <strong>{estudios.length}</strong> estudios
        {filtroEstado !== 'TODOS' && ` · Filtrando por ${ESTADO_META[filtroEstado as EstadoEstudioEnum]?.label}`}
      </div>

      {/* Tablero Kanban */}
      <section className="kanban-estudios" aria-label="Tablero Kanban de estudios">
        {columnas.map(col => {
          const meta = ESTADO_META[col.estado];
          const tarjetas = estudiosFiltrados.filter(e => e.estado === col.estado);
          return (
            <div
              key={col.estado}
              className="kanban-col"
              aria-label={`Columna ${meta.label}: ${tarjetas.length} estudios`}
            >
              <div className={`kanban-col-header kanban-${col.estado.toLowerCase()}`}>
                {meta.label}
                <span className="col-count" aria-hidden="true">{tarjetas.length}</span>
              </div>

              {tarjetas.length === 0
                ? <p className="kanban-vacio">Sin estudios aquí</p>
                : tarjetas.map(estudio => (
                    <EstudioCard
                      key={estudio.id}
                      estudio={estudio}
                      onAvanzar={avanzarEtapa}
                    />
                  ))
              }
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
