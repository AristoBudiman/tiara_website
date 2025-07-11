import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { updateDoc, doc, deleteField } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    const navigate = useNavigate();
    
    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await updateDoc(doc(fireDB, 'data', 'stock', 'products', id), {
                status: 'deleted',
            });
            toast.success('Product marked as deleted');
            getAllProductFunction();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const upProduct = async (id) => {
        setLoading(true);
        try {
            await updateDoc(doc(fireDB, 'data', 'stock', 'products', id), {
                status: deleteField(), 
            });
            toast.success('Status field removed from product');
            getAllProductFunction();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-[#543A14] font-bold">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/addproduct'}>
                    <button className="text-[#543A14] px-5 py-2 bg-[#F0BB78] border rounded-lg">Add Product</button>
                </Link>
            </div>

            {/* Loading  */}
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">

                <table className="w-full text-left border border-collapse sm:border-separate border-brown-100 text-[#543A14]" >

                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100 font-bold fontPara">Index</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Actual Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {getAllProduct.filter(item => !item.status).map((item, index) => {
                            const { id, title, price, actualPrice, category, images} = item;
                            return (
                                <tr key={index} className="text-[#543A14]">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 ">
                                        {index + 1}.
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        <div className="flex justify-center">
                                            <img className="w-20 " src={images[0]} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {title}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        Rp{price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        Rp{actualPrice}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {category}
                                    </td>
                                    <td 
                                    onClick={()=>navigate(`/updateproduct/${id}`)}
                                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                        Edit
                                    </td>
                                    <td 
                                    onClick={()=>deleteProduct(id)}
                                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                        Safe Delete
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-[#543A14] font-bold">Deleted Product</h1>
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">

                <table className="w-full text-left border border-collapse sm:border-separate border-brown-100 text-[#543A14]" >

                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100 font-bold fontPara">Index</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Actual Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-brown-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {getAllProduct.filter(item => item.status).map((item, index) => {
                            const { id, title, price, actualPrice, category, images} = item;
                            return (
                                <tr key={index} className="text-[#543A14]">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 ">
                                        {index + 1}.
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        <div className="flex justify-center">
                                            <img className="w-20 " src={images[0]} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {title}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        Rp{price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        Rp{actualPrice}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {category}
                                    </td>
                                    <td 
                                    onClick={()=>navigate(`/updateproduct/${id}`)}
                                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                        Edit
                                    </td>
                                    <td 
                                    onClick={()=>upProduct(id)}
                                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-brown-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                        Up
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;