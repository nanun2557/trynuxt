<script setup>


const  {data:productsV1 } = await useFetch('/api/v1/products',{
  transform:(_products) => _products.data.products,
});

const  {data:productsV2 , pending } = await useLazyFetch('/api/v2/products',{
  transform:(_products) => _products.data.products,
});



</script>


<template>
    <div class="productPage p-4">

      <h1 class="text-xl font-bold mb-4">Product List from /api/v1/products</h1>
      <table class="w-full border border-gray-300">
        <thead>
          <tr class="bg-green-900">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in productsV1 " :key="index" class="hover:bg-gray-50">
            <td class="border px-4 py-2">{{ product.name }}</td>
            <td class="border px-4 py-2">{{ product.price }} ฿</td>
          </tr>
        </tbody>
      </table>

      <hr>
      <h1 class="text-xl font-bold mb-4">Product List from /api/v2/products</h1>
      <h1 class="text-xl font-bold mb-4 text-yellow-100">use useLazyFetch()</h1>
      <table class="w-full border border-gray-300">
        <thead>
          <tr class="bg-green-900">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody
        >
          <tr v-for="(product, index) in productsV2" :key="index" class="hover:bg-gray-50">
            <td class="border px-4 py-2">{{ product.name }}</td>
            <td class="border px-4 py-2">{{ product.price }} ฿</td>
          </tr>
        </tbody>
      </table>
      <p v-if="pending" class="text-center text-yellow-100 mt-4">Loading...</p>


    </div>
  </template>