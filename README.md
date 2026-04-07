# Reto 2: Tracker de Estado de Laboratorio

Herramienta visual para administrar en qué fase está cada estudio en el flujo de trabajo de un laboratorio.

## Requerimientos cumplidos:
- **Visualización**: Tarjetas (`cards`) que muestran el nombre del estudio y un "Badge" con su estado actual.
- **Lógica de Estados**: Uso de `RECIBIDO`, `PROCESANDO`, `DIAGNOSTICADO`.
- **Control de Flujo**: Botón "Siguiente Etapa" que actualiza al siguiente nivel. Si está en `DIAGNOSTICADO`, el botón desaparece.
- **TypeScript Estricto**: Uso de un `Union Type` definido como `type EstadoEstudio = 'RECIBIDO' | 'PROCESANDO' | 'DIAGNOSTICADO';`

## Instrucciones para ejecutar el proyecto localmente

1. Clona o descarga el repositorio a tu computadora.
2. Abre una terminal en la carpeta principal del proyecto y ejecuta el siguiente comando para instalar las librerías:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre la dirección generada (comúnmente `http://localhost:5173`) en tu navegador web.
