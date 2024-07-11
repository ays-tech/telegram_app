// hooks/useTelegramInitData.js
import { useEffect, useState } from 'react';

export const useTelegramInitData = () => {
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    const data = window.Telegram.WebApp.initDataUnsafe;
    setInitData(data);
  }, []);

  return initData;
};
