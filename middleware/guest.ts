export default defineNuxtRouteMiddleware(() => {
  const { auth } = useAuth();
  if (auth.value) {
    return navigateTo('/', { replace: true })
  }
})
