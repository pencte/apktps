export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");

  // ===== CHECKER =====
  const allowedUserAgents = [
    "UbiServices_SDK_2022.Release.9_PC64_ansi_static",
    "UbiServices_SDK_2022.Release.9_ANDROID64_static",
    "UbiServices_SDK_2022.Release.9_IOS64",
    "UbiServices_SDK_2022.Release.9_ANDROID32_static",
    "UbiServices_SDK_2022.Release.9_ANDROID32"
  ];

  const userAgent = req.headers['user-agent'];
  const protocol = parseInt(req.body?.protocol || "0", 10);
  const version = parseFloat(req.body?.version || "0");
  const check = req.socket?.servername;
  const connectionHeader = req.headers['connection'];

  if (
    !protocol ||
    !version ||
    protocol < 210 ||
    !check ||
    check !== "www.growtopia1.com" ||
    (connectionHeader && connectionHeader.toLowerCase() !== 'keep-alive' && connectionHeader !== '')
  ) {
    console.log("[PROTECTION] Blocked:", protocol, version, userAgent);
    return res.status(403).send("403 Forbidden");
  }

  if (!allowedUserAgents.includes(userAgent)) {
    console.log("[PROTECTION] Blocked UA:", userAgent);
    return res.status(403).send("403 Forbidden");
  }

  console.log("[PROTECTION] Request Passed");

  // ===== RESPONSE =====
  const response = `server|139.99.72.27
port|17091
type|1
type|2
loginurl|fff.albin-url.my.id:3000
#maint|Server currently change hosting, please join discord.gg/gtps15 to get the latest host.
meta|XinPS
RTENDMARKERBS1001`;

  res.status(200).send(response);
}
