import { useState, useEffect } from 'react';

export const useMarketData = (selectedCoin) => {
  const [data, setData] = useState({
    domesticPrice: 0,
    foreignPrice: 0,
    exchangeRate: 1400, 
    loading: true,
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
        const [upbitRes, binanceRes] = await Promise.all([
          // 업비트 시세
          fetch(`https://api.upbit.com/v1/ticker?markets=${selectedCoin.upbit}`),
          // 바이낸스 시세
          fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${selectedCoin.binance}`)
        ]);
        const upbit = await upbitRes.json();
        const binance = await binanceRes.json();
        
        setData(prev => ({
          ...prev,
          domesticPrice: upbit[0].trade_price,
          foreignPrice: parseFloat(binance.price),
          loading: false
        }));
      } catch (e) { console.error(e); }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 3000);
    return () => clearInterval(interval);
  }, [selectedCoin]);

  return data;
};