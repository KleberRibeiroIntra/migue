import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projectsApi } from '../api/projectsApi'
import { ErrorMessage } from '../components/ErrorMessage'
import type { Project } from '../types/project'

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    projectsApi
      .list()
      .then(setProjects)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    try {
      await projectsApi.remove(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div>
      <h1>Projects</h1>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/projects/new">New Project</Link>
      </div>
      <ErrorMessage error={error} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description ?? '-'}</td>
                <td>{project.isActive ? 'Yes' : 'No'}</td>
                <td>
                  <Link to={`/projects/${project.id}/edit`}>Edit</Link>{' '}
                  <button type="button" onClick={() => handleDelete(project.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
