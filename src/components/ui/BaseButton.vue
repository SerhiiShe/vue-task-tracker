<script setup lang="ts">
type ButtonType = 'button' | 'submit'

interface Props {
  type?: ButtonType
  disabled?: boolean
}

defineOptions({
  name: 'BaseButton'
})

const props = withDefaults(
  defineProps<Props>(),
  {
    type: 'button',
    disabled: false
  })

const emit = defineEmits<{
  (e: 'action'): void
}>()
</script>

<template>
  <button :type="type" :disabled="disabled" @click="emit('action')" class="inline-flex items-center justify-center
           px-4 py-2
           text-sm font-medium
           rounded-lg
           bg-blue-600 text-white
           transition-colors
           hover:bg-blue-700           
           disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
    <slot />
  </button>
</template>

<style scoped></style>
