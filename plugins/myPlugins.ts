export default defineNuxtPlugin(() => {
    return {
      provide: {
        sayHello: (msg: string) => console.log(`Hello ${msg}!`)
      }
    }
  }) 