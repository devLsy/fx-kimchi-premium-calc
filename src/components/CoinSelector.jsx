export const CoinSelector = ({ selected, onChange, list }) => (
  <div className="relative w-full mb-6">
    <select
      value={selected.id}
      onChange={(e) => onChange(list.find(c => c.id === e.target.value))}
      className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-4 font-bold outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-lg appearance-none"
    >
      {list.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
      ▼
    </div>
  </div>
);