import { type FormEvent, useState } from 'react'
import { ApiError } from '../api/client'
import type { CrudField, FormMode, FormValues } from '../components/crud/types'

export function resolve<T>(value: T | ((mode: FormMode) => T), mode: FormMode): T {
  return typeof value === 'function' ? (value as (mode: FormMode) => T)(mode) : value
}

function validateFields<TForm extends FormValues>(fields: CrudField<TForm>[], values: TForm, mode: FormMode) {
  const errors: Record<string, string> = {}
  for (const field of fields) {
    const value = values[field.name] ?? ''
    if (resolve(field.required ?? false, mode) && !value.trim()) {
      errors[field.name] = 'Campo obrigatório.'
      continue
    }
    const message = field.validate?.(value, values, mode)
    if (message) errors[field.name] = message
  }
  return errors
}

/** Separa os erros de validação do backend entre os campos do form e uma lista geral. */
function splitServerErrors<TForm extends FormValues>(fields: CrudField<TForm>[], error: Error | null) {
  const byField: Record<string, string> = {}
  const general: string[] = []
  if (!error) return { byField, general }

  if (!(error instanceof ApiError) || Object.keys(error.errors).length === 0) {
    general.push(error.message)
    return { byField, general }
  }

  for (const [key, messages] of Object.entries(error.errors)) {
    const field = fields.find((f) => (f.errorKey ?? f.name).toLowerCase() === key.toLowerCase())
    if (field) byField[field.name] = messages[0]
    else general.push(...messages)
  }
  return { byField, general }
}

interface UseCrudFormOptions<TForm extends FormValues> {
  fields: CrudField<TForm>[]
  mode: FormMode
  initialValues: TForm
  submitError: Error | null
  onSubmit: (values: TForm) => void
}

/** Estado e validação de um formulário de CRUD, independente de onde ele é renderizado (dialog ou página). */
export function useCrudForm<TForm extends FormValues>({
  fields,
  mode,
  initialValues,
  submitError,
  onSubmit,
}: UseCrudFormOptions<TForm>) {
  const [values, setValues] = useState<TForm>(initialValues)
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})
  const serverErrors = splitServerErrors(fields, submitError)

  const errors: Record<string, string> = { ...serverErrors.byField }
  for (const [name, message] of Object.entries(clientErrors)) {
    if (message) errors[name] = message
  }

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }))
    setClientErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const validation = validateFields(fields, values, mode)
    setClientErrors(validation)
    if (Object.keys(validation).length === 0) onSubmit(values)
  }

  return { fields, mode, values, errors, generalErrors: serverErrors.general, handleChange, handleSubmit }
}

export type CrudFormState<TForm extends FormValues> = ReturnType<typeof useCrudForm<TForm>>
