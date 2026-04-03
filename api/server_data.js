export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.send("server|1.1.1.1\nport|17091\ntype|1");
}
