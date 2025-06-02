import Layout from "../../components/layout/Layout";

const ProductInfo = () => {
  return (
    <Layout>
      <section className="py-10 font-poppins bg-[#fff9f2]">
        <div className="max-w-6xl px-6 mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-10">
            {/* Gambar Produk */}
            <div className="flex-shrink-0 w-full md:w-1/3 h-auto">
              <div className="bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg"
                  alt="Product"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Info Produk */}
            <div className="flex-1 text-[#3b2f1d]">
              <h2 className="text-xl font-semibold mb-2">Product 3</h2>
              <p className="text-sm mb-1">Stock : <span className="font-medium">4</span></p>
              <p className="text-[#e7a94b] text-lg font-bold mb-4">Rp100.000</p>

              <h3 className="text-gray-500 font-semibold text-sm mb-1">Description :</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                this is bread that we have, please buy hehe<br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...
              </p>

              <button className="bg-[#f5c389] hover:bg-[#e4b374] text-white px-6 py-2 rounded-md text-sm flex items-center justify-center gap-2 w-fit">
                <span className="text-xs">🛒</span> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductInfo;
