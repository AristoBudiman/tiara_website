import Layout from "../../components/layout/Layout";
import { FiTrash2 } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100000,
    imageSrc: "https://via.placeholder.com/80",
  },
  {
    id: 2,
    name: "Product 2",
    price: 100000,
    quantity: 2,
    imageSrc: "https://via.placeholder.com/80",
  },
];

const CartPage = () => {
  return (
    <Layout>
      <div className="min-h-screen py-6 px-4">
        <h1 className="text-lg font-bold text-[#543A14] mb-4">YOUR SHOPPING CART</h1>

        {/* Product List */}
        <div className="bg-[#FFFFFF] rounded-lg shadow-md p-4 mb-6">
          {products.map((product) => (
            <div key={product.id} className="border-b border-gray-200 pb-4 mb-4 last:border-none last:mb-0">
              <div className="flex items-center space-x-4">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="w-16 h-16 rounded-md bg-gray-200 object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold text-sm">{product.name}</p>
                  <p className="text-sm text-[#F0BB78]">Rp100.000</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="w-6 h-6 flex items-center justify-center rounded-full border text-sm">−</button>
                  <span className="text-sm">{product.quantity || 1}</span>
                  <button className="w-6 h-6 flex items-center justify-center rounded-full border text-sm">+</button>
                </div>
                <div className="ml-4 text-right">
                  <p className="font-bold text-sm">Rp{(product.price * (product.quantity || 1)).toLocaleString("id-ID")}</p>
                  <button className="flex items-center text-red-500 text-xs mt-1">
                    <FiTrash2 size={12} className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-bold text-[#543A14] text-md mb-4">Order Summary</h2>
          <div className="text-sm text-[#8E8E93] space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp300.000</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>Rp30.000</span>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between font-bold text-base">
              <span className="text-[#543A14]">Total</span>
              <span className="text-[#F0BB78]">Rp330.000</span>
            </div>
          </div>
          <button className="w-full bg-[#F0BB78] text-white font-semibold py-2 rounded-md hover:bg-[#f1a94c] transition">
            Check Out →
          </button>
          <p className="text-center text-[#F0BB78] text-sm font-semibold mt-3">Back to Dashboard</p>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
