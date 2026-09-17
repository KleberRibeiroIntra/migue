import { useEffect, useState, type FormEvent } from 'react'
import { usersApi } from '../api/usersApi'
import { useAuth } from '../hooks/useAuth'
import { ErrorMessage } from '../components/ErrorMessage'
import type { User } from '../types/user'

export function ProfilePage() {
  const { userId } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!userId) return
    usersApi
      .getById(userId)
      .then((data) => {
        setUser(data)
        setName(data.name)
        setIsActive(data.isActive)
      })
      .catch(setError)
  }, [userId])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!userId) return
    setError(null)
    setSubmitting(true)
    setSaved(false)
    try {
      const updated = await usersApi.update(userId, { name, isActive })
      setUser(updated)
      setSaved(true)
    } catch (err) {
      setError(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (error) return <ErrorMessage error={error} />
  if (!user) return <p>Loading...</p>

  return (
    <div style={{ maxWidth: 320 }}>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" value={user.email} disabled />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="isActive">
            <input
              id="isActive"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active
          </label>
        </div>
        {saved && <p>Saved.</p>}
        <button type="submit" disabled={submitting}>
          Save
        </button>
      </form>
    </div>
  )
}
