import { Timestamp, addDoc, collection, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";

const categoryList = [
    {
        name: 'bolu'
    },
    {
        name: 'chiffon'
    },
    {
        name: 'mandarin'
    }
]

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        actualPrice: "",
        images: [],
        category: categoryList[0].name,
        description: "",
        // quantity : 1,
    });


    // Add Product Function
    const addProductFunction = async () => {
        if (product.title == "" || product.price == "" || product.actualPrice == "" || product.category == "" || product.description == "") {
            return toast.error("all fields are required")
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'data', 'stock', 'products');
            const docRef = await addDoc(productRef, product);
            await updateDoc(docRef, {
                id: docRef.id
            });
            toast.success("Add product successfully");
            navigate('/admin-dashboard')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Add product failed");
        }

    }
    return (
        <div className="bg-[#FFF0DC]">
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                {/* Login Form  */}
                <div className="login_Form bg-[#FFFFFF] px-8 py-6 border rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-[#543A14] '>
                            Add Product
                        </h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value
                                })
                            }}
                            placeholder='Product Title'
                            className='bg-[#FFFFFF] border text-[#543A14] border-[#000000] px-2 py-2 w-96 rounded-md outline-none placeholder-[#D9D9D9]'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    price: e.target.value
                                })
                            }}
                            placeholder='Product Price'
                            className='bg-[#FFFFFF] border text-[#543A14] border-[#000000] px-2 py-2 w-96 rounded-md outline-none placeholder-[#D9D9D9]'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="actualPrice"
                            value={product.actualPrice}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    actualPrice: e.target.value
                                })
                            }}
                            placeholder='Product Actual Price'
                            className='bg-[#FFFFFF] border text-[#543A14] border-[#000000] px-2 py-2 w-96 rounded-md outline-none placeholder-[#D9D9D9]'
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="images"
                            value={product.images.join(", ")}
                            onChange={(e) => {
                                const urls = e.target.value.split(',').map(url => url.trim());
                                setProduct({
                                    ...product,
                                    images: urls
                                })
                            }}
                            placeholder='Image URLs (comma separated)'
                            className='bg-[#FFFFFF] border text-[#543A14] border-[#000000] px-2 py-2 w-96 rounded-md outline-none placeholder-[#D9D9D9]'
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value
                                })
                            }}
                            className="w-full px-1 py-2 text-[#543A14] bg-[#FFFFFF] border border-[#000000] rounded-md outline-none  ">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    description: e.target.value
                                })
                            }} name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-[#543A14] bg-[#FFFFFF] border border-[#000000] rounded-md outline-none placeholder-[#D9D9D9] ">

                        </textarea>
                    </div>

                    {/* Add Product Button  */}
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-[#543A14] hover:bg-brown-600 w-full text-white text-center py-2 font-bold rounded-md '
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductPage;