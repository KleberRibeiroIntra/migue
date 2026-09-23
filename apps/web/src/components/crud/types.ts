import type { ReactNode } from 'react'
import type { CrudApi } from '../../api/crudApi'

export type FormMode = 'create' | 'edit'

/** Valores do formulário: sempre strings, convertidas para o Request em `toRequest`. */
export type FormValues = Record<string, string>

export interface CrudColumn<TItem> {
  header: string
  render: (item: TItem) => ReactNode
  width?: string
}

export interface CrudField<TForm extends FormValues> {
  name: keyof TForm & string
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea'
  placeholder?: string
  helperText?: string | ((mode: FormMode) => string | undefined)
  required?: boolean | ((mode: FormMode) => boolean)
  /** Regra extra; retorne a mensagem de erro ou undefined. */
  validate?: (value: string, values: TForm, mode: FormMode) => string | undefined
  /** Nome da propriedade nos erros de validação do backend, quando diferente de `name` (ex: PasswordHash). */
  errorKey?: string
}

export interface CrudConfig<TItem extends { id: string }, TRequest, TForm extends FormValues> {
  /** Chave base das queries do React Query. */
  queryKey: string
  api: CrudApi<TItem, TRequest>
  title: string
  description?: string
  /** Nome da entidade no singular, minúsculo (ex: "usuário"). */
  entityLabel: string
  columns: CrudColumn<TItem>[]
  fields: CrudField<TForm>[]
  emptyForm: TForm
  toForm: (item: TItem) => TForm
  toRequest: (values: TForm, mode: FormMode) => TRequest
  /** Texto que identifica o item na confirmação de exclusão. */
  getItemLabel: (item: TItem) => string
  pageSize?: number
}
