import { useAuthStore } from "../stores/auth"

export default defineNuxtRouteMiddleware(async () => {
  const { signedIn } = useAuthStore()

  if (!signedIn) {
    return navigateTo("/")
  }
})
