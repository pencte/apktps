import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  const authHeader = req.headers['x-admin-password'] || "";

  if (authHeader !== adminPass) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const kv = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    const config = await kv.hgetall("gtps:config") || {};

    return res.status(200).json({
      serverIP:   config.serverIP   || process.env.SERVER_IP   || "139.99.72.27",
      serverPort: config.serverPort || process.env.SERVER_PORT || "17091",
      loginUrl:   config.loginUrl   || process.env.LOGIN_URL   || "vobg.vercel.app",
      metaName:   config.metaName   || process.env.META_NAME   || "XinPS",
      maintMsg:   config.maintMsg   || process.env.MAINT_MSG   || "",
    });
  } catch (e) {
    return res.status(500).json({ error: "Gagal baca KV: " + e.message });
  }
}
