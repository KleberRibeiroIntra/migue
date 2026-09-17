import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { activitiesApi } from '../api/activitiesApi'
import { ACTIVITY_STATUSES, type Activity, type ActivityStatus } from '../types/activity'
import { ErrorMessage } from '../components/ErrorMessage'
import { formatDate } from '../utils/formatDate'

export function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [statusFilter, setStatusFilter] = useState<ActivityStatus | ''>('')
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    activitiesApi
      .list(statusFilter || undefined)
      .then((data) => {
        if (!cancelled) setActivities(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [statusFilter])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this activity?')) return
    await activitiesApi.remove(id)
    setActivities((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div>
      <h1>Activities</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ActivityStatus | '')}>
          <option value="">All statuses</option>
          {ACTIVITY_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <Link to="/activities/new">New Activity</Link>
      </div>
      <ErrorMessage error={error} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Duration (min)</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>
                  <Link to={`/activities/${activity.id}`}>{activity.title}</Link>
                </td>
                <td>{activity.status}</td>
                <td>{activity.durationMinutes ?? '-'}</td>
                <td>{formatDate(activity.createdAt)}</td>
                <td>
                  <Link to={`/activities/${activity.id}/edit`}>Edit</Link>{' '}
                  <button type="button" onClick={() => handleDelete(activity.id)}>
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
