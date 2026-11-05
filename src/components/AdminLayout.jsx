import { Outlet } from 'react-router-dom'
import Sidebar from './Subcomponents/Sidebar.jsx'

export default function AdminLayout() {
  return (
    <div className="min-vh-100 bg-light">
      <div className="row g-0 min-vh-100">
        <div className="col-12 col-md-3 col-lg-2">
          <Sidebar />
        </div>
        <main className="col-12 col-md-9 col-lg-10 p-3 p-lg-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
