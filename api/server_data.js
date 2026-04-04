export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");

  const allowedUserAgents = [
    "UbiServices_SDK_2022.Release.9_PC64_ansi_static",
    "UbiServices_SDK_2022.Release.9_ANDROID64_static",
    "UbiServices_SDK_2022.Release.9_IOS64",
    "UbiServices_SDK_2022.Release.9_ANDROID32_static",
    "UbiServices_SDK_2022.Release.9_ANDROID32"
  ];

  const userAgent = req.headers['user-agent'] || "";

  // 🔒 VALIDASI UTAMA (yang bener buat GTPS)
  if (!userAgent.startsWith("UbiServices_SDK")) {
    console.log("[PROTECTION] Blocked Non-GTPS:", userAgent);
    return res.status(403).send("403 Forbidden");
  }

  if (!allowedUserAgents.includes(userAgent)) {
    console.log("[PROTECTION] Blocked Unknown UA:", userAgent);
    return res.status(403).send("403 Forbidden");
  }

  console.log("[PROTECTION] Request Passed:", userAgent);

  const response = `server|139.99.72.27
port|17091
type|1
type|2
loginurl|vobg.vercel.app
#maint|Server currently change hosting, please join discord.gg/gtps15 to get the latest host.
meta|XinPS
RTENDMARKERBS1001`;

  res.status(200).send(response);
}
