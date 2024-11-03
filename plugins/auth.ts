import { useAuth, fetchCurrentAuth } from "@/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const { auth } = useAuth();
  if (useNuxtApp().ssrContext && !auth.value) {
    auth.value = await fetchCurrentAuth();
  }
})
