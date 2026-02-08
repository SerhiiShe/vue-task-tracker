<script setup lang="ts">
import { useSignupForm } from '@/use/auth-form'

defineOptions({
  name: 'RegisterView'
})

const {
  submitForm,
  email,
  emailBlur,
  emailError,
  password,
  passwordBlur,
  passwordError
} = useSignupForm()
</script>

<template>
  <div class="px-4 flex justify-center">
    <form class="form" @submit.prevent="submitForm">
      <h1 class="text-2xl font-medium pb-6">Sign up</h1>
      <div class="form-field-wrap">
        <label class="form-label" for="email">Email</label>
        <input class="form-input" name="email" type="email" id="email" v-model="email" @blur="emailBlur">
        <small v-if="emailError" class="text-red-400 pt-1">{{ emailError }}</small>
      </div>
      <div class="form-field-wrap">
        <label class="form-label" for="password">Password</label>
        <input class="form-input" name="password" type="password" id="password" v-model="password" @blur="passwordBlur">
        <small v-if="passwordError" class="text-red-400 pt-1">{{ passwordError }}</small>
      </div>
      <button type="submit">Sign up</button>
      <p class="pt-4">Already have an account? <router-link :to="{ name: 'Login' }"
          class="text-brand-blue underline">Login</router-link></p>
    </form>
  </div>
</template>

<style scoped>

</style>
