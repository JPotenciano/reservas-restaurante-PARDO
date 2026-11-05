import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container py-2">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <span className="text-danger">PARDO</span>
          <span className="d-block text-secondary fw-normal small">Cocina & reservas</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavigation"
          aria-controls="mainNavigation"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavigation">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <NavLink className="nav-link" to="/">Reservar una mesa</NavLink>
            <NavLink className="nav-link" to="/admin/login">Administración</NavLink>
            <a className="btn btn-danger rounded-pill px-4" href="tel:+5115550101">Llámanos</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
