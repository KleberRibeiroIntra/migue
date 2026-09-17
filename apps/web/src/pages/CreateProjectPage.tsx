import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectsApi } from '../api/projectsApi'
import { ErrorMessage } from '../components/ErrorMessage'

export function CreateProjectPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<unknown>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const project = await projectsApi.create({ name, description: description || null })
      navigate(`/projects/${project.id}/edit`)
    } catch (err) {
      setError(err)
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1>New Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <ErrorMessage error={error} />
        <button type="submit" disabled={submitting}>
          Create
        </button>
      </form>
    </div>
  )
}
