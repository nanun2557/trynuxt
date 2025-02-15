export default defineNuxtRouteMiddleware((to, from) => {
    console.log("[middleware log] test auth");
});