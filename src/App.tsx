import { useState } from 'react';
import './App.css';
import type { Estudio, EstadoEstudio } from './types';
import { EstudioCard } from './components/EstudioCard';

function App() {
  const [estudios, setEstudios] = useState<Estudio[]>([
    { id: 1, nombre: 'Biometría Hemática', estado: 'RECIBIDO' },
    { id: 2, nombre: 'Cultivo Faringeo', estado: 'PROCESANDO' },
    { id: 3, nombre: 'Química Sanguínea', estado: 'DIAGNOSTICADO' }
  ]);

  const siguienteEstado: Record<EstadoEstudio, EstadoEstudio> = {
    'RECIBIDO': 'PROCESANDO',
    'PROCESANDO': 'DIAGNOSTICADO',
    'DIAGNOSTICADO': 'DIAGNOSTICADO' 
  };

  const avanzarEtapa = (id: number) => {
    setEstudios(prev => prev.map(estudio => 
      estudio.id === id 
        ? { ...estudio, estado: siguienteEstado[estudio.estado] }
        : estudio
    ));
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Tracker de Laboratorio</h1>
        <p>Gestión de estudios clínicos</p>
      </header>
      
      <section className="grid-estudios">
        {estudios.map((estudio) => (
          <EstudioCard 
            key={estudio.id} 
            estudio={estudio} 
            onAvanzar={avanzarEtapa} 
          />
        ))}
      </section>
    </main>
  );
}

export default App;
