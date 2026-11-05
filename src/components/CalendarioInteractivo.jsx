function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function CalendarioInteractivo({ selectedDate, onSelectDate, reservations }) {
  const selected = new Date(`${selectedDate}T12:00:00`)
  const year = selected.getFullYear()
  const month = selected.getMonth()
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingDays = (firstDay.getDay() + 6) % 7
  const today = toDateKey(new Date())
  const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const calendarDays = [
    ...Array(leadingDays).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ]

  const changeMonth = (amount) => {
    const nextMonth = new Date(year, month + amount, 1)
    const nextDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1)
    onSelectDate(toDateKey(nextDate))
  }

  return (
    <section className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5 mb-0 text-capitalize">
            {selected.toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="btn-group btn-group-sm" aria-label="Cambiar mes">
            <button type="button" className="btn btn-outline-secondary" onClick={() => changeMonth(-1)} aria-label="Mes anterior">‹</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => changeMonth(1)} aria-label="Mes siguiente">›</button>
          </div>
        </div>
        <div className="row row-cols-7 g-1 text-center">
          {weekdays.map((day) => (
            <div className="col small text-secondary fw-semibold py-2" key={day}>{day}</div>
          ))}
          {calendarDays.map((day, index) => {
            if (!day) return <div className="col p-1" key={`empty-${index}`} />
            const dateKey = toDateKey(new Date(year, month, day))
            const count = reservations.filter((reservation) => reservation.date === dateKey).length
            const isSelected = dateKey === selectedDate
            const isPast = dateKey < today
            return (
              <div className="col p-1" key={dateKey}>
                <button
                  type="button"
                  className={`btn w-100 p-1 ${isSelected ? 'btn-danger' : 'btn-light'} ${isPast ? 'opacity-50' : ''}`}
                  onClick={() => onSelectDate(dateKey)}
                  aria-pressed={isSelected}
                  aria-label={`${day} ${selected.toLocaleDateString('es-PE', { month: 'long' })}${count ? `, ${count} reservas` : ''}`}
                >
                  <span className="d-block">{day}</span>
                  <span className={`d-block small ${isSelected ? 'text-white' : 'text-danger'}`} style={{ minHeight: '1rem' }}>
                    {count ? `• ${count}` : '\u00a0'}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
        <p className="small text-secondary mt-3 mb-0">Elige una fecha para consultar y reservar una mesa.</p>
      </div>
    </section>
  )
}
