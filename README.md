# GTPS Login Backend + Admin Panel

## 📁 Struktur File

```
apktps/
├── api/
│   ├── server_data.js     ← endpoint utama GTPS
│   ├── admin_get.js       ← API baca config (untuk panel)
│   └── admin_update.js    ← API update config (untuk panel)
├── public/
│   └── admin.html         ← halaman panel admin
├── vercel.json
└── package.json
```

---

## 🚀 Setup (Wajib Dilakukan Sebelum Deploy)

### 1. Deploy ke Vercel seperti biasa

### 2. Set Environment Variables di Vercel Dashboard

Buka: **Vercel Dashboard → Project → Settings → Environment Variables**

Tambahkan variable berikut:

| Key                | Value (contoh)              | Keterangan                            |
|--------------------|-----------------------------|---------------------------------------|
| `ADMIN_PASSWORD`   | `passwordRahasia123`        | Password login panel admin            |
| `VERCEL_TOKEN`     | `xxxxxx`                    | Token API Vercel (lihat langkah 3)    |
| `VERCEL_PROJECT_ID`| `prj_xxxxxx`                | ID project Vercel kamu                |
| `VERCEL_TEAM_ID`   | (kosong kalau personal)     | Isi jika pakai team Vercel            |
| `SERVER_IP`        | `139.99.72.27`              | IP server awal                        |
| `SERVER_PORT`      | `17091`                     | Port server awal                      |
| `LOGIN_URL`        | `namaproyek.vercel.app`     | Login URL awal                        |
| `META_NAME`        | `XinPS`                     | Nama server                           |
| `MAINT_MSG`        | (kosong)                    | Pesan maintenance (kosong = off)      |

### 3. Cara Dapat VERCEL_TOKEN

1. Buka https://vercel.com/account/tokens
2. Klik **Create Token**
3. Beri nama (misal: "gtps-admin") → pilih scope **Full Account**
4. Copy token-nya → paste ke env var `VERCEL_TOKEN`

### 4. Cara Dapat VERCEL_PROJECT_ID

1. Buka Vercel Dashboard → klik project kamu
2. Buka **Settings → General**
3. Scroll ke bawah, cari **Project ID** → copy

---

## 🎮 Cara Pakai Panel Admin (Untuk Buyer)

1. Buka browser, akses: `https://namaproyek.vercel.app/admin`
2. Masukkan **Admin Password** yang sudah kamu set di env var
3. Ubah IP, Port, Login URL, Meta Name, atau pesan Maintenance
4. Klik **Simpan & Deploy**
5. Tunggu ~30 detik → server_data sudah pakai config baru ✅

---

## 🔒 Keamanan

- Panel admin dilindungi password (set di `ADMIN_PASSWORD`)
- API admin hanya bisa diakses dengan header `x-admin-password` yang benar
- Endpoint GTPS tetap pakai validasi User-Agent seperti sebelumnya

---

## ⚠️ Catatan

Setiap kali buyer klik "Simpan & Deploy", Vercel akan melakukan redeploy otomatis.
Proses ini memakan waktu ~30-60 detik sampai perubahan aktif.
