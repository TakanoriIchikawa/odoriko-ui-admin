export default defineNuxtRouteMiddleware((to, from) => {
  const { auth } = useAuth();
  if (!auth.value) {
    return navigateTo({ path: "/signin", query: { returnPath: to.path } });
  }
});
