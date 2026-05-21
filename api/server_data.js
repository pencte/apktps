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

  // Ambil config dari environment variables (bisa diubah lewat panel)
  const serverIP   = process.env.SERVER_IP      || "139.99.72.27";
  const serverPort = process.env.SERVER_PORT     || "17091";
  const loginUrl   = process.env.LOGIN_URL       || "vobg.vercel.app";
  const maintMsg   = process.env.MAINT_MSG       || "";
  const metaName   = process.env.META_NAME       || "XinPS";

  let maintLine = "";
  if (maintMsg && maintMsg.trim() !== "") {
    maintLine = `maint|${maintMsg}\n`;
  }

  const response = `server|${serverIP}
port|${serverPort}
type|1
type|2
loginurl|${loginUrl}
${maintLine}meta|${metaName}
RTENDMARKERBS1001`;

  res.status(200).send(response);
}
