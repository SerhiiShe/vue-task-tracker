import { useForm, useField } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import * as yup from 'yup'
import { SignupFormValues, LoginFormValues } from '@/types'

const PASSWORD_MIN_LENGTH = 6

export function useSignupForm() {
  const authStore = useAuthStore()
  const { handleSubmit } = useForm<SignupFormValues>()

  const {
    value: email,
    errorMessage: emailError,
    handleBlur: emailBlur
  } = useField<string>('email', yup
    .string()
    .trim()
    .email('Enter email')
    .required('Please enter a valid email address')
  )

  const {
    value: password,
    errorMessage: passwordError,
    handleBlur: passwordBlur
  } = useField<string>('password', yup
    .string()
    .required('Enter password')
    .min(PASSWORD_MIN_LENGTH, 'Password must be at least 6 characters')
  )

  const submitForm = handleSubmit(async values => {
    try {
      await authStore.signUp(values.email, values.password)      
    } catch (e) {
      console.error(e)
    }
  })

  return {
    submitForm,
    email,
    emailBlur,
    emailError,
    password,
    passwordBlur,
    passwordError
  }
}

export function useLoginForm() {
  const authStore = useAuthStore()
  const { handleSubmit } = useForm<LoginFormValues>()

  const {
    value: email,
    errorMessage: emailError,
    handleBlur: emailBlur
  } = useField<string>('email', yup
    .string()
    .trim()
    .email('Enter email')
    .required('Please enter a valid email address')
  )

  const {
    value: password,
    errorMessage: passwordError,
    handleBlur: passwordBlur
  } = useField<string>('password', yup
    .string()
    .required('Enter password')
    .min(PASSWORD_MIN_LENGTH, 'Password must be at least 6 characters')
  )

  const submitForm = handleSubmit(async values => {
    try {
      await authStore.login(values.email, values.password)
    } catch (e) {
      console.error(e)
    }
  })

  return {
    submitForm,
    email,
    emailBlur,
    emailError,
    password,
    passwordBlur,
    passwordError
  }
}
