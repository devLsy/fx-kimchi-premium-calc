export const CoinSelector = ({ selected, onChange, list }) => (
  <select
    value={selected.id}
    onChange={(e) => onChange(list.find(c => c.id === e.target.value))}
    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-4 mb-6 font-bold outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-lg"
  >
    {list.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
  </select>
);