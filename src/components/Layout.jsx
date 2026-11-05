import { Outlet } from 'react-router-dom'
import Footer from './Subcomponents/Footer.jsx'
import Header from './Subcomponents/Header.jsx'

export default function Layout() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
