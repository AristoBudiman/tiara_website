import { useState } from "react";

const UserGrowth = ({ users }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().toISOString().slice(0, 7));

  const monthlyCounts = {};

  users
    .filter(user => user.date) // pastikan field date ada
    .forEach(user => {
      const date = new Date(user.date);
      if (!isNaN(date)) {
        const userMonthStr = date.toISOString().slice(0, 7); // format YYYY-MM

        if (userMonthStr === selectedMonth) {
          const monthLabel = `${date.toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          })}`;
          monthlyCounts[monthLabel] = (monthlyCounts[monthLabel] || 0) + 1;
        }
      }
    });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">Pertumbuhan User Bulanan</h3>

      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Pilih Bulan</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {Object.keys(monthlyCounts).length === 0 ? (
        <p className="text-gray-500">Tidak ada user baru pada bulan ini.</p>
      ) : (
        <ul className="bg-white p-4 rounded shadow">
          {Object.entries(monthlyCounts).map(([month, count]) => (
            <li key={month} className="flex justify-between border-b py-1">
              <span>{month}</span>
              <span>{count} user</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserGrowth;
