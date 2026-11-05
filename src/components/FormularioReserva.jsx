import { useMemo, useState } from 'react'
import { reservationsOverlap } from '../hooks/useBooking.js'

const TABLES = Array.from({ length: 12 }, (_, index) => index + 1)
const today = new Date()
const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

export default function FormularioReserva({ selectedDate, onSelectDate, reservations, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    startTime: '19:00',
    endTime: '21:00',
    table: '',
    notes: '',
  })
  const [error, setError] = useState('')

  const conflict = useMemo(() => {
    if (!selectedDate || !form.startTime || !form.endTime || !form.table || form.startTime >= form.endTime) {
      return false
    }
    return reservations.some((reservation) =>
      reservation.date === selectedDate &&
      Number(reservation.table) === Number(form.table) &&
      reservationsOverlap(form, reservation),
    )
  }, [form, reservations, selectedDate])

  const updateField = (event) => {
    const { name, value } = event.target
    if (name === 'date') {
      onSelectDate(value)
      setError('')
      return
    }
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setError('')
  }

  const submitForm = (event) => {
    event.preventDefault()
    if (conflict) {
      setError('Esta mesa ya tiene una reserva que coincide con ese horario.')
      return
    }
    if (form.startTime >= form.endTime) {
      setError('La hora de fin debe ser posterior a la hora de inicio.')
      return
    }
    const result = onSubmit({ ...form, date: selectedDate, guests: Number(form.guests), table: Number(form.table) })
    if (!result.success) setError(result.message)
  }

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4 p-lg-5">
        <h2 className="h4 mb-1">Completa tu reserva</h2>
        <p className="text-secondary mb-4">Te esperamos para una buena comida.</p>
        <form onSubmit={submitForm}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="name">Nombre completo</label>
              <input className="form-control" id="name" name="name" value={form.name} onChange={updateField} autoComplete="name" required maxLength={80} />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="email">Correo electrónico</label>
              <input className="form-control" id="email" name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="phone">Teléfono</label>
              <input className="form-control" id="phone" name="phone" type="tel" value={form.phone} onChange={updateField} autoComplete="tel" required maxLength={20} />
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label" htmlFor="guests">Personas</label>
              <select className="form-select" id="guests" name="guests" value={form.guests} onChange={updateField}>
                {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
                  <option value={count} key={count}>{count} {count === 1 ? 'persona' : 'personas'}</option>
                ))}
              </select>
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label" htmlFor="date">Fecha</label>
              <input className="form-control" id="date" name="date" type="date" min={todayKey} value={selectedDate} onChange={updateField} required />
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label" htmlFor="startTime">Desde</label>
              <input className="form-control" id="startTime" name="startTime" type="time" min="12:00" max="22:00" value={form.startTime} onChange={updateField} required />
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label" htmlFor="endTime">Hasta</label>
              <input className="form-control" id="endTime" name="endTime" type="time" min="12:30" max="23:00" value={form.endTime} onChange={updateField} required />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="table">Mesa</label>
              <select className="form-select" id="table" name="table" value={form.table} onChange={updateField} required>
                <option value="">Selecciona una mesa</option>
                {TABLES.map((table) => <option value={table} key={table}>Mesa {table}</option>)}
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="notes">Nota especial <span className="text-secondary">(opcional)</span></label>
              <input className="form-control" id="notes" name="notes" value={form.notes} onChange={updateField} maxLength={180} placeholder="Alergias, celebración..." />
            </div>
          </div>
          {conflict && <div className="alert alert-warning mt-3 mb-0" role="status">Mesa ocupada en el horario elegido. Prueba otra hora o mesa.</div>}
          {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
          <button className="btn btn-danger btn-lg w-100 rounded-pill mt-4" type="submit" disabled={conflict}>
            Confirmar reserva
          </button>
          <p className="small text-secondary text-center mt-3 mb-0">La reserva se guarda en este dispositivo.</p>
        </form>
      </div>
    </section>
  )
}
