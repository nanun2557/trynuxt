<script setup>
import { useCounterStore } from "~/stores/myStore"
const store = useCounterStore();
console.log("store :", store)
</script>
<template>
    <div class="counterComponentV2">
        Counter v2 : {{ store.count }}
        <button class="p-1 bg-white text-black border border-gray-300 rounded-md cursor-pointer" @click="store.increment()">+</button>
        <button class="p-1 bg-white text-black border border-gray-300 rounded-md cursor-pointer" @click="store.decrement()">-</button>
    </div>
</template>