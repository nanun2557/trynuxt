<script setup>

// ใช้ await เพื่อรอให้ได้ข้อมูลจาก API
const  {data:productsV1 } = await useFetch('/api/v1/products',{
  transform:(response) => {
    console.log('Transforming response:', response);
    return response.data.products
  },
});


// เรียกใช้ useLazyFetch
const { data: productsV2, pending } = useLazyFetch('/api/v2/products', {
  transform: (response) => {
    console.log('Transforming response:', response);
    return response.products; // แปลงข้อมูลที่ได้จาก API
  },
});

// ลอง log ค่า pending และ productsV2
console.log('pending:', pending);
console.log('productsV2:', productsV2);
</script>


<template>
    <div class="productPage p-4">
      <h1 class="text-xl font-bold mb-4">Product List from /api/v1/products</h1>
      <table class="w-full border border-gray-300"  id="table1">
        <thead>
          <tr class="bg-green-900">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in productsV1" :key="index" class="hover:bg-gray-50">
            <td class="border px-4 py-2">{{ product.name }}</td>
            <td class="border px-4 py-2">{{ product.price }} ฿</td>
          </tr>
        </tbody>
      </table>

      <hr>
      <h1 class="text-xl font-bold mb-4">Product List from /api/v2/products</h1>
      <h1 class="text-xl font-bold mb-4 text-yellow-100">use useLazyFetch()</h1>
      <table class="w-full border border-gray-300" id="table2">
        <thead>
          <tr class="bg-green-900">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody v-if = "!pending">
          <tr v-for="(product, index) in productsV2" :key="index" class="hover:bg-gray-50">
            <td class="border px-4 py-2">{{ product.name }}</td>
            <td class="border px-4 py-2">{{ product.price }} ฿</td>
          </tr>
        </tbody>
      </table>
      <p v-if="pending" class="text-center text-yellow-100 mt-4">Loading...</p>
    </div>
  </template>