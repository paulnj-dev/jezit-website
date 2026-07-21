# JEZiT Website — GitHub Ready

เว็บไซต์ One Page สำหรับ JEZiT Solutions พร้อมอัปโหลดเข้า GitHub ได้ทันที

## สิ่งที่ปรับในเวอร์ชันนี้

- เพิ่มภาพ `Mobile Device Management` ใหม่
- เพิ่มภาพ `Server, Cloud & Network` ใหม่
- ปรับ Service Cards ให้เป็น Layout 3 คอลัมน์บน Desktop
- Tablet: Cyber Security เต็มแถว และอีก 2 Card วางคู่กัน
- Mobile: เรียง Card ทีละใบ
- เปลี่ยน `กล้องและไม้กั้น` เป็น `กล้อง CCTV`
- ลบข้อความเกี่ยวกับไม้กั้นอัตโนมัติ
- ใช้ฟอนต์ Noto Sans Thai
- ไม่มี Scroll Animation ที่ทำให้ Layout กระโดด

## ไฟล์ภาพใหม่

```text
assets/images/mdm.jpg
assets/images/server-cloud-network.jpg
```

## อัปโหลดขึ้น GitHub

แตกไฟล์ ZIP แล้วอัปโหลด **ไฟล์และโฟลเดอร์ข้างในทั้งหมด** ไปยังหน้าแรกของ Repository

โครงสร้างที่ถูกต้อง:

```text
jezit-website/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── images/
    └── logos/
```

`index.html` ต้องอยู่หน้าแรกของ Repository และไม่ควรซ้อนอยู่ในโฟลเดอร์อื่น

## ดูตัวอย่างใน GitHub Codespaces

เปิด Terminal แล้วรัน:

```bash
python3 -m http.server 8000
```

จากนั้นเปิดแท็บ `PORTS` และกด `Open in Browser` ที่ Port `8000`

## Commit ที่แนะนำ

```text
Update service cards and images
```
