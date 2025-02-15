<script setup>
    const {sayHello} = useUtils();
    sayHello();
</script>

<template>
    <div class="main">
        <Alert />
        <Profile />
        <div>Main page</div>
        <IconsAirplane />
        <img src="@/assets/img/girlanddog.png" alt="girl and dog">
        <img src="/tvandfan.png" alt="tv and fan">
    </div>
</template>