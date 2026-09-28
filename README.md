# Thainexsweetie — ระบบสั่งอาหารร้านขนมหวาน

Stack: Next.js (App Router, **JavaScript เท่านั้น ห้ามใช้ TypeScript**) + Supabase, deploy บน Vercel

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

ใช้ client จาก `lib/supabaseClient.js` (`import { supabase } from '@/lib/supabaseClient'`)
ห้าม commit `.env.local`

## ⚠️ Next.js เวอร์ชันล่าสุด: `params` ของ Dynamic Route เป็น Promise
- ใน **Client Component** (`'use client'`) ต้อง unwrap ด้วย `use()` จาก React เสมอ:

```js
'use client';
import { use } from 'react';

export default function OrderPage({ params }) {
  const { tableId } = use(params); // ห้ามอ่าน params.tableId ตรง ๆ
  // ...
}
```

- ใน Server Component (ไม่มี 'use client') ให้ใช้ `const { tableId } = await params;` (ฟังก์ชันต้องเป็น async)
- `searchParams` ก็เป็น Promise เช่นกัน ใช้วิธีเดียวกัน

## โครงสร้างตารางฐานข้อมูล (มีอยู่แล้วใน Supabase — ไม่ต้องสร้างใหม่)

| ตาราง | คอลัมน์ |
|---|---|
| `sessions` | id, table_number, adult_count, child_count, status, created_at |
| `menu_categories` | id, name, sort_order |
| `menu_items` | id, category_id, name |
| `orders` | id, session_id, table_number, items (jsonb), status, created_at |

ความสัมพันธ์ที่ใช้อ้างอิง:
- `menu_items.category_id` → `menu_categories.id`
- `orders.session_id` → `sessions.id`

ใช้ชื่อตารางและคอลัมน์ตามนี้เท่านั้น ห้ามเดาคอลัมน์เพิ่ม (เช่น price) หากยังไม่ยืนยันกับเจ้าของโปรเจกต์

## หน้าที่วางแผนไว้
- `/` หน้าแรก (ทดสอบ deploy)
- `/generate-qr` สร้าง QR สำหรับแต่ละโต๊ะ
- `/kitchen` หน้าครัวดูออเดอร์
- หน้าสั่งอาหารแบบ dynamic route (ขั้นตอนถัดไป)
