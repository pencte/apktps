export default async function handler(req, res) {
  const response = await fetch("http://139.99.72.27:17091/server_data.php");
  const text = await response.text();

  res.setHeader("Content-Type", "text/plain");
  res.send(text);
}
