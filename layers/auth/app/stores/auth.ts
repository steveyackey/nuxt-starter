import { createAuthClient } from "better-auth/vue"

const authClient = createAuthClient()

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

  const signedIn = authClient.useSession().value.data?.session !== undefined

  return {
    loading,
    signIn,
    signOut,
    signedIn,
  }
})
