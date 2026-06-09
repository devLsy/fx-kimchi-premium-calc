import { useState, useEffect } from 'react';

export const useMarketData = (selectedCoin) => {
  const [data, setData] = useState({
    domesticPrice: 0,
    foreignPrice: 0,
    exchangeRate: 1400, 
    loading: true,
    error: {
      upbit: false,
      binance: false,
      message: null
    }
  });

  // 1. 환율 업데이트 (긴 주기)
  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const json = await res.json();
        setData(prev => ({ ...prev, exchangeRate: json.rates.KRW }));
      } catch (e) { console.error(e); }
    };
    fetchExchange();
    const interval = setInterval(fetchExchange, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. 암호화폐 시세 업데이트 (짧은 주기)
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const results = await Promise.allSettled([
          // 업비트 시세
          fetch(`https://api.upbit.com/v1/ticker?markets=${selectedCoin.upbit}`),
          // 바이낸스 시세
          fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${selectedCoin.binance}`)
        ]);

        const upbitRes = results[0];
        const binanceRes = results[1];

        const upbitOk = upbitRes.status === 'fulfilled' && upbitRes.value.ok;
        const binanceOk = binanceRes.status === 'fulfilled' && binanceRes.value.ok;
        
        const upbitData = upbitOk ? await upbitRes.value.json() : null;
        const binanceData = binanceOk ? await binanceRes.value.json() : null;

        setData(prev => ({
              ...prev,
              domesticPrice: upbitData ? upbitData[0].trade_price : prev.domesticPrice,
              foreignPrice: binanceData ? parseFloat(binanceData.price) : prev.foreignPrice,
              error: {
                upbit: !upbitOk,
                binance: !binanceOk,
                message: (!upbitOk || !binanceOk) ? "일부 데이터 수신 실패" : null
              },
              loading: false
        }));
      } catch (e) { 
        console.error("전체 시세 호출 실패:", e);
        setData(prev => ({ 
          ...prev, 
          loading: false, 
          error: { upbit: true, binance: true, message: "네트워크 오류" } 
        }));
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 3000);
    return () => clearInterval(interval);
  }, [selectedCoin]);

  return data;
};