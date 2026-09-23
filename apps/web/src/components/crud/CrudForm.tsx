import { Field, Flex, Input, Text, Textarea } from '@chakra-ui/react'
import { type CrudFormState, resolve } from '../../hooks/useCrudForm'
import type { FormValues } from './types'

/** Renderiza os campos declarados no config e os erros gerais do backend. */
export function CrudFormFields<TForm extends FormValues>({ form }: { form: CrudFormState<TForm> }) {
  const { fields, mode, values, errors, generalErrors, handleChange } = form

  return (
    <Flex direction="column" gap="16px">
      {fields.map((field) => {
        const error = errors[field.name]
        const helperText = field.helperText && resolve(field.helperText, mode)
        const inputProps = {
          name: field.name,
          value: values[field.name] ?? '',
          placeholder: field.placeholder,
          onChange: (event: { target: { value: string } }) => handleChange(field.name, event.target.value),
        }

        return (
          <Field.Root key={field.name} invalid={!!error} required={resolve(field.required ?? false, mode)}>
            <Field.Label>
              {field.label}
              <Field.RequiredIndicator />
            </Field.Label>
            {field.type === 'textarea' ? (
              <Textarea {...inputProps} />
            ) : (
              <Input {...inputProps} type={field.type ?? 'text'} />
            )}
            {helperText && !error && <Field.HelperText>{helperText}</Field.HelperText>}
            <Field.ErrorText>{error}</Field.ErrorText>
          </Field.Root>
        )
      })}

      {generalErrors.map((message) => (
        <Text key={message} color="red.600" fontSize="14px">
          {message}
        </Text>
      ))}
    </Flex>
  )
}
