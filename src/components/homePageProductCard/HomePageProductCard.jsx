import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import useCart from "../../hooks/useCart";

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const {loading, getAllProduct, user} = context;
  const { cart, addToCart, deleteItem } = useCart(user);

  return (
    <div  className="container mx-auto px-5 mt-10">
      {/* Heading */}
      <h1 className="mb-5 text-2xl font-semibold text-[#543A14]">OUR PRODUCT</h1>

      {/* Product grid */}
      <section className="text-[#543A14] body-font">
        <div className="container pb-5 mx-auto">
          <div>{loading && <Loader/>}</div>
          <div className="grid gap-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {getAllProduct.filter(item => !item.status).map((item, index) => {
              const { id, images, title, price, actualPrice, quantity, description } = item;

              return (
                <div key={index} className="w-64 bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden">
                  {/* Gambar produk */}
                  <div className="h-32 bg-[#D9D9D9] flex items-center justify-center overflow-hidden">
                    <img
                    onClick={()=> navigate(`/productinfo/${id}`)}
                    src={images[0]} 
                    alt={title} 
                    className="h-full w-full object-cover cursor-pointer" />
                  </div>

                  {/* Isi produk */}
                  <div className="p-4">
                    <h3 className="font-bold text-sm mb-1">{title.substring(0, 25)}</h3>
                    <p className="text-sm text-[#000000] mb-1 line-through">Rp{price}</p>
                    <p className="text-[#F0BB78] font-semibold mb-2">Rp{actualPrice}</p>

                    {/* Tombol */}
                    <button onClick={() => addToCart(item.id)} 
                    className="bg-[#F0BB78] text-[#FFFFFF] hover:bg-[#F0BB78] w-full rounded-lg py-2 text-sm font-medium"
                    >Add to Cart</button>

                    {cart[item.id] > 0 && (
                      <button onClick={() => deleteItem(item.id)} 
                      className="bg-[#F0BB78] text-[#FFFFFF] hover:bg-[#F0BB78] w-full rounded-lg py-2 text-sm font-medium mt-2"
                      >Remove From Cart</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
