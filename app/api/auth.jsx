import crypto from 'crypto';
import { add_user } from '../../../lib/database'; // Adjust the path as needed

const BOT_TOKEN = process.env.BOT_TOKEN;

function verifyTelegramAuth(data) {
  const authData = { ...data };
  delete authData.hash;
  const checkString = Object.keys(authData)
    .sort()
    .map((key) => `${key}=${authData[key]}`)
    .join('\n');
  const secretKey = crypto.createHash('sha256').update(BOT_TOKEN).digest();
  const hmac = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');
  return hmac === data.hash;
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    if (verifyTelegramAuth(data) && Date.now() / 1000 - data.auth_date < 86400) {
      const userId = data.id;
      const username = data.username;
      await add_user(userId, username); // Add user to the database
      res.status(200).json({ status: 'ok', message: 'Authentication successful' });
    } else {
      res.status(403).json({ status: 'error', message: 'Authentication failed' });
    }
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
};
