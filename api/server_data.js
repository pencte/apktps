export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");

  const response = `
server|139.99.72.27
port|17091
type|1
type|2
loginurl|fff.albin-url.my.id:3000
#maint|Server currently change hosting, please join discord.gg/gtps15 to get the latest host.
meta|XinPS
RTENDMARKERBS1001
`;

  res.status(200).send(response);
}
