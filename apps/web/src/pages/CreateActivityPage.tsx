import { useNavigate } from 'react-router-dom'
import { activitiesApi } from '../api/activitiesApi'
import { ActivityForm } from '../components/ActivityForm'
import type { CreateActivityRequest } from '../types/activity'

export function CreateActivityPage() {
  const navigate = useNavigate()

  const handleSubmit = async (data: CreateActivityRequest) => {
    const activity = await activitiesApi.create(data)
    navigate(`/activities/${activity.id}`)
  }

  return (
    <div>
      <h1>New Activity</h1>
      <ActivityForm submitLabel="Create" onSubmit={handleSubmit} />
    </div>
  )
}
