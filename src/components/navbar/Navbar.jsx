import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import SearchBar from "../searchBar/SearchBar";
import logo from "../../assets/logo.png";

const Navbar = () => {
    // get user from localStorage 
    const user = JSON.parse(localStorage.getItem('users'));

    // navigate 
    const navigate = useNavigate();

    // logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/")
    }

    // navList Data
    const navList = (
        <ul className="flex items-center space-x-6 text-[#F0BB78] font-semibold ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            {/* All Product */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>
            {/* Cart */}
            <li>
                <Link to="/cart" className="flex items-center space-x-1">
                    <FaShoppingCart />
                </Link>
            </li>
            {/* Orders */}
            <li>
                <Link to="/orders">Orders</Link>
            </li>
            {/* About Us */}
            <li>
                <Link to="/about">About Us</Link>
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
                <Link to={'/user-dashboard'}>User</Link>
            </li>}
            {/* Admin */}
            {user?.role === "admin" && <li>
                <Link to={'/admin-dashboard'}>Admin</Link>
            </li>}
            {/* logout */}
            {user && <li className=" cursor-pointer" onClick={logout}>Logout
            </li>}
            {/* Account
            <li>
                <Link to={user ? "/user-dashboard" : "/login"} className="flex items-center space-x-1">
                    <FaUser />
                    <span>Account</span>
                </Link>
            </li> */}
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
