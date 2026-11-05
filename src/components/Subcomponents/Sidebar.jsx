import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="bg-dark text-white p-3 p-lg-4 h-100">
      <div className="fw-bold fs-5 mb-4">PARDO <span className="text-white-50">Admin</span></div>
      <nav className="nav nav-pills flex-column gap-2">
        <NavLink end className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white'}`} to="/admin">
          Reservas
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white'}`} to="/">
          Ver sitio
        </NavLink>
      </nav>
    </aside>
  )
}
