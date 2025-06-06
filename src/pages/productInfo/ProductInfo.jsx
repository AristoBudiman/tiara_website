import Layout from "../../components/layout/Layout";
import { FiShoppingCart } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const ProductInfo = () => {

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState(null)

  const { id } = useParams()

  // console.log(product)

  // getProductData
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
                  {/* <p className="text-sm mb-1">Stock : <span className="font-medium">4</span></p> */}
                  <p className="text-[#F0BB78] text-lg font-bold mb-4">Rp{product?.actualPrice}</p>

                  <h3 className="text-[#8E8E93] font-semibold text-sm mb-1">Description :</h3>
                  <p className="text-sm text-[#000000] leading-relaxed mb-6">
                    {product?.description}
                  </p>

                  <button className="bg-[#F0BB78] hover:bg-[#F0BB78] text-white px-6 py-2 rounded-md text-sm flex items-center justify-center gap-2 w-fit">
                    <FiShoppingCart className="inline-block mr-1 text-sm" /> Add to Cart
                  </button>
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
