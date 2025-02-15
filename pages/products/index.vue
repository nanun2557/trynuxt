<script setup>
import { toRaw } from 'vue';

const  {data:products} = await useFetch('/api/products');
console.log("product : ", toRaw(products.value))
</script>


<template>
    <div class="productPage p-4">
      <h1 class="text-xl font-bold mb-4">Product List</h1>
      <table class="w-full border border-gray-300">
        <thead>
          <tr class="bg-green-900">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products.data.products" :key="index" class="hover:bg-gray-50">
            <td class="border px-4 py-2">{{ product.name }}</td>
            <td class="border px-4 py-2">{{ product.price }} ฿</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>