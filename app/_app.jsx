// pages/_app.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [isHashValid, setIsHashValid] = useState(false);

  useEffect(() => {
    const initData = window.Telegram.WebApp.initData;

    if (initData) {
      axios
        .get(`/api/validate-hash?${initData}`)
        .then((response) => {
          setIsHashValid(response.data.success);
        })
        .catch((error) => {
          console.error('Error validating hash:', error);
          setIsHashValid(false);
        });
    } else {
      setIsHashValid(false);
    }
  }, []);

  if (!isHashValid) {
    return <div>Loading...</div>; // Or display a meaningful message
  }

  return <Component {...pageProps} />;
}

export default MyApp;
