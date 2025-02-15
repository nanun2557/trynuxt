export const useUtils = () => {
    const sayHello = () => console.log("sayhello from utils");
    return {
        sayHello,
    };
};
