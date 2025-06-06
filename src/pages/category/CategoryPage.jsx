import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const CategoryPage = () => {

    const { categoryname } = useParams();
    const lowerCategoryName = categoryname.toLowerCase();
    const navigate = useNavigate();
    const context = useContext(myContext);
    const {loading, getAllProduct} = context;
    const filterProduct = getAllProduct.filter((obj) => 
        obj.category.toLowerCase().includes(lowerCategoryName)
    );
    return (
        <Layout>
            <div className="py-8">
                    {/* Heading */}
                    <h1 className="mb-5 text-center text-2xl font-semibold text-[#543A14]">{categoryname}</h1>

                    {loading ?

                        <div className="flex justify-center">
                            <Loader />
                        </div>

                        :

                        <section className="text-gray-600 body-font">
                            {/* main 2 */}
                            <div className="container px-5 py-5 mx-auto">
                                {/* main 3  */}
                                <div className="flex flex-wrap -m-4 justify-center">
                                    {filterProduct.length > 0 ?
                                        <>
                                            {filterProduct.map((item, index) => {
                                                const { id, images, title, price, actualPrice, quantity, description } = item;
                                                return (
                                                    <div key={index} className="w-64 m-4 bg-[#FFFFFF] rounded-xl shadow-md overflow-hidden">
                                                    {/* Gambar produk */}
                                                    <div className="h-32 bg-[#D9D9D9] overflow-hidden">
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
                                        </>

                                        :

                                        <div>
                                            {/* <div className="flex justify-center">
                                                <img className=" mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                            </div> */}
                                            <h1 className=" text-black text-xl">No {categoryname} product found</h1>
                                        </div>
                                    }
                                </div>
                            </div>
                        </section>
                    }
            </div>
        </Layout>
    );
}

export default CategoryPage;