import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'base' | 'auth'
    access?: 'authOnly' | 'guestsOnly'
  }
}
