export default async function handler(req, res) {
  try {
    const response = await fetch("http://139.99.72.27:80/server_data.php");
    const text = await response.text();

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(text);
  } catch (err) {
    res.status(500).send("server|offline\nport|17091\ntype|1");
  }
}
