import { useEffect, useState, type FormEvent } from 'react'
import { projectsApi } from '../api/projectsApi'
import { ACTIVITY_STATUSES, type ActivityStatus, type CreateActivityRequest } from '../types/activity'
import type { Project } from '../types/project'
import { ErrorMessage } from './ErrorMessage'
import { fromInputDateTimeLocal, toInputDateTimeLocal } from '../utils/formatDate'

export interface ActivityFormValues {
  projectId: string | null
  title: string
  description: string
  status: ActivityStatus
  startedAt: string | null
  finishedAt: string | null
  durationMinutes: string
  selfScore: string
  selfScoreComment: string
}

const EMPTY_VALUES: ActivityFormValues = {
  projectId: null,
  title: '',
  description: '',
  status: 'Planned',
  startedAt: null,
  finishedAt: null,
  durationMinutes: '',
  selfScore: '',
  selfScoreComment: '',
}

interface ActivityFormProps {
  initialValues?: ActivityFormValues
  submitLabel: string
  onSubmit: (data: CreateActivityRequest) => Promise<void>
}

export function ActivityForm({ initialValues, submitLabel, onSubmit }: ActivityFormProps) {
  const [values, setValues] = useState<ActivityFormValues>(initialValues ?? EMPTY_VALUES)
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<unknown>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    projectsApi.list().then(setProjects).catch(setError)
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit({
        projectId: values.projectId || null,
        title: values.title,
        description: values.description || null,
        status: values.status,
        startedAt: values.startedAt,
        finishedAt: values.finishedAt,
        durationMinutes: values.durationMinutes ? Number(values.durationMinutes) : null,
        selfScore: values.selfScore ? Number(values.selfScore) : null,
        selfScoreComment: values.selfScoreComment || null,
      })
    } catch (err) {
      setError(err)
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="project">Project</label>
        <select
          id="project"
          value={values.projectId ?? ''}
          onChange={(e) => setValues({ ...values, projectId: e.target.value || null })}
        >
          <option value="">No project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={values.status}
          onChange={(e) => setValues({ ...values, status: e.target.value as ActivityStatus })}
        >
          {ACTIVITY_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="startedAt">Started at</label>
        <input
          id="startedAt"
          type="datetime-local"
          value={toInputDateTimeLocal(values.startedAt)}
          onChange={(e) => setValues({ ...values, startedAt: fromInputDateTimeLocal(e.target.value) })}
        />
      </div>
      <div>
        <label htmlFor="finishedAt">Finished at</label>
        <input
          id="finishedAt"
          type="datetime-local"
          value={toInputDateTimeLocal(values.finishedAt)}
          onChange={(e) => setValues({ ...values, finishedAt: fromInputDateTimeLocal(e.target.value) })}
        />
      </div>
      <div>
        <label htmlFor="durationMinutes">Duration (minutes)</label>
        <input
          id="durationMinutes"
          type="number"
          min="0"
          value={values.durationMinutes}
          onChange={(e) => setValues({ ...values, durationMinutes: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="selfScore">Self score (1-5)</label>
        <input
          id="selfScore"
          type="number"
          min="1"
          max="5"
          value={values.selfScore}
          onChange={(e) => setValues({ ...values, selfScore: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="selfScoreComment">Self score comment</label>
        <textarea
          id="selfScoreComment"
          value={values.selfScoreComment}
          onChange={(e) => setValues({ ...values, selfScoreComment: e.target.value })}
        />
      </div>
      <ErrorMessage error={error} />
      <button type="submit" disabled={submitting}>
        {submitLabel}
      </button>
    </form>
  )
}

export { EMPTY_VALUES as EMPTY_ACTIVITY_FORM_VALUES }
