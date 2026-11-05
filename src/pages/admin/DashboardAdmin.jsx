import { useNavigate } from 'react-router-dom'
import ListaReservas from '../../components/ListaReservas.jsx'

export default function DashboardAdmin({ reservations, updateReservation, removeReservation, stats }) {
  const navigate = useNavigate()

  const signOut = () => {
    sessionStorage.removeItem('pardo-admin-session')
    navigate('/admin/login')
  }

  return (
    <div>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <div>
          <p className="text-danger fw-semibold small text-uppercase mb-1">Panel de control</p>
          <h1 className="h2 mb-0">Gestión de reservas</h1>
        </div>
        <button className="btn btn-outline-secondary" type="button" onClick={signOut}>Cerrar sesión</button>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-4">
          <div className="card border-0 shadow-sm h-100"><div className="card-body">
            <div className="text-secondary small">Reservas registradas</div><div className="display-6 fw-semibold">{stats.total}</div>
          </div></div>
        </div>
        <div className="col-12 col-sm-4">
          <div className="card border-0 shadow-sm h-100"><div className="card-body">
            <div className="text-secondary small">Personas reservadas</div><div className="display-6 fw-semibold">{stats.guests}</div>
          </div></div>
        </div>
        <div className="col-12 col-sm-4">
          <div className="card border-0 shadow-sm h-100"><div className="card-body">
            <div className="text-secondary small">Reservas para hoy</div><div className="display-6 fw-semibold">{stats.today}</div>
          </div></div>
        </div>
      </div>
      <section className="card border-0 shadow-sm">
        <div className="card-body p-3 p-lg-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 mb-0">Todas las reservas</h2>
            <span className="badge rounded-pill text-bg-light">{reservations.length} total</span>
          </div>
          <ListaReservas
            reservations={reservations}
            onUpdate={updateReservation}
            onRemove={removeReservation}
          />
        </div>
      </section>
    </div>
  )
}
