export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || "";

  // Contoh filter sederhana (Growtopia punya user-agent khas)
  if (!userAgent.includes("Growtopia")) {
    return res.status(403).send("Forbidden");
  }

  res.setHeader("Content-Type", "text/plain");

  res.status(200).send(`
server|139.99.72.27
port|17091
type|1
type|2
loginurl|fff.albin-url.my.id:3000
meta|XinPS
RTENDMARKERBS1001
`);
}
