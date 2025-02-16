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
1. **useFetch , useLazyFetch แตกต่างกันอย่างไร ?**
    - useLazyFetch หรือ useFetch ใน Nuxt เป็น async function  
      (async function หมายถึง ทำทันทีต่อแต่ไม่รอผลลัพธ์จนเสร็จ) 
      และจะทำงานทันทีเมื่อเข้า page
    - useFetch() ใช้สำหรับดึงข้อมูลอัตโนมัติทันที เช่นทำงานทักทีที่เข้า page
    - useLazyFetch() ใช้โหลดข้อมูลเมื่อเรียกใช้งาน เช่นทำงานตอน user กดปุ่ม
    - useFetch ค่าที่ได้ ไม่เป็น reactive ข้อมูลใน UI จะไม่เปลี่ยนแปลง 
    - useLazyFetch ค่าที่ได้เป็น reactive   
      (reactive หมายความว่า เมื่อค่าของตัวแปรเปลี่ยน UI จะอัปเดตเองโดยอัตโนมัติ )
      จึงไม่จำเป็นต้องใช้ await
    - ถ้าใช้ await จะบล็อกจนกว่าข้อมูลจะถูกดึงมาเรียบร้อย (ไม่ดี ถ้าต้องการโหลดแบบ Async)
      สมมุติ ถ้าใช้ await กับ useFetch() สำหรับดึงข้อมูลจาก API , โปรแกรมจะรอจนกว่าได้ข้อมูลจาก API ถึงจะ render UI

        **ตัวอย่าง useFetch()**
        ```
        const  {data:productsV1 } = await useFetch('/api/v2/products',{
        transform:(response) => {
            console.log('Transforming response:', response);
            return response.data.products
        },
        });
        ```

        **ตัวอย่าง useFetch() + ref() เพื่อทำให้ข้อมูลที่ได้จาก reactive**  
        สร้าง function ใหม่มาครอบ useFetch(), ซึ่ง function จะไม่ทำงานทันทีเมื่อเข้า page ต้องเรียกใช้เอง 
        ```
        const productsV1 = ref([]);
        const pending = ref(true);

        const fetchProductsV1 = async () => {
        pending.value = true;
        const { data } = await useFetch('/api/v2/products', {
            transform: (response) => response.products,
        });

        productsV1.value = data.value; // ต้องใช้ .value เพื่อให้ Vue detect
        pending.value = false;
        };

        fetchProductsV1();
        ```

        **ตัวอย่าง useLazyFetch()**
        ```
        const { data: productsV2, pending } = useLazyFetch('/api/v2/products', {
        transform: (response) => {
            console.log('Transforming response:', response);
            return response.products; // แปลงข้อมูลที่ได้จาก API
        },
        });
        ```

2. **SSR, CSR ต่างกันอย่างไร ?**  
    - CSR (Client-side Rendering) คือการโหลดเว็บเปล่า ๆ แล้ว Fetch API ฝั่ง Client ด้วย JavaScript เช่น useFetch()  
      ถ้าใช้ useLazyFetch() หรือ Fetch API ใน onMounted() → ข้อมูลจะโหลดตอนที่ Client เปิดเว็บเท่านั้น   
      **ตัวอย่าง**  
      จุดสำคัญที่ Netflix ใช้ CSR  
        - หน้า Homepage (/) → ใช้ SSR เพื่อโหลดเร็ว
        - หน้า หลังล็อกอิน (/browse) → ใช้ CSR เพื่อให้ UI ลื่นไหล
        - เนื้อหาวิดีโอ ดึงจาก Server-side API Rendering เพื่อโหลดเฉพาะข้อมูลที่จำเป็น

        การติดตั้ง
        ```
        # 1. ติดตั้ง dependencies
        npm install
        # 2. Build เป็นไฟล์ Static
        nuxt generate
        # 3. ไฟล์ที่ได้จะอยู่ใน .output/public หรือ dist/ (ขึ้นอยู่กับ Nuxt Config)
        # 4. ใช้ Web Server เช่น Nginx
        ```
    - SSR (Server-side Rendering) คือการเรนเดอร์หน้าเว็บที่ฝั่งเซิร์ฟเวอร์ แล้วส่ง HTML ที่เรนเดอร์เสร็จแล้วไปยังเบราว์เซอร์ของผู้ใช้  
      ประยุกใช์ Hydration เพื่อสามารถ interactive กับเว็บ  
      **ตัวอย่าง**  
      Shopee ใช้ SSR เป็นหลัก เพื่อให้ Search Engine อ่านหน้าเว็บได้ง่าย  
        - หน้า Product Page (/product/123) → ใช้ SSR เพื่อ SEO  
        - หน้า Category Page (/category/phones) → ใช้ SSR เพื่อโหลดเร็ว  
        - หน้า Cart หรือ Checkout → ใช้ CSR เพราะไม่ต้องการ SEO  

        การติดตั้ง
        ```
        npm run build  # สร้างไฟล์ที่ .output/ (ต้องใช้ Node.js)
        npm run start  # รัน Nuxt ด้วย SSR ที่ production server
        ```    
