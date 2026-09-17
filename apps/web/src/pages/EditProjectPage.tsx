import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { projectsApi } from '../api/projectsApi'
import { ErrorMessage } from '../components/ErrorMessage'

export function EditProjectPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!id) return
    projectsApi
      .getById(id)
      .then((project) => {
        setName(project.name)
        setDescription(project.description ?? '')
        setIsActive(project.isActive)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!id) return
    setError(null)
    setSubmitting(true)
    try {
      await projectsApi.update(id, { name, description: description || null, isActive })
      navigate('/projects')
    } catch (err) {
      setError(err)
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!id || !confirm('Delete this project?')) return
    try {
      await projectsApi.remove(id)
      navigate('/projects')
    } catch (err) {
      setError(err)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Edit Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
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
        <ErrorMessage error={error} />
        <button type="submit" disabled={submitting}>
          Save
        </button>{' '}
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  )
}
