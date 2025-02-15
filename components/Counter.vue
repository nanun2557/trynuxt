<script setup>
const counter = useCounter();

</script>
<template>
    <div class="counterComponent">
        Counter : {{ counter }}
        <button class="p-1 bg-white text-black border border-gray-300 rounded-md cursor-pointer" @click="counter++">+</button>
        <button class="p-1 bg-white text-black border border-gray-300 rounded-md cursor-pointer" @click="counter--">-</button>
    </div>
</template>