function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function ListaReservas({ reservations, onRemove, emptyMessage = 'Aún no hay reservas registradas.' }) {
  if (!reservations.length) {
    return <div className="alert alert-light border mb-0">{emptyMessage}</div>
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
            {onRemove && <th><span className="visually-hidden">Acciones</span></th>}
          </tr>
        </thead>
        <tbody>
          {[...reservations].sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)).map((reservation) => (
            <tr key={reservation.id}>
              <td>
                <div className="fw-semibold">{reservation.name}</div>
                <div className="small text-secondary">{reservation.email}</div>
              </td>
              <td>{formatDate(reservation.date)}<div className="small text-secondary">{reservation.startTime}–{reservation.endTime}</div></td>
              <td>Mesa {reservation.table}</td>
              <td>{reservation.guests}</td>
              {onRemove && (
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => onRemove(reservation.id)}>
                    Cancelar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
