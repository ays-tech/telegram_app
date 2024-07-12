// pages/init-data.js
import { useTelegramInitData } from './hooks/useTelegramInitData';

export default function InitData() {
  const initData = useTelegramInitData();

  return (
    <div>
      <h1>initData</h1>
      <pre>{JSON.stringify(initData, null, 2)}</pre>
    </div>
  );
}
