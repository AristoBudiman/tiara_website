import { useNavigate } from "react-router-dom";

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
  return (
    <div  className="container mx-auto px-5 mt-10">
      {/* Heading */}
      <h1 className="mb-5 text-2xl font-semibold text-[#3b2f1d]">OUR PRODUCT</h1>

      {/* Product grid */}
      <section className="text-gray-600 body-font">
        <div className="container pb-5 mx-auto">
          <div className="flex flex-wrap gap-6 justify-between gap-y-6">
            {productData.map((item, index) => {
              const { image, title, price, quantity } = item;

              return (
                <div key={index} className="w-64 bg-white rounded-xl shadow-md overflow-hidden">
                  {/* Gambar produk */}
                  <div className="h-32 bg-gray-200 overflow-hidden">
                    <img
                    onClick={()=> navigate('/productinfo')}
                    src={image} 
                    alt={title} 
                    className="h-full w-full object-cover cursor-pointer" />
                  </div>

                  {/* Isi produk */}
                  <div className="p-4">
                    <h3 className="font-bold text-sm mb-1">{title.substring(0, 25)}</h3>
                    <p className="text-sm text-gray-600 mb-1">Stock: {quantity}</p>
                    <p className="text-[#e7a94b] font-semibold mb-2">Rp{price}.000</p>
                    <p className="text-sm text-gray-700 mb-4">this is bread that we have, please buy hehe</p>

                    {/* Tombol */}
                    <button
                      className={`w-full rounded-lg py-2 text-sm font-medium ${
                        quantity === 0
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-[#f5c389] text-white hover:bg-[#e4b374]'
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
