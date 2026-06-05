import React, { useState, useEffect } from 'react';

const COIN_LIST = [
  { id: 'BTC', name: '비트코인 (BTC)', upbit: 'KRW-BTC', binance: 'BTCUSDT' },
  { id: 'ETH', name: '이더리움 (ETH)', upbit: 'KRW-ETH', binance: 'ETHUSDT' },
  { id: 'DOGE', name: '도지코인 (DOGE)', upbit: 'KRW-DOGE', binance: 'DOGEUSDT' },
  { id: 'ADA', name: '에이다 (ADA)', upbit: 'KRW-ADA', binance: 'ADAUSDT' },
];

function App() {
  const [selectedCoin, setSelectedCoin] = useState(COIN_LIST[0]);
  const [domesticPrice, setDomesticPrice] = useState(0); 
  const [foreignPrice, setForeignPrice] = useState(0);   
  const [exchangeRate, setExchangeRate] = useState(0);   
  const [loading, setLoading] = useState(true);

  const fetchMarketData = async (coin) => {
    try {
      const [upbitRes, binanceRes, exchangeRes] = await Promise.all([
        fetch(`https://api.upbit.com/v1/ticker?markets=${coin.upbit}`),
        fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${coin.binance}`),
        fetch('https://open.er-api.com/v6/latest/USD')
      ]);

      const upbitData = await upbitRes.json();
      const binanceData = await binanceRes.json();
      const exchangeData = await exchangeRes.json();

      setDomesticPrice(upbitData[0].trade_price);
      setForeignPrice(parseFloat(binanceData.price));
      setExchangeRate(exchangeData.rates.KRW);
      setLoading(false);
    } catch (error) {
      console.error("API 동기화 에러:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMarketData(selectedCoin);
    const interval = setInterval(() => { fetchMarketData(selectedCoin); }, 3000);
    return () => clearInterval(interval);
  }, [selectedCoin]);

  const handleCoinChange = (e) => {
    const target = COIN_LIST.find(coin => coin.id === e.target.value);
    if (target) setSelectedCoin(target);
  };

  const convertedForeignPrice = foreignPrice * exchangeRate;
  const kimchiPremium = convertedForeignPrice > 0 
    ? ((domesticPrice - convertedForeignPrice) / convertedForeignPrice) * 100 
    : 0;

  return (
    <div className="p-6 max-w-md mx-auto min-h-screen flex flex-col justify-center bg-white text-gray-900">
      {/* 헤더 구획 */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-xl font-bold text-blue-600 tracking-wide">
          FX-KIMCHI-PREMIUM-CALC
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          실시간 자산 프리미엄 타게팅 엔진 (화이트 테마)
        </p>
      </div>

      {/* 셀렉트 박스 구획 */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          타겟 자산 선택
        </label>
        <select
          value={selectedCoin.id}
          onChange={handleCoinChange}
          className="w-full bg-gray-50 border border-gray-300 rounded p-3 text-gray-900 focus:outline-none focus:border-blue-500 text-sm font-medium cursor-pointer"
        >
          {COIN_LIST.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-sm text-gray-400 py-12 font-mono">
          {selectedCoin.id} 데이터 동기화 중...
        </div>
      ) : (
        <div className="space-y-4">
          {/* 국내 시세 */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Upbit 국내 시세
            </span>
            <span className="text-lg font-mono font-bold text-gray-900">
              {domesticPrice.toLocaleString()} 원
            </span>
          </div>

          {/* 해외 시세 */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Binance 해외 시세
            </span>
            <span className="text-lg font-mono font-bold text-gray-900">
              ${foreignPrice.toLocaleString(undefined, { minimumFractionDigits: selectedCoin.id === 'BTC' || selectedCoin.id === 'ETH' ? 2 : 4 })}
            </span>
          </div>

          {/* 환율 */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded flex justify-between items-center">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              LIVE FX 환율
            </span>
            <span className="text-lg font-mono font-bold text-blue-600">
              {exchangeRate.toFixed(2)} 원
            </span>
          </div>

          {/* 프리미엄 결과창 */}
          <div className="mt-6 p-5 rounded bg-blue-50 border border-blue-100">
            <div className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-2">
              {selectedCoin.id} 실시간 프리미엄
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-blue-900">김치 프리미엄</span>
              <span className={`text-3xl font-mono font-bold ${kimchiPremium >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                {kimchiPremium.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;