import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const productData = [
  {
    id: 1,
    image: 'https://i.pinimg.com/736x/98/af/b1/98afb1b84db5ca44cd1049a493447b19.jpg',
    title: 'Product 1',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    price: 100,
    trendingProductName: 'Featured',
    quantity: 4,
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/736x/98/af/b1/98afb1b84db5ca44cd1049a493447b19.jpg',
    title: 'Product 2',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    price: 100,
    trendingProductName: 'Featured',
    quantity: 4,
  },
  {
    id: 3,
    image: 'https://i.pinimg.com/736x/98/af/b1/98afb1b84db5ca44cd1049a493447b19.jpg',
    title: 'Product 3',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    price: 100,
    trendingProductName: 'Featured',
    quantity: 0,
  },
  {
    id: 4,
    image: 'https://i.pinimg.com/736x/98/af/b1/98afb1b84db5ca44cd1049a493447b19.jpg',
    title: 'Product 4',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    price: 100,
    trendingProductName: 'Featured',
    quantity: 3,
  },
  {
    id: 5,
    image: 'https://i.pinimg.com/736x/98/af/b1/98afb1b84db5ca44cd1049a493447b19.jpg',
    title: 'Product 5',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    price: 100,
    trendingProductName: 'Featured',
    quantity: 3,
  }
];

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const {loading, getAllProduct} = context;

  return (
    <div  className="container mx-auto px-5 mt-10">
      {/* Heading */}
      <h1 className="mb-5 text-2xl font-semibold text-[#543A14]">OUR PRODUCT</h1>

      {/* Product grid */}
      <section className="text-[#543A14] body-font">
        <div className="container pb-5 mx-auto">
          <div>{loading && <Loader/>}</div>
          <div className="flex flex-wrap gap-6 justify-between gap-y-6">
            {getAllProduct.map((item, index) => {
              const { id, images, title, price, actualPrice, quantity, description } = item;

              return (
                <div key={index} className="w-64 bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden">
                  {/* Gambar produk */}
                  <div className="h-32 bg-[#D9D9D9] overflow-hidden">
                    <img
                    onClick={()=> navigate('/productinfo')}
                    src={images[0]} 
                    alt={title} 
                    className="h-full w-full object-cover cursor-pointer" />
                  </div>

                  {/* Isi produk */}
                  <div className="p-4">
                    <h3 className="font-bold text-sm mb-1">{title.substring(0, 25)}</h3>
                    <p className="text-sm text-[#000000] mb-1 line-through">Rp{price}</p>
                    <p className="text-[#F0BB78] font-semibold mb-2">Rp{actualPrice}</p>
                    <p className="text-sm text-[#000000] mb-4">{description}</p>

                    {/* Tombol */}
                    <button
                      className={`w-full rounded-lg py-2 text-sm font-medium ${
                        quantity === 0
                          ? 'bg-[#D9D9D9] text-[#543A14] cursor-not-allowed'
                          : 'bg-[#F0BB78] text-[#FFFFFF] hover:bg-[#F0BB78]'
                      }`}
                      disabled={quantity === 0}
                    >
                      {quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
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
