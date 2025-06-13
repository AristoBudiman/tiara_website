import { useState } from "react";

const MonthlySalesReport = ({ orders }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().toISOString().slice(0, 7));

  const monthlyTotals = {};

  orders
    .filter(order => order.status === "selesai" && order.createdAt?.seconds)
    .forEach(order => {
      const orderDate = new Date(order.createdAt.seconds * 1000);
      const orderMonthStr = orderDate.toISOString().slice(0, 7);
      if (orderMonthStr === selectedMonth) {
        const month = `${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;
        monthlyTotals[month] = (monthlyTotals[month] || 0) + order.total;
      }
    });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">Penjualan Bulanan</h3>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Pilih Bulan</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {Object.keys(monthlyTotals).length === 0 ? (
        <p className="text-gray-500">Tidak ada penjualan pada bulan ini.</p>
      ) : (
        <ul className="bg-white p-4 rounded shadow">
          {Object.entries(monthlyTotals).map(([month, total]) => (
            <li key={month} className="flex justify-between border-b py-1">
              <span>{month}</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MonthlySalesReport;
