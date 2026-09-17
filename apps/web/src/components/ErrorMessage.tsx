import { ApiError } from '../api/client'

export function ErrorMessage({ error }: { error: unknown }) {
  if (!error) return null

  if (error instanceof ApiError) {
    const fieldErrors = error.errors
      ? Object.entries(error.errors).map(([field, messages]) => (
          <li key={field}>
            {field}: {messages.join(', ')}
          </li>
        ))
      : null

    return (
      <div style={{ color: 'red' }}>
        <p>{error.message}</p>
        {fieldErrors && <ul>{fieldErrors}</ul>}
      </div>
    )
  }

  return <p style={{ color: 'red' }}>{String(error)}</p>
}
