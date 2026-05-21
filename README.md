# GTPS Panel — Setup Guide

## Struktur File
```
/api/server_data.js   ← endpoint APK Growtopia (auto baca config.json)
/api/save_config.js   ← endpoint save config dari panel
/api/get_config.js    ← endpoint load config ke panel
/public/panel.html    ← panel buyer
/config.json          ← file config server (diupdate otomatis)
/vercel.json
/package.json
```

---

## Setup (1x per buyer)

### 1. Buat Repo GitHub Baru
- Buat repo baru di GitHub (bisa private)
- Upload semua file ini ke repo tersebut

### 2. Buat GitHub Personal Access Token
- Buka: https://github.com/settings/tokens
- Klik **"Generate new token (classic)"**
- Centang permission: **`repo`** (full control)
- Copy tokennya (cuma muncul sekali!)

### 3. Deploy ke Vercel
- Buka: https://vercel.com/new
- Import repo GitHub yang tadi dibuat
- Sebelum deploy, tambahkan **Environment Variables**:

| Key | Value |
|-----|-------|
| `GITHUB_TOKEN` | token dari step 2 |
| `GITHUB_REPO` | `username/nama-repo` (contoh: `john/gtps-buyer1`) |

- Klik **Deploy**

### 4. Kirim ke Buyer
Kirim link ini ke buyer:
```
https://nama-project.vercel.app/panel
```

Selesai! Buyer bisa langsung edit IP, port, dll dari panel.

---

## Cara Kerja
1. Buyer buka `/panel` → isi form → klik Save
2. Panel kirim data ke `/api/save_config`
3. `save_config` update file `config.json` di GitHub via API
4. Vercel detect perubahan di GitHub → auto redeploy (~30 detik)
5. APK hit `/growtopia/server_data.php` → dapet config terbaru ✅

---

## Catatan
- Setiap buyer = 1 repo GitHub baru + 1 project Vercel baru
- Gratis 100% (GitHub free + Vercel free tier)
- Redeploy otomatis ~30 detik setelah save
