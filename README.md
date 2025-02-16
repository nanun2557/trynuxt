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
      ถ้าใช้ useLazyFetch แบบเรียกใช้งานโดยตรง ไม่ครอบด้วยฟังก์ชันอื่น มันจะทำงานเหมือน useFetch และ ดึงข้อมูลทันทีที่ component โหลด
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
        **แต่ useFetch() จะทำงานอยู่ดี**    
        ถ้า ไม่อยากให้ทำงานต้องใข้ useLazyFetch() แทน  
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

        **ตัวอย่าง useLazyFetch() แบบโดยตรงโดยไม่มี function มาครอบ**  
        การทำงาน จะทำงานเหมือน useFetch()
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

3. **Promise คืออะไร ?**  
  - Promise เป็น object ใน JavaScript ที่ใช้สำหรับจัดการ asynchronous operations  
  - ฟังก์ชันที่เป็น async จะ return ค่าเป็น Promise เสมอ
  - Promise ช่วยให้การทำงานกับ callback ง่ายขึ้น และทำให้โค้ดอ่านง่ายขึ้น  
  - Promise มี 3 สถานะ  
    - pending (รอดำเนินการ) → Promise เริ่มต้นที่สถานะนี้ และยังไม่มีผลลัพธ์
    - fulfilled (สำเร็จ) → Promise ทำงานเสร็จเรียบร้อย และคืนค่า (resolve)
    - rejected (ล้มเหลว) → Promise ทำงานไม่สำเร็จ และคืนค่าข้อผิดพลาด (reject)
  - **การสร้าง promise**    
    ```
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        let success = true; // ลองเปลี่ยนเป็น false เพื่อดู reject
        if (success) {
          resolve("โหลดข้อมูลสำเร็จ!"); // สำเร็จ
        } else {
          reject("เกิดข้อผิดพลาดในการโหลดข้อมูล!"); // ล้มเหลว
        }
      }, 2000); // จำลองการโหลดข้อมูลใช้เวลา 2 วินาที
    });
    ```
  - **ใช้งาน Promise ด้วย .then() และ .catch()**  
    ```
    myPromise
      .then((result) => {
        console.log(result); // ถ้า resolve -> แสดง "โหลดข้อมูลสำเร็จ!"
      })
      .catch((error) => {
        console.log(error); // ถ้า reject -> แสดง "เกิดข้อผิดพลาดในการโหลดข้อมูล!"
    });
    ```
  - **สามารถ Promise กับ async/await**  
    await + promise จะได้ข้อมูล
    ```
    const getData = async () => {
      try {
        const data = await myPromise(); // รอให้ myPromise() ทำงานเสร็จ
        console.log("ข้อมูลที่โหลด:", data);
      } catch (error) {
        console.log("เกิดข้อผิดพลาด:", error);
      }
    };
    getData();
    ```

4. **useFetch() ต่่างกับ useAsyncData() อย่างไร?** 
  - useFetch → ใช้สำหรับดึงข้อมูลที่เรียบง่าย รองรับ pending และ error อัตโนมัติ
  - useAsyncData → ใช้เมื่อเราต้องการควบคุม logic มากขึ้น เช่น การ throw error เอง
  **ตัวอย่าง**  
    await + promise จะได้ข้อมูล    
    จากตัวอย่างนี้ fetch("/api/v2/productsCount") เป็น async function ที่ return promise  
    ```
    const { data: productCount, pendingProductCount, error } = useAsyncData("fetchData", async () => {
      const response = await fetch("/api/v2/productsCount");
      if (!response.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
      return await response.json();
    });

    if (error.value) {
      console.error("เกิดข้อผิดพลาด:", error.value);
    }
    ```

5. **ทุก function ที่ return promise นั้นเรียนกว่า async function ได้เสมอไหม?**
  - ฟังก์ชันที่ return Promise ไม่จำเป็นต้องเป็น async function
  - แต่ฟังก์ชันที่ return Promise ถือว่าเป็น asynchronous function สามารถ await เพื่อถอด promise เป็นค่า value ได้
  **ตัวอย่าง ฟังก์ชันที่ return Promise**  
    ```
    function fetchData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("ข้อมูลโหลดสำเร็จ!");
        }, 1000);
      });
    }

    console.log(fetchData()); // Output: Promise { <pending> }
    ```
