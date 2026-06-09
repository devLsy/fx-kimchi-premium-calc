import React, { useState } from 'react';
import { useMarketData } from './hooks/useMarketData';
import { PremiumCard } from './components/PremiumCard';
import { PriceCard } from './components/PriceCard'; 
import { Header } from './components/Header'; 
import { CoinSelector } from './components/CoinSelector'; 
import { AddCoinForm } from './components/AddCoinForm'; 

const COIN_LIST = [
  { id: 'BTC', name: '비트코인 (BTC)', upbit: 'KRW-BTC', binance: 'BTCUSDT' },
  { id: 'ETH', name: '이더리움 (ETH)', upbit: 'KRW-ETH', binance: 'ETHUSDT' },
  { id: 'DOGE', name: '도지코인 (DOGE)', upbit: 'KRW-DOGE', binance: 'DOGEUSDT' },
  { id: 'ADA', name: '에이다 (ADA)', upbit: 'KRW-ADA', binance: 'ADAUSDT' },
  { id: 'SOL', name: '솔라나 (SOL)', upbit: 'KRW-SOL', binance: 'SOLUSDT' },
  { id: 'XRP', name: '리플 (XRP)', upbit: 'KRW-XRP', binance: 'XRPUSDT' },
];

function App() {
  const [selectedCoin, setSelectedCoin] = useState(COIN_LIST[0]);
  const { domesticPrice, foreignPrice, exchangeRate, loading } = useMarketData(selectedCoin);

  const convertedForeignPrice = foreignPrice * exchangeRate;
  const kimchiPremium = convertedForeignPrice > 0 
    ? ((domesticPrice - convertedForeignPrice) / convertedForeignPrice) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 font-sans">
      <div className="max-w-md mx-auto">
        <Header />
        <CoinSelector selected={selectedCoin} onChange={setSelectedCoin} list={COIN_LIST} />
        {loading ? (
          <div className="animate-pulse text-slate-600 text-center py-20 font-mono text-sm tracking-widest">
            SYNCING LIVE DATA...
          </div>
        ) : (
          <div className="space-y-6">
            <PremiumCard rate={kimchiPremium} />    
            <div className="grid grid-cols-2 gap-4">
              <PriceCard title="UPBIT (KRW)" value={domesticPrice} />
              <PriceCard title="BINANCE (USDT)" value={foreignPrice} isCurrency />
            </div>
            <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-800/50 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Live FX Rate</span>
              <span className="font-mono text-blue-400 font-bold">{exchangeRate.toFixed(2)} KRW</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;