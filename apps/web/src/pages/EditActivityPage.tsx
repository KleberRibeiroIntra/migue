import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { activitiesApi } from '../api/activitiesApi'
import { ActivityForm, type ActivityFormValues } from '../components/ActivityForm'
import { ErrorMessage } from '../components/ErrorMessage'
import type { CreateActivityRequest } from '../types/activity'

export function EditActivityPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState<ActivityFormValues | null>(null)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    if (!id) return
    activitiesApi
      .getById(id)
      .then((activity) =>
        setInitialValues({
          projectId: activity.projectId,
          title: activity.title,
          description: activity.description ?? '',
          status: activity.status,
          startedAt: activity.startedAt,
          finishedAt: activity.finishedAt,
          durationMinutes: activity.durationMinutes?.toString() ?? '',
          selfScore: activity.selfScore?.toString() ?? '',
          selfScoreComment: activity.selfScoreComment ?? '',
        }),
      )
      .catch(setError)
  }, [id])

  const handleSubmit = async (data: CreateActivityRequest) => {
    if (!id) return
    await activitiesApi.update(id, data)
    navigate(`/activities/${id}`)
  }

  if (error) return <ErrorMessage error={error} />
  if (!initialValues) return <p>Loading...</p>

  return (
    <div>
      <h1>Edit Activity</h1>
      <ActivityForm initialValues={initialValues} submitLabel="Save" onSubmit={handleSubmit} />
    </div>
  )
}
