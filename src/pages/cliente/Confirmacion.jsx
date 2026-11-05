import { Link, useLocation } from 'react-router-dom'

export default function Confirmacion() {
  const { state } = useLocation()
  const reservation = state?.reservation

  if (!reservation) {
    return (
      <div className="container py-5 text-center">
        <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: '34rem' }}>
          <div className="card-body p-5">
            <h1 className="h3">No encontramos esa confirmación</h1>
            <p className="text-secondary">Puedes crear una nueva reserva cuando quieras.</p>
            <Link className="btn btn-danger rounded-pill px-4" to="/">Hacer una reserva</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm mx-auto text-center" style={{ maxWidth: '42rem' }}>
        <div className="card-body p-4 p-md-5">
          <div className="display-3 text-success mb-3" aria-hidden="true">✓</div>
          <span className="badge text-bg-success rounded-pill mb-3">RESERVA CONFIRMADA</span>
          <h1 className="display-6 fw-bold">¡Te esperamos, {reservation.name}!</h1>
          <p className="text-secondary">Hemos registrado tu reserva. El detalle también está guardado en este dispositivo.</p>
          <div className="bg-light rounded-3 p-4 text-start my-4">
            <div className="row g-3">
              <div className="col-6"><span className="small text-secondary d-block">Fecha</span>{new Date(`${reservation.date}T12:00:00`).toLocaleDateString('es-PE', { dateStyle: 'long' })}</div>
              <div className="col-6"><span className="small text-secondary d-block">Horario</span>{reservation.startTime}–{reservation.endTime}</div>
              <div className="col-6"><span className="small text-secondary d-block">Mesa</span>Mesa {reservation.table}</div>
              <div className="col-6"><span className="small text-secondary d-block">Personas</span>{reservation.guests}</div>
            </div>
          </div>
          <Link className="btn btn-danger rounded-pill px-4" to="/">Volver al inicio</Link>
        </div>
      </div>
    </div>
  )
}
