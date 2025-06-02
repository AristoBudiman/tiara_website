import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../assets/logo.png"; 
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate 
  const navigate = useNavigate();

  // User Signup State 
  const [userLogin, setUserLogin] = useState({
      email: "",
      password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const userLoginFunction = async () => {
    // validation 
    if (userLogin.email === "" || userLogin.password === "") {
        toast.error("All Fields are required")
    }

    setLoading(true);
    try {
        const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
        // console.log(users.user)

        try {
            const q = query(
                collection(fireDB, "users"),
                where('uid', '==', users?.user?.uid)
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let user;
                QuerySnapshot.forEach((doc) => user = doc.data());
                localStorage.setItem("users", JSON.stringify(user) )
                setUserLogin({
                    email: "",
                    password: ""
                })
                toast.success("Login Successfully");
                setLoading(false);
                if(user.role === "user") {
                    navigate('/user-dashboard');
                }else{
                    navigate('/admin-dashboard');
                }
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Login Failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFF0DC]">
      {loading && <Loader/>}
      <div className="bg-[#FFFFFF] w-[400px] rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-30 mb-2" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-xl font-extrabold text-[#543A14] mb-1">
          WELCOME BACK
        </h2>
        <p className="text-center text-sm text-[#F0BB78] mb-6">
          Log In Your Account
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#543A14]">
            Email Address
          </label>
          <input
            type="email"
            placeholder="yours@gmail.com"
            value={userLogin.email}
            onChange={(e) => {
                setUserLogin({
                    ...userLogin,
                    email: e.target.value
                })
            }}
            className="w-full bg-[#FFFDF9] border border-[#000000] rounded-md px-3 py-2 placeholder-[#D9D9D9] outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-1 relative">
          <label className="block text-sm font-medium mb-1 text-[#543A14]">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            value={userLogin.password}
            onChange={(e) => {
                setUserLogin({
                    ...userLogin,
                    password: e.target.value
                })
            }}
            className="w-full bg-[#FFFDF9] border border-[#000000] rounded-md px-3 py-2 pr-10 placeholder-[#D9D9D9] outline-none"
          />
          <button
            type="button"
            className="absolute top-[35px] right-3 text-[#D9D9D9]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>

        {/* Forget Password */}
        <div className="text-right mb-5">
          <Link to="/forgot-password" className="text-xs text-[#F0BB78] hover:underline">
            Forget Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={userLoginFunction}
          type="button"
          className="w-full mt-2 bg-[#F0BB78] hover:bg-[#e6a95d] text-[#543A14] font-semibold py-2 rounded-md"
        >
          Login
        </button>

        {/* Bottom Text */}
        <p className="text-center text-sm mt-4 text-[#543A14]">
          Don't Have an Account?{" "}
          <Link to="/signup" className="text-[#F0BB78] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
