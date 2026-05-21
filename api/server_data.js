const config = require('../config.json');

module.exports = function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");

  const allowedUserAgents = [
    "UbiServices_SDK_2022.Release.9_PC64_ansi_static",
    "UbiServices_SDK_2022.Release.9_ANDROID64_static",
    "UbiServices_SDK_2022.Release.9_IOS64",
    "UbiServices_SDK_2022.Release.9_ANDROID32_static",
    "UbiServices_SDK_2022.Release.9_ANDROID32"
  ];

  const userAgent = req.headers['user-agent'] || "";

  if (!userAgent.startsWith("UbiServices_SDK")) {
    console.log("[PROTECTION] Blocked Non-GTPS:", userAgent);
    return res.status(403).send("403 Forbidden");
  }

  if (!allowedUserAgents.includes(userAgent)) {
    console.log("[PROTECTION] Blocked Unknown UA:", userAgent);
    return res.status(403).send("403 Forbidden");
  }

  console.log("[PROTECTION] Request Passed:", userAgent);

  let response = `server|${config.server}\nport|${config.port}\ntype|1\ntype|2\nloginurl|${config.loginurl}\n`;

  if (config.maint && config.maint.trim() !== "") {
    response += `#maint|${config.maint}\n`;
  }

  response += `meta|${config.meta}\nRTENDMARKERBS1001`;

  res.status(200).send(response);
};
