# Lab Tracker

Proyecto desarrollado para la prueba técnica (Reto 2: State Management) del proceso de estadías. Es un sistema sencillo diseñado para visualizar y controlar en qué fase del flujo de trabajo se encuentra cada estudio de laboratorio.

## Funciones implementadas

- **Gestión de Estados:** Cada tarjeta tiene un botón para avanzar a la siguiente etapa (Recibido → Procesando → Diagnosticado). Cuando un estudio llega al último estado, el botón desaparece como lo pide el requerimiento.
- **Filtrado dando clic arriba:** Si le picas a las tarjetas de arriba (donde salen los números totales), la vista se separa de inmediato y te muestra únicamente los estudios que hay en esa fase.
- **Reiniciar Tracker:** Coloqué un botón de "Reiniciar Tracker" en la esquina de arriba para limpiar los filtros y regresar todas las tarjetas a su estado inicial para que sea más fácil hacer pruebas repetidas.
- **Buscador en vivo:** Puse una barra de búsqueda para que se pueda filtrar la tabla en tiempo real en minúsculas y mayúsculas. Puedes buscar por el ID de la muestra (ej: 0004), nombre del paciente o el nombre del estudio.

## ¿Instrucciones para correrlo localmente?

Si quieres probar este proyecto en tu pc, solo necesitas tener Node.js instalado. 

Sigue estos pasos en tu terminal (consola):

1. **Clonar o descargar el proyecto:** Descarga los archivos en una carpeta de tu compu.
2. **Entrar a la carpeta:**
   ```bash
   cd LabTracker
   ```
   *(Cambia "LabTracker" por el nombre de la carpeta donde guardaste esto).*
3. **Instalar los paquetes:** Esto descarga todo lo que necesita React para funcionar.
   ```bash
   npm install
   ```
4. **Correr el proyecto:** Esto va a levantar un servidor de prueba en tu compu.
   ```bash
   npm run dev
   ```
5. **Abrirlo en el navegador:** Te va a salir un link en la consola que dice `http://localhost:5173`. Dale clic o cópialo en tu navegador para ver la página.

## Cosas técnicas que usé
- Usé **React** (creado con Vite) porque es lo más rápido para armar componentes.
- Metí **TypeScript** y usé un `Enum` (`EstadoEstudioEnum`) para asegurar que el estado de los estudios solo sea Válido, así evito bugs por escribir mal los strings, ¡esto era un requerimiento obligatorio!
- Todo el diseño (CSS) lo hice a mano para que quede limpio y use tonos azules como de hospital.

---
*Hecho para el reto 2 de State Management.*
