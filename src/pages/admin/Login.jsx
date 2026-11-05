import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const signIn = (event) => {
    event.preventDefault()
    if (password === 'pardo2026') {
      sessionStorage.setItem('pardo-admin-session', 'active')
      navigate('/admin', { replace: true })
      return
    }
    setPassword('')
    setError('Contraseña incorrecta. Para la demostración, usa pardo2026.')
  }

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center py-5">
      <div className="container">
        <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: '28rem' }}>
          <div className="card-body p-4 p-md-5">
            <Link to="/" className="text-decoration-none text-danger fw-bold">← PARDO</Link>
            <h1 className="h3 mt-4">Acceso administrativo</h1>
            <p className="text-secondary">Ingresa para gestionar las reservas del restaurante.</p>
            <form onSubmit={signIn}>
              <label className="form-label" htmlFor="password">Contraseña de demostración</label>
              <input className="form-control form-control-lg" id="password" type="password" value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} required />
              {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
              <button className="btn btn-dark btn-lg w-100 mt-4" type="submit">Ingresar al panel</button>
            </form>
            <div className="alert alert-warning mt-4 mb-0 small">Demo académica: contraseña <strong>pardo2026</strong>. No usar en producción.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
