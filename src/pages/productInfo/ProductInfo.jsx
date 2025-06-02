import Layout from "../../components/layout/Layout";
import { FiShoppingCart } from "react-icons/fi";

const ProductInfo = () => {
  return (
    <Layout>
      <section className="py-10 font-poppins">
        <div className="max-w-6xl px-6 mx-auto">
          <div className="bg-[#FFFFFF] rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-10">
            {/* Gambar Produk */}
            <div className="flex-shrink-0 w-full md:w-1/3 h-auto">
              <div className="bg-[#D9D9D9] rounded-xl overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dvu5pzwte/image/upload/v1748345669/WhatsApp_Image_2025-05-27_at_18.32.38_ca3be61a_shjkgm.jpg"
                  alt="Product"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Info Produk */}
            <div className="flex-1 text-[#543A14]">
              <h2 className="text-xl font-semibold mb-2">Product 3</h2>
              <p className="text-sm mb-1">Stock : <span className="font-medium">4</span></p>
              <p className="text-[#F0BB78] text-lg font-bold mb-4">Rp100.000</p>

              <h3 className="text-[#8E8E93] font-semibold text-sm mb-1">Description :</h3>
              <p className="text-sm text-[#000000] leading-relaxed mb-6">
                this is bread that we have, please buy hehe<br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...
              </p>

              <button className="bg-[#F0BB78] hover:bg-[#F0BB78] text-white px-6 py-2 rounded-md text-sm flex items-center justify-center gap-2 w-fit">
                <FiShoppingCart className="inline-block mr-1 text-sm" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductInfo;
