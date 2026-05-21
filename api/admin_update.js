export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Verifikasi admin password
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  const authHeader = req.headers['x-admin-password'] || "";

  if (authHeader !== adminPass) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { serverIP, serverPort, loginUrl, maintMsg, metaName } = req.body || {};

  // Validasi input
  if (!serverIP || !serverPort || !loginUrl) {
    return res.status(400).json({ error: "serverIP, serverPort, dan loginUrl wajib diisi!" });
  }

  // Vercel API credentials (set sebagai env var di Vercel)
  const vercelToken    = process.env.VERCEL_TOKEN;
  const vercelProjectId = process.env.VERCEL_PROJECT_ID;
  const vercelTeamId   = process.env.VERCEL_TEAM_ID || ""; // kosong kalau personal account

  if (!vercelToken || !vercelProjectId) {
    return res.status(500).json({
      error: "VERCEL_TOKEN atau VERCEL_PROJECT_ID belum di-set. Ikuti panduan setup di README.md!"
    });
  }

  // Variabel yang akan diupdate
  const envVars = [
    { key: "SERVER_IP",    value: serverIP },
    { key: "SERVER_PORT",  value: serverPort },
    { key: "LOGIN_URL",    value: loginUrl },
    { key: "MAINT_MSG",    value: maintMsg || "" },
    { key: "META_NAME",    value: metaName || "XinPS" }
  ];

  const teamQuery = vercelTeamId ? `?teamId=${vercelTeamId}` : "";
  const baseUrl   = `https://api.vercel.com/v9/projects/${vercelProjectId}/env`;

  try {
    // Ambil semua env var yang sudah ada
    const listRes = await fetch(`${baseUrl}${teamQuery}`, {
      headers: { Authorization: `Bearer ${vercelToken}` }
    });
    const listData = await listRes.json();
    const existingEnvs = listData.envs || [];

    for (const envVar of envVars) {
      const existing = existingEnvs.find(e => e.key === envVar.key);

      if (existing) {
        // Update yang sudah ada
        await fetch(`${baseUrl}/${existing.id}${teamQuery}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ value: envVar.value })
        });
      } else {
        // Buat baru
        await fetch(`${baseUrl}${teamQuery}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            key:    envVar.key,
            value:  envVar.value,
            type:   "plain",
            target: ["production", "preview", "development"]
          })
        });
      }
    }

    // Trigger redeploy supaya env var langsung aktif
    const deployRes = await fetch(
      `https://api.vercel.com/v13/deployments${teamQuery}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name:   vercelProjectId,
          gitSource: null,
          // Redeploy dari deployment terakhir
          deploymentId: await getLatestDeploymentId(vercelToken, vercelProjectId, vercelTeamId)
        })
      }
    );

    return res.status(200).json({
      success: true,
      message: "Config berhasil diupdate! Tunggu ~30 detik untuk deployment selesai."
    });

  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ error: "Gagal update config: " + err.message });
  }
}

async function getLatestDeploymentId(token, projectId, teamId) {
  const teamQuery = teamId ? `?teamId=${teamId}` : "";
  const res = await fetch(
    `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=1${teamId ? `&teamId=${teamId}` : ""}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await res.json();
  return data.deployments?.[0]?.uid || null;
}
