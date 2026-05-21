# GTPS Login Backend + Admin Panel

## 📁 Struktur File

```
apktps/
├── api/
│   ├── server_data.js     ← endpoint utama GTPS (baca dari KV)
│   ├── admin.js           ← halaman panel admin (HTML)
│   ├── admin_get.js       ← API baca config dari KV
│   └── admin_update.js    ← API tulis config ke KV
├── vercel.json
└── package.json
```

---

## 🚀 Setup (Sekali Aja)

### 1. Deploy project ke Vercel

### 2. Buat Vercel KV Database

1. Buka **Vercel Dashboard → Storage → Create Database → KV**
2. Beri nama (misal: `gtps-config`) → Create
3. Klik **Connect to Project** → pilih project kamu
4. Vercel otomatis nambahin env var `KV_REST_API_URL` dan `KV_REST_API_TOKEN`

### 3. Tambah 1 env var manual

Di **Vercel Dashboard → Project → Settings → Environment Variables**, tambahkan:

| Key               | Value              | Keterangan              |
|-------------------|--------------------|-------------------------|
| `ADMIN_PASSWORD`  | password_rahasia   | Password panel admin    |

Itu aja! Redeploy sekali supaya env var aktif.

---

## 🎮 Cara Pakai Buyer

1. Buka `https://namaproyek.vercel.app/admin`
2. Masukkan Admin Password
3. Ubah IP / Port / Login URL / Maintenance
4. Klik **Simpan** → **perubahan aktif instan** ✅ (tanpa redeploy)

---

## 🔒 Keamanan

- Panel admin dilindungi password (`ADMIN_PASSWORD`)
- Akun Vercel & KV tetap milik kamu, buyer tidak bisa akses
- Endpoint GTPS tetap pakai validasi User-Agent
