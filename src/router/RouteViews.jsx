import { Navigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout.jsx'
import useBooking from '../hooks/useBooking.js'
import DashboardAdmin from '../pages/admin/DashboardAdmin.jsx'
import BuscarDisponibilidad from '../pages/cliente/BuscarDisponibilidad.jsx'

export function BookingPage() {
  const { reservations, addReservation } = useBooking()
  return <BuscarDisponibilidad reservations={reservations} addReservation={addReservation} />
}

export function AdminPage() {
  const { reservations, updateReservation, removeReservation, stats } = useBooking()
  return (
    <DashboardAdmin
      reservations={reservations}
      updateReservation={updateReservation}
      removeReservation={removeReservation}
      stats={stats}
    />
  )
}

export function AdminRoute() {
  return sessionStorage.getItem('pardo-admin-session') === 'active'
    ? <AdminLayout />
    : <Navigate to="/admin/login" replace />
}
