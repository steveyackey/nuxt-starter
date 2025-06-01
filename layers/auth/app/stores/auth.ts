import { createAuthClient } from "better-auth/vue"
import { defineStore } from "pinia"

const authClient = createAuthClient()
const session = authClient.useSession()

export const useAuthStore = defineStore("useAuthStore", () => {
  const loading = ref(false)

  async function signIn() {
    loading.value = true
    await authClient.signIn.social({
      provider: "github",

    })
    loading.value = false
  }

  async function signOut() {
    loading.value = true
    await authClient.signOut()
    navigateTo("/", { replace: true })
    loading.value = false
  }

  const signedIn = computed(() => session.value?.data?.session !== undefined)

  const user = computed(() => session.value?.data?.user)

  return {
    loading,
    signIn,
    signOut,
    signedIn,
    user,
  }
})
