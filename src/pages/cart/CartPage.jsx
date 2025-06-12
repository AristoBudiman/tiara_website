import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../../components/layout/Layout";
import { FiTrash2 } from "react-icons/fi";
import useCart from "../../hooks/useCart";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const DELIVERY_FEE = 30000;
const DISCOUNT = 20000;
const TAX_RATE = 0.11;

const CartPage = () => {
  const { cart, addToCart, removeFromCart, deleteItem, checkout, checkoutWithSnap} = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [userData, setUserData] = useState(null); 
  const auth = getAuth(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(fireDB, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  const isUserInfoComplete = userData?.address && userData?.phone;

  // Ambil detail produk dari cart
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productIds = Object.keys(cart);
        if (productIds.length === 0) {
          setProducts([]);
          return;
        }

        const productQuery = query(
          collection(fireDB, "data", "stock", "products"),
          where("id", "in", productIds)
        );
        const snapshot = await getDocs(productQuery);
        const productList = snapshot.docs.map((doc) => doc.data());
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cart]);

  const calculateSubtotal = () =>
    products.reduce((total, product) => {
      const qty = cart[product.id] || 1;
      const price = Number(product.actualPrice?.replace(/[^\d]/g, "")) || 0;
      return total + price * qty;
    }, 0);

  const subtotal = calculateSubtotal();
  const tax = Math.floor(subtotal * TAX_RATE);
  const total = subtotal + tax + DELIVERY_FEE - DISCOUNT;

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-10">Loading...</div>
      </Layout>
    );
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await checkoutWithSnap(total);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-6 px-4">
        <h1 className="text-lg font-bold text-[#543A14] mb-4">YOUR SHOPPING CART</h1>

        <div className="bg-[#FFFFFF] rounded-lg shadow-md p-4 mb-6">
          {products.length === 0 && (
            <p className="text-sm text-gray-500 text-center">Cart is empty.</p>
          )}
          {products.map((product) => {
            const qty = cart[product.id] || 1;
            const price = Number(product.actualPrice?.replace(/[^\d]/g, "")) || 0;
            const subtotal = price * qty;

            return (
              <div key={product.id} className="border-b border-gray-200 pb-4 mb-4 last:border-none last:mb-0">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.images?.[0] || "https://via.placeholder.com/80"}
                    alt={product.title}
                    className="w-16 h-16 rounded-md bg-gray-200 object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{product.title}</p>
                    <p className="text-sm text-[#F0BB78]">
                      Rp{price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-6 h-6 flex items-center justify-center rounded-full border text-sm"
                    >
                      −
                    </button>
                    <span className="text-sm">{qty}</span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-6 h-6 flex items-center justify-center rounded-full border text-sm"
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-bold text-sm">
                      Rp{subtotal.toLocaleString("id-ID")}
                    </p>
                    <button
                      onClick={() => deleteItem(product.id)}
                      className="flex items-center text-red-500 text-xs mt-1"
                    >
                      <FiTrash2 size={12} className="mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="font-bold text-[#543A14] text-md mb-4">Order Summary</h2>
          <div className="text-sm text-[#8E8E93] space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp{subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span>Rp{tax.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-red-500">− Rp{DISCOUNT.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>Rp{DELIVERY_FEE.toLocaleString("id-ID")}</span>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between font-bold text-base">
              <span className="text-[#543A14]">Total</span>
              <span className="text-[#F0BB78]">
                Rp{total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={products.length === 0 || isCheckingOut}
            className={`w-full bg-[#F0BB78] text-white font-semibold py-2 rounded-md hover:bg-[#f1a94c] transition ${
              (products.length === 0 || isCheckingOut || !isUserInfoComplete) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isCheckingOut ? 'Processing...' : 'Check Out →'}
            {!isUserInfoComplete && (
              <p className="text-red-500 text-xs mt-2">
                Lengkapi alamat dan nomor telepon Anda terlebih dahulu di halaman profil.
              </p>
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;