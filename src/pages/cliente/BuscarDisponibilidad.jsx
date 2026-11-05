import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CalendarioInteractivo from '../../components/CalendarioInteractivo.jsx'
import FormularioReserva from '../../components/FormularioReserva.jsx'

function getTodayKey() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export default function BuscarDisponibilidad({ reservations, addReservation }) {
  const [selectedDate, setSelectedDate] = useState(getTodayKey)
  const navigate = useNavigate()

  const submitReservation = (reservation) => {
    const result = addReservation(reservation)
    if (result.success) navigate('/confirmacion', { state: { reservation: result.reservation } })
    return result
  }

  return (
    <>
      <section className="bg-dark text-white">
        <div className="container py-5 py-lg-6">
          <div className="row align-items-center g-4 py-lg-4">
            <div className="col-lg-7">
              <span className="badge rounded-pill text-bg-danger mb-3">RESERVAS ONLINE</span>
              <h1 className="display-4 fw-bold">Una mesa lista para <span className="text-warning">disfrutar.</span></h1>
              <p className="lead text-white-50 mb-0">Elige el día, la hora y nosotros nos encargamos del resto.</p>
            </div>
            <div className="col-lg-5">
              <div className="bg-white bg-opacity-10 rounded-4 p-4">
                <div className="row g-3 text-center">
                  <div className="col-4"><div className="fs-3 fw-bold">12</div><div className="small text-white-50">mesas</div></div>
                  <div className="col-4"><div className="fs-3 fw-bold">12–23</div><div className="small text-white-50">horario</div></div>
                  <div className="col-4"><div className="fs-3 fw-bold">7/7</div><div className="small text-white-50">días</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container py-5">
        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-5">
            <CalendarioInteractivo selectedDate={selectedDate} onSelectDate={setSelectedDate} reservations={reservations} />
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body p-4">
                <h2 className="h5">Una experiencia para compartir</h2>
                <p className="text-secondary mb-0">Estamos en Miraflores. Si tienes una solicitud especial, cuéntanos en las notas de tu reserva.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <FormularioReserva
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              reservations={reservations}
              onSubmit={submitReservation}
            />
          </div>
        </div>
      </div>
    </>
  )
}
