import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import Login from '../pages/admin/Login.jsx'
import Confirmacion from '../pages/cliente/Confirmacion.jsx'
import { AdminPage, AdminRoute, BookingPage } from './RouteViews.jsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <BookingPage /> },
      { path: '/confirmacion', element: <Confirmacion /> },
    ],
  },
  { path: '/admin/login', element: <Login /> },
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [{ index: true, element: <AdminPage /> }],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

export default router
