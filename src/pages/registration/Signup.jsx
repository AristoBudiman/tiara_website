import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../assets/logo.png"; 

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#FFF0DC]">
            <div className="bg-[#FFFFFF] px-8 py-6 rounded-2xl shadow-lg w-[400px]">

                {/* Logo + Title */}
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Logo" className="w-30 mb-2" />
                </div>

                <h2 className="text-center text-xl font-extrabold text-[#543A14] mb-1">
                    CREATE YOUR ACCOUNT
                </h2>
                <p className="text-center text-sm text-[#F0BB78] mb-6">
                    Joint The Best Bakery Experience
                </p>

                {/* Email */}
                <div className="mb-3">
                    <label className="block text-sm text-[#543A14] font-semibold mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-[#FFFDF9] border border-[#000000] rounded-md px-3 py-2 placeholder-[#D9D9D9] outline-none"
                    />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label className="block text-sm text-[#543A14] font-semibold mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className="w-full bg-[#FFFDF9] border border-[#000000] rounded-md px-3 py-2 pr-10 placeholder-[#D9D9D9] outline-none"
                        />
                        <span
                            className="absolute right-3 top-2.5 text-[#D9D9D9] cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-5">
                    <label className="block text-sm text-[#543A14] font-semibold mb-1">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Repeat your password"
                            className="w-full bg-[#FFFDF9] border border-[#000000] rounded-md px-3 py-2 pr-10 placeholder-[#D9D9D9] outline-none"
                        />
                        <span
                            className="absolute right-3 top-2.5 text-[#D9D9D9] cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                </div>

                {/* Sign Up Button */}
                <div className="mb-4">
                    <button
                        type="button"
                        className="w-full bg-[#F0BB78] hover:bg-[#e6a65d] text-[#543A14] font-semibold py-2 rounded-md"
                    >
                        Sign Up
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-[#543A14]">
                    Already Have Account?{" "}
                    <Link to="/login" className="text-[#F0BB78] hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
