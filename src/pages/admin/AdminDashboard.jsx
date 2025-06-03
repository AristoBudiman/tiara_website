import { useContext, useState } from 'react';
import ProductDetail from '../../components/admin/ProductDetail';
import UserDetail from '../../components/admin/UserDetail';
import logo from "../../assets/logo.png"; 
import myContext from '../../context/myContext';
import { FiShoppingBag } from "react-icons/fi";      // Feather icon
import { FaListOl, FaUsers } from "react-icons/fa";  // Font Awesome icons


const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { getAllProduct } = context;

    const [activeTab, setActiveTab] = useState("products");

    return (
        <div className='bg-[#FFF0DC]'>
            {/* Top Navbar */}
            <nav className="bg-[#543A14] text-white px-6 flex items-center justify-between shadow-md sticky top-0 z-50">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-20" />
                </div>

                <div className="flex items-center gap-6">
                    <button className="bg-[#F0BB78] text-[#543A14] font-semibold px-4 py-2 rounded-md hover:opacity-90 transition">
                        Admin Panel
                    </button>
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`hover:underline transition ${activeTab === "products" ? "text-[#F0BB78]" : ""}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`hover:underline transition ${activeTab === "orders" ? "text-[#F0BB78]" : ""}`}
                    >
                        Orders
                    </button>
                    <button
                        onClick={() => setActiveTab("reports")}
                        className={`hover:underline transition ${activeTab === "reports" ? "text-[#F0BB78]" : ""}`}
                    >
                        Reports
                    </button>
                    <button className="flex items-center gap-2 text-white hover:text-[#F0BB78] transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                        </svg>
                        Log Out
                    </button>
                </div>
            </nav>

            <div className="py-5 px-5">
                {/* Profile Info */}
                <div className="mid">
                    <div className="bg-[#F0BB78] py-5 rounded-xl border">
                        <div className="flex justify-center">
                            <img src={logo} alt="Logo" className="h-24" />
                        </div>
                        <div>
                            <h1 className="text-center text-lg text-[#543A14]"><span className="font-bold">Name :</span> {user?.name}</h1>
                            <h1 className="text-center text-lg text-[#543A14]"><span className="font-bold">Email :</span> {user?.email}</h1>
                            {/* Tab */}
                            <div className="flex flex-wrap -m-4 pt-4 text-center justify-center">
                                {/* Total Products */}
                                <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                                    <div className="border bg-[#FFF0DC] px-4 py-3 rounded-xl flex justify-center items-center gap-4">
                                        <div className="text-[#543A14] w-12 h-12">
                                            <FiShoppingBag size={40} />
                                        </div>
                                        <div>
                                            <h2 className="title-font font-medium text-3xl text-[#543A14] fonts1">{getAllProduct.length}</h2>
                                            <p className="text-[#543A14] font-bold">Total Products</p>
                                        </div>
                                    </div>
                                </div>


                                {/* Total Order  */}
                                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                                    <div className=" border bg-[#FFF0DC] px-4 py-3 rounded-xl flex justify-center items-center gap-4" >
                                        <div className="text-[#543A14] w-12 h-12" >
                                            <FaListOl size={40} />
                                        </div>
                                        <div>
                                            <h2 className="title-font font-medium text-3xl text-[#543A14] fonts1" >10</h2>
                                            <p className=" text-[#543A14]  font-bold" >Total Order</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Total User  */}
                                <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                                    <div className=" border bg-[#FFF0DC] px-4 py-3 rounded-xl flex justify-center items-center gap-4" >
                                        <div className="text-[#543A14] w-12 h-12 inline-block" >
                                            <FaUsers size={40} />
                                        </div>
                                        <div>
                                            <h2 className="title-font font-medium text-3xl text-[#543A14] fonts1" >10</h2>
                                            <p className=" text-[#543A14]  font-bold" >Total User</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="py-4">
                    {activeTab === "products" && <ProductDetail />}
                    {activeTab === "orders" && (
                        <div className="text-[#543A14] text-lg font-semibold">All Orders (Placeholder)</div>
                    )}
                    {activeTab === "reports" && (
                        <UserDetail />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
