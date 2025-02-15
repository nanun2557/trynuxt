export default defineNuxtRouteMiddleware((to, from) => {
    console.log("[middleware log] to : ",to);
    console.log("[middleware log] from : ",from);
});