// utils/telegramAuth.js
import crypto from 'crypto';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // Add your bot token to .env file

export function checkTelegramAuth(data) {
  const secret = crypto.createHash('sha256').update(TELEGRAM_BOT_TOKEN).digest();
  const checkString = Object.keys(data)
    .filter(key => key !== 'hash')
    .sort()
    .map(key => `${key}=${data[key]}`)
    .join('\n');
  const hash = crypto.createHmac('sha256', secret).update(checkString).digest('hex');

  return hash === data.hash;
}
