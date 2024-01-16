export default defineNuxtRouteMiddleware((to, from) => {
  // console.log('to: ' + to.path);

  const api = useAPI();

  api.get('/users/token')
    .then(({ data }) => {
      const { message } = data;
      
      if ((
        message === "No token" || message === "Invalid token"
      ) && (
        to.path !== "/login" && to.path !== "/register"
      )) {
        return navigateTo('/login');
      } else if ((
        message !== "No token" && message !== "Invalid token"
      ) && (to.path === "/login" || to.path === "/register" || to.path === "/")
      ) {
        return navigateTo('/providers');
      }
    })
    .catch(err => {
      console.error(err);
      return abortNavigation();
    });
});
