# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setep to install
```
1.download node from https://nodejs.org/en/download and then install it
2. npm install
3. npm run dev
4. npm run build (for production)
5. npm run preview (preview production)
```

## QA
1. useFetch , useLazyFetch แตกต่างกันอย่างไร ?
    - useLazyFetch หรือ useFetch ใน Nuxt เป็น async function
    - useFetch() ใช้สำหรับดึงข้อมูลอัตโนมัติทันที เช่นทำงานทักทีที่เข้า page
    - useLazyFetch() ใช้โหลดข้อมูลเมื่อเรียกใช้งาน เช่นทำงานตอน user กดปุ่ม
    - useLazyFetch, useFetch ค่าที่ได้เป็น reactive (reactive หมายความว่า เมื่อค่าของตัวแปรเปลี่ยน UI จะอัปเดตเองโดยอัตโนมัติ )
      จึงไม่จำเป็นต้องใช้ await
    - ถ้าใช้ await จะบล็อกจนกว่าข้อมูลจะถูกดึงมาเรียบร้อย (ไม่ดีถ้าต้องการโหลดแบบ Async)

2. composables folder ไว้ทำอะไร ?
