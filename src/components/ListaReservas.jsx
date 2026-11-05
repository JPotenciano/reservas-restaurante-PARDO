import { useState } from 'react'

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function ListaReservas({
  reservations,
  onRemove,
  onUpdate,
  emptyMessage = 'Aún no hay reservas registradas.',
}) {
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState(null)
  const [error, setError] = useState('')

  if (!reservations.length) {
    return <div className="alert alert-light border mb-0">{emptyMessage}</div>
  }

  const startEditing = (reservation) => {
    setEditingId(reservation.id)
    setDraft({ ...reservation })
    setError('')
  }

  const updateDraft = (event) => {
    const { name, value } = event.target
    setDraft((currentDraft) => ({ ...currentDraft, [name]: value }))
    setError('')
  }

  const saveChanges = (event, reservationId) => {
    event.preventDefault()
    if (draft.startTime >= draft.endTime) {
      setError('La hora de fin debe ser posterior a la hora de inicio.')
      return
    }

    const result = onUpdate(reservationId, {
      ...draft,
      guests: Number(draft.guests),
      table: Number(draft.table),
    })
    if (!result.success) {
      setError(result.message)
      return
    }

    setEditingId(null)
    setDraft(null)
    setError('')
  }

  const cancelEditing = () => {
    setEditingId(null)
    setDraft(null)
    setError('')
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Cliente</th>
            <th>Fecha y horario</th>
            <th>Mesa</th>
            <th>Personas</th>
            {(onRemove || onUpdate) && <th><span className="visually-hidden">Acciones</span></th>}
          </tr>
        </thead>
        <tbody>
          {[...reservations]
            .sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))
            .map((reservation) => (
              <>
                <tr key={reservation.id}>
                  <td>
                    <div className="fw-semibold">{reservation.name}</div>
                    <div className="small text-secondary">{reservation.email}</div>
                  </td>
                  <td>{formatDate(reservation.date)}<div className="small text-secondary">{reservation.startTime}–{reservation.endTime}</div></td>
                  <td>Mesa {reservation.table}</td>
                  <td>{reservation.guests}</td>
                  {(onRemove || onUpdate) && (
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        {onUpdate && (
                          <button
                            className="btn btn-sm btn-outline-primary"
                            type="button"
                            onClick={() => startEditing(reservation)}
                          >
                            Actualizar
                          </button>
                        )}
                        {onRemove && (
                          <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => onRemove(reservation.id)}>
                            Cancelar
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
                {editingId === reservation.id && draft && (
                  <tr key={`${reservation.id}-edit`}>
                    <td colSpan={5}>
                      <form className="bg-light rounded p-3" onSubmit={(event) => saveChanges(event, reservation.id)}>
                        <h3 className="h6 mb-3">Actualizar reserva</h3>
                        <div className="row g-3">
                          <div className="col-12 col-md-4">
                            <label className="form-label" htmlFor={`name-${reservation.id}`}>Cliente</label>
                            <input className="form-control" id={`name-${reservation.id}`} name="name" value={draft.name} onChange={updateDraft} required maxLength={80} />
                          </div>
                          <div className="col-12 col-md-4">
                            <label className="form-label" htmlFor={`email-${reservation.id}`}>Correo</label>
                            <input className="form-control" id={`email-${reservation.id}`} name="email" type="email" value={draft.email} onChange={updateDraft} required />
                          </div>
                          <div className="col-12 col-md-4">
                            <label className="form-label" htmlFor={`phone-${reservation.id}`}>Teléfono</label>
                            <input className="form-control" id={`phone-${reservation.id}`} name="phone" type="tel" value={draft.phone} onChange={updateDraft} required maxLength={20} />
                          </div>
                          <div className="col-6 col-md-3">
                            <label className="form-label" htmlFor={`date-${reservation.id}`}>Fecha</label>
                            <input className="form-control" id={`date-${reservation.id}`} name="date" type="date" value={draft.date} onChange={updateDraft} required />
                          </div>
                          <div className="col-6 col-md-3">
                            <label className="form-label" htmlFor={`table-${reservation.id}`}>Mesa</label>
                            <select className="form-select" id={`table-${reservation.id}`} name="table" value={draft.table} onChange={updateDraft} required>
                              {Array.from({ length: 12 }, (_, index) => index + 1).map((table) => (
                                <option key={table} value={table}>Mesa {table}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-6 col-md-3">
                            <label className="form-label" htmlFor={`startTime-${reservation.id}`}>Desde</label>
                            <input className="form-control" id={`startTime-${reservation.id}`} name="startTime" type="time" value={draft.startTime} onChange={updateDraft} required />
                          </div>
                          <div className="col-6 col-md-3">
                            <label className="form-label" htmlFor={`endTime-${reservation.id}`}>Hasta</label>
                            <input className="form-control" id={`endTime-${reservation.id}`} name="endTime" type="time" value={draft.endTime} onChange={updateDraft} required />
                          </div>
                          <div className="col-12 col-md-3">
                            <label className="form-label" htmlFor={`guests-${reservation.id}`}>Personas</label>
                            <select className="form-select" id={`guests-${reservation.id}`} name="guests" value={draft.guests} onChange={updateDraft} required>
                              {Array.from({ length: 8 }, (_, index) => index + 1).map((guests) => (
                                <option key={guests} value={guests}>{guests}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-12 col-md-9">
                            <label className="form-label" htmlFor={`notes-${reservation.id}`}>Nota especial</label>
                            <input className="form-control" id={`notes-${reservation.id}`} name="notes" value={draft.notes || ''} onChange={updateDraft} maxLength={180} />
                          </div>
                        </div>
                        {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <button className="btn btn-outline-secondary" type="button" onClick={cancelEditing}>Cancelar</button>
                          <button className="btn btn-primary" type="submit">Guardar cambios</button>
                        </div>
                      </form>
                    </td>
                  </tr>
                )}
              </>
            ))}
        </tbody>
      </table>
    </div>
  )
}
