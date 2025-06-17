import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import SearchBar from "../searchBar/SearchBar";
import logo from "../../assets/Logo.png";
import { useSelector } from "react-redux";
import useCart from "../../hooks/useCart";
import myContext from "../../context/myContext";
import { useEffect, useState, useContext } from 'react';
import { auth } from "../../firebase/FirebaseConfig";
import { signOut } from "firebase/auth";

const Navbar = () => {

    const { user, setUser } = useContext(myContext);
    const navigate = useNavigate();
    const { cart } = useCart();
    const cartCount = Object.values(cart).reduce((total, qty) => total + qty, 0);


    const logout = async () => {
        try {
            await signOut(auth); 
            setUser(null); 
            localStorage.removeItem('users');
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    // navList Data
    const navList = (
        <ul className="flex items-center space-x-6 text-[#F0BB78] font-semibold ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            {/* Cart */}
            <li>
                {user ? (
                    <Link to="/cart" className="flex items-center space-x-1">
                        <FaShoppingCart /> ({cartCount})
                    </Link>
                ) : (
                    <div className="flex items-center space-x-1 text-gray-400 cursor-not-allowed">
                        <FaShoppingCart /> ({cartCount})
                    </div>
                )}
            </li>
            {/* Orders */}
            <li>
                <Link to="/orders">Orders</Link>
            </li>
            {/* Signup */}
            {!user ? <li>
                <Link to={'/signup'}>Signup</Link>
            </li> : ""}
            {/* Login */}
            {!user ? <li>
                <Link to={'/login'}>Login</Link>
            </li> : ""}
            {/* User */}
            {user?.role === "user" && <li>
                <Link to={'/user-dashboard'}>{user.name}</Link>
            </li>}
            {/* Admin */}
            {user?.role === "admin" && <li>
                <Link to={'/admin-dashboard'}>Admin</Link>
            </li>}
            {/* logout */}
            {user && <li className=" cursor-pointer" onClick={logout}>Logout
            </li>}
        </ul>
    )
    return (
        <nav className="bg-[#FFFFFF] shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-0 px-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-24" />
                </div>

                {/* SearchBar */}
                <div className="flex-1 px-4">
                    <SearchBar />
                </div>

                {/* Nav Items */}
                <div>
                    {navList}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
