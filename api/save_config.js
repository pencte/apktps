module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { server, port, loginurl, meta, maint } = req.body;

  if (!server || !port || !loginurl || !meta) {
    return res.status(400).json({ success: false, message: "Field server, port, loginurl, meta wajib diisi!" });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO  = process.env.GITHUB_REPO;

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return res.status(500).json({ success: false, message: "Server belum dikonfigurasi (env missing)." });
  }

  const filePath = "config.json";
  const apiUrl   = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;

  try {
    const getRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });

    if (!getRes.ok) {
      const err = await getRes.text();
      return res.status(500).json({ success: false, message: "Gagal ambil file dari GitHub: " + err });
    }

    const fileData = await getRes.json();
    const sha      = fileData.sha;

    const newConfig = { server, port, loginurl, meta, maint: maint || "" };
    const content   = Buffer.from(JSON.stringify(newConfig, null, 2) + "\n").toString("base64");

    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: JSON.stringify({
        message: `update config: ${server}:${port}`,
        content,
        sha
      })
    });

    if (!putRes.ok) {
      const err = await putRes.text();
      return res.status(500).json({ success: false, message: "Gagal update GitHub: " + err });
    }

    return res.status(200).json({ success: true, message: "Config berhasil disimpan! Server akan update dalam ~30 detik." });

  } catch (e) {
    return res.status(500).json({ success: false, message: "Error: " + e.message });
  }
};
