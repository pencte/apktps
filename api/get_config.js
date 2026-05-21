import config from '../config.json' assert { type: 'json' };

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(config);
}
