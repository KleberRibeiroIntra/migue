import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { activitiesApi } from '../api/activitiesApi'
import { ErrorMessage } from '../components/ErrorMessage'
import type { Activity } from '../types/activity'
import { formatDate } from '../utils/formatDate'

export function ActivityDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    if (!id) return
    activitiesApi.getById(id).then(setActivity).catch(setError)
  }, [id])

  const handleDelete = async () => {
    if (!id || !confirm('Delete this activity?')) return
    await activitiesApi.remove(id)
    navigate('/activities')
  }

  if (error) return <ErrorMessage error={error} />
  if (!activity) return <p>Loading...</p>

  return (
    <div>
      <h1>{activity.title}</h1>
      <p>Status: {activity.status}</p>
      <p>Description: {activity.description ?? '-'}</p>
      <p>Started at: {formatDate(activity.startedAt)}</p>
      <p>Finished at: {formatDate(activity.finishedAt)}</p>
      <p>Duration: {activity.durationMinutes ?? '-'} minutes</p>
      <p>Self score: {activity.selfScore ?? '-'}</p>
      <p>Self score comment: {activity.selfScoreComment ?? '-'}</p>
      <p>Created at: {formatDate(activity.createdAt)}</p>
      <div>
        <Link to={`/activities/${activity.id}/edit`}>Edit</Link>{' '}
        <button type="button" onClick={handleDelete}>
          Delete
        </button>{' '}
        <Link to="/activities">Back to list</Link>
      </div>
    </div>
  )
}
