# PARDO | Reservas de restaurante

Aplicación responsiva para consultar fechas, registrar reservas y administrarlas desde un panel. Construida con React, React Router, Vite y Bootstrap.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite en la terminal (por defecto, `http://localhost:5173`).

## Otros comandos

```bash
npm run lint     # Revisa el código con ESLint
npm run build    # Genera la versión de producción en dist/
npm run preview  # Sirve localmente la versión de producción
```

Bootstrap se instala como dependencia del proyecto y sus estilos y JavaScript se cargan desde `src/main.jsx`.

## Funcionalidades

- Formulario de reserva responsivo con datos del cliente, fecha, horario y mesa.
- Calendario interactivo con el número de reservas por día.
- Validación de horarios solapados para impedir reservar la misma mesa dos veces.
- Confirmación de reserva y persistencia local en el navegador mediante `localStorage`.
- Panel administrativo para consultar y cancelar reservas.

Para la demostración académica, el acceso administrativo usa la contraseña `pardo2026`. La autenticación y el almacenamiento son locales y no están diseñados para producción ni para sincronizar entre dispositivos.
