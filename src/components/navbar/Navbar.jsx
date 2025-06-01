import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import SearchBar from "../searchBar/SearchBar";
import logo from "../../assets/logo.png"; 

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
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
                <div className="flex items-center space-x-6 text-orange-400 font-semibold">
                    <Link to="/cart" className="flex items-center space-x-1">
                        <FaShoppingCart />
                    </Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/account" className="flex items-center space-x-1">
                        <FaUser />
                        <span>Account</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
