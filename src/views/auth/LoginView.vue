<script setup lang="ts">
import { useLoginForm } from '@/use/auth-form'
import BaseButton from '@/components/ui/BaseButton.vue'

defineOptions({
  name: 'LoginView'
})

const {
  submitForm,
  email,
  emailBlur,
  emailError,
  password,
  passwordBlur,
  passwordError
} = useLoginForm()
</script>

<template>
  <div class="flex justify-center px-4 py-10">

    <form @submit.prevent="submitForm"
      class="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">

      <h1 class="text-xl font-semibold text-gray-800">
        Login
      </h1>

      <!-- email -->
      <div class="flex flex-col">
        <label for="email" class="text-sm text-gray-600 pb-1">
          Email
        </label>

        <input id="email" name="email" type="email" v-model="email" @blur="emailBlur" class="border border-gray-200 rounded-lg px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <small v-if="emailError" class="text-red-500 text-xs pt-1">
          {{ emailError }}
        </small>
      </div>

      <!-- password -->
      <div class="flex flex-col">
        <label for="password" class="text-sm text-gray-600 pb-1">
          Password
        </label>

        <input id="password" name="password" type="password" v-model="password" @blur="passwordBlur" class="border border-gray-200 rounded-lg px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <small v-if="passwordError" class="text-red-500 text-xs pt-1">
          {{ passwordError }}
        </small>
      </div>

      <BaseButton type="submit">
        Login
      </BaseButton>

      <p class="text-sm text-gray-600 pt-2">
        Don't have an account?
        <router-link :to="{ name: 'SignUp' }" class="text-blue-600 hover:underline">
          Sign up
        </router-link>
      </p>

    </form>

  </div>
</template>

<style scoped></style>
