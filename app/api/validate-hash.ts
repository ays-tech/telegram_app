// pages/api/validate-hash.js
import crypto from 'crypto';

export default function handler(req, res) {
  const secretKey = 'your_bot_token_here'; // Replace with your bot's token

  const checkString = Object.keys(req.query)
    .sort()
    .map((key) => `${key}=${req.query[key]}`)
    .join('\n');

  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(checkString)
    .digest('hex');

  if (hash === req.query.hash) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid hash' });
  }
}
