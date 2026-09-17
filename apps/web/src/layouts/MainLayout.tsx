import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function MainLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <button type="button" onClick={handleLogout} style={{ marginLeft: 'auto' }}>
          Logout
        </button>
      </nav>
      <main style={{ padding: '1rem' }}>{children}</main>
    </div>
  )
}
