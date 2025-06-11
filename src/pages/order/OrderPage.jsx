import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaUser } from "react-icons/fa";
import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const OrderPage = () => {

  const user = JSON.parse(localStorage.getItem('users'));
  const context = useContext(myContext);
  const { loading, getAllOrder, getAllProduct } = context;

  const userOrders = getAllOrder.filter(order => order.userId === user?.uid);

  const getOrderProducts = (items) => {
    if (!items || typeof items !== 'object') return [];

    return Object.entries(items).map(([productId, quantity]) => {
      const product = getAllProduct.find(p => p.id === productId);
      return product ? { ...product, quantity } : null;
    }).filter(Boolean);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 bg-[#FFF0DC] min-h-screen">

        {/* Optional: Order Section */}
        {/* Jika ingin tetap menampilkan Order seperti sebelumnya, bisa ditambahkan di bawah */}
        {userOrders.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Order Details</h2>

            {userOrders.map((order) => {
              const orderProducts = getOrderProducts(order.items);

              return (
                <div key={order.id} className="mt-5 border rounded-lg p-4 bg-[#F0BB78] shadow-sm">
                  {/* Order Header */}
                  <div className="bg-[#543A14] p-4 rounded">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm font-semibold text-white">Order id</div>
                        <div className="text-sm font-medium text-white">
                          {order.id || "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Date</div>
                        <div className="text-sm font-medium text-white">
                          {order.createdAt?.seconds
                            ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Total</div>
                        <div className="text-sm font-medium text-white">
                          Rp {order.total?.toLocaleString('id-ID') || "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Status</div>
                        <div className="text-sm font-medium text-white capitalize">
                          {order.status || "processing"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ordered Products */}
                  {/* Produk di dalam order */}
                  <div className="mt-4 space-y-2">
                    <div className="mt-4 space-y-2">
                      {orderProducts.sort((a, b) => (b.actualPrice * b.quantity) - (a.actualPrice * a.quantity)).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 border rounded-lg bg-gray-50">
                          {/* Gambar produk */}
                          <div className="flex items-center space-x-3">
                            <img src={item.images[0]} alt={item.title} className="w-12 h-12 object-cover rounded" />
                            <div>
                              <div className="font-semibold text-sm">{item.title}</div>
                              <div className="text-xs text-gray-600">x{item.quantity}</div>
                            </div>
                          </div>
                          
                          {/* Subtotal harga */}
                          <div className="text-sm font-medium text-gray-800">
                            Rp {(item.actualPrice * item.quantity).toLocaleString('id-ID')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderPage;
