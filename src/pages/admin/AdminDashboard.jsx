import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ProductDetail from '../../components/admin/ProductDetail';
import DailySalesReport from "../../components/report/DailySalesReport";
import MonthlySalesReport from "../../components/report/MonthlySalesReport";
import ItemSalesDetail from "../../components/report/ItemSalesDetail";
import UserGrowth from "../../components/report/UserGrowth";
import logo from "../../assets/Logo.png"; 
import myContext from '../../context/myContext';
import { FiShoppingBag } from "react-icons/fi";      // Feather icon
import { FaListOl, FaUsers } from "react-icons/fa";  // Font Awesome icons
import { doc, updateDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { fireDB } from '../../firebase/FirebaseConfig';
import { auth } from "../../firebase/FirebaseConfig";
import { signOut } from "firebase/auth";


const AdminDashboard = () => {
    // const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    // const { getAllProduct, getAllOrder, allUsers } = context;
    const { user, setUser, getAllProduct, getAllOrder, allUsers } = useContext(myContext);

    // const { user, setUser } = useContext(myContext);

    // navigate 
    const navigate = useNavigate();

    // logout function 
    const logout = async () => {
        try {
            await signOut(auth); // Sign out dari Firebase Auth
            setUser(null); // Update context
            localStorage.removeItem('users'); // Hapus dari localStorage
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
    
    const [activeTab, setActiveTab] = useState("products");

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const orderRef = doc(fireDB, "orders", orderId);
            await updateDoc(orderRef, {
                status: newStatus,
                updatedAt: serverTimestamp(), // ✅ tambahkan ini
            });
            console.log("Status updated!");
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    const [selectedStatus, setSelectedStatus] = useState("semua");


    return (
        <div className='bg-[#FFF0DC]'>
            {/* Top Navbar */}
            <nav className="bg-[#543A14] text-white px-6 flex items-center justify-between shadow-md sticky top-0 z-50">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-20" />
                </div>

                <div className="flex items-center gap-6">
                    <button className="bg-[#F0BB78] text-[#543A14] font-semibold px-4 py-2 rounded-md hover:opacity-90 transition">
                        Admin Dashboard
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
                    <button 
                    onClick={logout}
                    className="flex items-center gap-2 text-white hover:text-[#F0BB78] transition">
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
                                            <h2 className="title-font font-medium text-3xl text-[#543A14] fonts1" >{getAllOrder.length}</h2>
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
                                            <h2 className="title-font font-medium text-3xl text-[#543A14] fonts1" >{allUsers.length}</h2>
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
                        <div className="mt-6 text-[#543A14]">
                            <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">All Orders</h2>
                            <select
                                className="border rounded px-3 py-1 text-[#543A14]"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="semua">Semua</option>
                                <option value="sedang diproses">Sedang Diproses</option>
                                <option value="sedang dikirim">Sedang Dikirim</option>
                                <option value="selesai">Selesai</option>
                                <option value="dibatalkan">Dibatalkan</option>
                            </select>
                            </div>

                            {["sedang diproses", "sedang dikirim", "selesai", "dibatalkan"]
                            .filter(status => selectedStatus === "semua" || selectedStatus === status)
                            .map((status) => (
                                <div key={status} className="mb-8">
                                <h3 className="text-xl font-semibold mb-2 capitalize">{status}</h3>
                                {getAllOrder.filter(order => order.status === status).length === 0 ? (
                                    <p className="text-gray-500 italic">Tidak ada pesanan dengan status ini.</p>
                                ) : (
                                    getAllOrder
                                    .filter(order => order.status === status && (selectedStatus === "semua" || order.status === selectedStatus))
                                    .sort((a, b) => {
                                        const timeA = a.updatedAt?.seconds || 0;
                                        const timeB = b.updatedAt?.seconds || 0;
                                        return timeB - timeA; // desc
                                    })
                                    .map((order) => {
                                        const orderProducts = Object.entries(order.items || {})
                                        .map(([productId, quantity]) => {
                                            const product = getAllProduct.find(p => p.id === productId);
                                            return product ? { ...product, quantity } : null;
                                        })
                                        .filter(Boolean);

                                        return (
                                        <div key={order.id} className="mb-4 bg-[#F0BB78] rounded-lg p-4 shadow-sm">
                                            {/* Order Header */}
                                            <div className="bg-[#543A14] p-4 rounded mb-4">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div>
                                                    <div className="text-sm font-semibold text-white">Order ID</div>
                                                    <div className="text-sm font-medium text-white truncate overflow-hidden whitespace-nowrap">{order.id}</div>
                                                    </div>
                                                    <div>
                                                    <div className="text-sm font-semibold text-white">createdAt</div>
                                                    <div className="text-sm text-white">{order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "N/A"}</div>
                                                    </div>
                                                    <div>
                                                    <div className="text-sm font-semibold text-white">updatedAt</div>
                                                    <div className="text-sm text-white">{order.updatedAt?.seconds ? new Date(order.updatedAt.seconds * 1000).toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "N/A"}</div>
                                                    </div>
                                                    <div>
                                                    <div className="text-sm font-semibold text-white">Total</div>
                                                    <div className="text-sm font-medium text-white">Rp {order.total?.toLocaleString('id-ID')}</div>
                                                    </div>
                                                    <div>
                                                    <div className="text-sm font-semibold text-white">Status</div>
                                                    <select
                                                        className="text-sm border rounded px-2 py-1 text-[#543A14]"
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    >
                                                        <option value="sedang diproses">Sedang Diproses</option>
                                                        <option value="sedang dikirim">Sedang Dikirim</option>
                                                        <option value="selesai">Selesai</option>
                                                        <option value="dibatalkan">Dibatalkan</option>
                                                    </select>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-white">User Email</div>
                                                        <div className="text-sm font-medium text-white truncate overflow-hidden whitespace-nowrap" 
                                                        >{order.userEmail}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-white">User Phone</div>
                                                        <div className="text-sm font-medium text-white">{order.phone}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-white">User Address</div>
                                                        <div className="text-sm font-medium text-white">{order.address}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Ordered Items */}
                                            <div className="space-y-2">
                                            {orderProducts.map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                                                <div className="flex items-center space-x-3">
                                                    <img src={item.images[0]} alt={item.title} className="w-12 h-12 object-cover rounded" />
                                                    <div>
                                                    <div className="font-semibold text-sm">{item.title}</div>
                                                    <div className="text-xs text-gray-600">x{item.quantity}</div>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-medium text-gray-800">
                                                    Rp {(item.actualPrice * item.quantity).toLocaleString('id-ID')}
                                                </div>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                        );
                                    })
                                )}
                                </div>
                            ))}
                        </div>
                        )}



                    {activeTab === "reports" && (
                    <div className="space-y-6">
                        <DailySalesReport orders={getAllOrder} />
                        <MonthlySalesReport orders={getAllOrder} />
                        <ItemSalesDetail orders={getAllOrder} allProducts={getAllProduct} />
                        <UserGrowth users={allUsers} /> 
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
