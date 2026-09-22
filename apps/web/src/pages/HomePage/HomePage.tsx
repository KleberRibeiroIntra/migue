import { useNavigate } from '@tanstack/react-router'
import { type FormEvent, useState } from 'react'
import { login } from '../../api/authApi'
import { ApiError } from '../../api/client'
import { setAuth } from '../../store/authStore'
import './HomePage.css'

export function HomePage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await login(email, password)
      setAuth(result.token, result.user)
      navigate({ to: '/dashboard' })
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError('Email ou senha errados — deu migué.')
      } else {
        setError('Não rolou falar com a API. Tenta de novo.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="home">
      <div className="home__burst" aria-hidden="true" />
      <div className="home__stamp">100% real</div>

      <div className="home__mascot-wrap">
        <img className="home__mascot" src="/migue-logo.png" alt="Mascote Migué" />
      </div>

      <h1 className="home__headline">
        entregou ou
        <br />
        deu migué?
      </h1>

      <p className="home__caption">
        Acompanhe seus projetos e antecipe o feedback antes da reunião de review.
      </p>

      <form className="home__form" onSubmit={handleSubmit}>
        <label className="home__label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="home__input"
          type="email"
          autoComplete="email"
          placeholder="voce@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="home__label" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          className="home__input"
          type="password"
          autoComplete="current-password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="home__error">{error}</p>}

        <button className="home__cta" type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}
