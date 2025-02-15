<script setup>
definePageMeta({
    layout: "custom",
})
console.log(useNuxtApp());
const { $sayHello } = useNuxtApp();
$sayHello("Jom");
</script>

<template>
    <div class="Custom Page">Custom Page</div>
</template>