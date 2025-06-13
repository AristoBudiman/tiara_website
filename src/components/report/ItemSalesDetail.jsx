import { useState } from "react";

const ItemSalesDetail = ({ orders, allProducts }) => {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().toISOString().slice(0, 7));

  const itemSalesDaily = {};
  const itemSalesMonthly = {};

  orders
    .filter(order => order.status === "selesai" && order.createdAt?.seconds)
    .forEach(order => {
      const createdAt = new Date(order.createdAt.seconds * 1000);
      const orderDateStr = createdAt.toISOString().slice(0, 10);
      const orderMonthStr = createdAt.toISOString().slice(0, 7);

      Object.entries(order.items || {}).forEach(([productId, qty]) => {
        const product = allProducts.find(p => p.id === productId);
        const quantity = typeof qty === "number" ? qty : Number(qty) || 0;
        if (!product) return;

        if (orderMonthStr === selectedMonth) {
          itemSalesMonthly[product.title] = (itemSalesMonthly[product.title] || 0) + quantity;
        }

        if (orderDateStr === selectedDate) {
          itemSalesDaily[product.title] = (itemSalesDaily[product.title] || 0) + quantity;
        }
      });
    });

  const renderList = (title, data, inputComponent) => (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      {inputComponent}
      {Object.keys(data).length === 0 ? (
        <p className="text-gray-500 mt-2">Belum ada produk terjual.</p>
      ) : (
        <ul className="bg-white p-4 rounded shadow mt-2">
          {Object.entries(data).map(([name, qty]) => (
            <li key={name} className="flex justify-between border-b py-1">
              <span>{name}</span>
              <span>{qty} pcs</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div>
      {renderList(
        "Produk Terjual Harian",
        itemSalesDaily,
        <div>
          <label className="block text-sm font-medium text-gray-700">Pilih Tanggal</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      )}
      {renderList(
        "Produk Terjual Bulanan",
        itemSalesMonthly,
        <div>
          <label className="block text-sm font-medium text-gray-700">Pilih Bulan</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ItemSalesDetail;
