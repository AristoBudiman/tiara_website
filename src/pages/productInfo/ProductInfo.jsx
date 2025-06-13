import Layout from "../../components/layout/Layout";
import { FiShoppingCart } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import useCart from "../../hooks/useCart";

const ProductInfo = () => {

  const context = useContext(myContext);
  const { loading, setLoading, user } = context;

  const [product, setProduct] = useState(null)

  const { id } = useParams()

  const { cart, addToCart, deleteItem } = useCart(user);

  const getProductData = async () => {
      setLoading(true)
      try {
          const productTemp = await getDoc(doc(fireDB, 'data', 'stock', 'products', id))
          setProduct(productTemp.data());
          setLoading(false)
      } catch (error) {
          console.log(error)
          setLoading(false)
      }
  }

  useEffect(() => {
      getProductData()
  }, [])

  return (
    <Layout>
      <section className="py-10 font-poppins">
        {loading ?
          <>
            <div className="">
              <Loader/>
            </div>
          </>
          :
          <>
            <div className="max-w-6xl px-6 mx-auto">
              <div className="bg-[#FFFFFF] rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-10">
                {/* Gambar Produk */}
                <div className="flex-shrink-0 w-full md:w-1/3 h-auto">
                  <div className="bg-[#D9D9D9] rounded-xl overflow-hidden">
                    <img
                      src={product?.images[0]}
                      alt="Product"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Info Produk */}
                <div className="flex-1 text-[#543A14]">
                  <h2 className="text-xl font-semibold mb-2">{product?.title}</h2>
                  <p className="text-[#F0BB78] text-lg font-bold mb-4">Rp{product?.actualPrice}</p>

                  <h3 className="text-[#8E8E93] font-semibold text-sm mb-1">Description :</h3>
                  <p className="text-sm text-[#000000] leading-relaxed mb-6">
                    {product?.description}
                  </p>

                  {/* Tombol */}
                  <button onClick={() => addToCart(id)} 
                  className="bg-[#F0BB78] text-[#FFFFFF] hover:bg-[#F0BB78] w-full rounded-lg py-2 text-sm font-medium"
                  >Add to Cart</button>

                  {cart[id] > 0 && (
                    <button onClick={() => deleteItem(id)} 
                    className="bg-[#F0BB78] text-[#FFFFFF] hover:bg-[#F0BB78] w-full rounded-lg py-2 text-sm font-medium mt-2"
                    >Remove From Cart</button>
                  )}
                </div>
              </div>
            </div>
          </>
        }
      </section>
    </Layout>
  );
};

export default ProductInfo;
