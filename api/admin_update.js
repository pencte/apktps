import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  const authHeader = req.headers['x-admin-password'] || "";

  if (authHeader !== adminPass) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { serverIP, serverPort, loginUrl, maintMsg, metaName } = req.body || {};

  if (!serverIP || !serverPort || !loginUrl) {
    return res.status(400).json({ error: "serverIP, serverPort, dan loginUrl wajib diisi!" });
  }

  try {
    const kv = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    // Simpan semua config sekaligus ke hash
    await kv.hset("gtps:config", {
      serverIP,
      serverPort,
      loginUrl,
      metaName:  metaName  || "XinPS",
      maintMsg:  maintMsg  || "",
    });

    return res.status(200).json({
      success: true,
      message: "Config berhasil disimpan! Perubahan aktif sekarang ✅"
    });

  } catch (e) {
    return res.status(500).json({ error: "Gagal simpan ke KV: " + e.message });
  }
}
