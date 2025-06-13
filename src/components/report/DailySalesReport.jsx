import { useState } from "react";

const DailySalesReport = ({ orders }) => {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));

  const dailyTotals = {};

  orders
    .filter(order => order.status === "selesai" && order.createdAt?.seconds)
    .forEach(order => {
      const orderDateStr = new Date(order.createdAt.seconds * 1000).toISOString().slice(0, 10);
      if (orderDateStr === selectedDate) {
        dailyTotals[orderDateStr] = (dailyTotals[orderDateStr] || 0) + order.total;
      }
    });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">Penjualan Harian</h3>
      
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Pilih Tanggal</label>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {Object.keys(dailyTotals).length === 0 ? (
        <p className="text-gray-500">Tidak ada penjualan pada tanggal ini.</p>
      ) : (
        <ul className="bg-white p-4 rounded shadow">
          {Object.entries(dailyTotals).map(([date, total]) => (
            <li key={date} className="flex justify-between border-b py-1">
              <span>{date}</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DailySalesReport;