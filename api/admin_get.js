export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  // Verifikasi admin password
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  const authHeader = req.headers['x-admin-password'] || "";

  if (authHeader !== adminPass) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Kirim config saat ini
    return res.status(200).json({
      serverIP:   process.env.SERVER_IP      || "139.99.72.27",
      serverPort: process.env.SERVER_PORT     || "17091",
      loginUrl:   process.env.LOGIN_URL       || "vobg.vercel.app",
      maintMsg:   process.env.MAINT_MSG       || "",
      metaName:   process.env.META_NAME       || "XinPS"
    });
  }

  // Method lain tidak diizinkan di sini
  return res.status(405).json({ error: "Method Not Allowed" });
}
