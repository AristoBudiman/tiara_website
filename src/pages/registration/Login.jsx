import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../assets/logo.png"; 
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  // User Login State 
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const userLoginFunction = async () => {
    // Validasi input
    if (!userLogin.email || !userLogin.password) {
      toast.error("All fields are required");
      return; // Penting: return untuk menghentikan eksekusi
    }

    setLoading(true);
    try {
      // Login dengan Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        userLogin.email, 
        userLogin.password
      );

      // Ambil data user dari Firestore
      const q = query(
        collection(fireDB, "users"),
        where('uid', '==', userCredential.user.uid)
      );
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error("User data not found");
      }

      // Dapatkan data user
      let userData;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
      });

      // Update state dan localStorage
      localStorage.setItem("users", JSON.stringify(userData));
      context.setUser(userData); // Update user di context
      
      toast.success("Login Successfully");
      setUserLogin({ email: "", password: "" });

      // Redirect berdasarkan role
      if (userData.role === "user") {
        navigate('/user-dashboard');
      } else {
        navigate('/admin-dashboard');
      }

    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Login Failed";
      
      // Handle error spesifik dari Firebase
      if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address";
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "User not found";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Wrong password";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Try again later";
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const handleResetPassword = async () => {
    const email = prompt("Masukkan email yang ingin di-reset:");

    if (!email) return;

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email reset password telah dikirim!");
    } catch (error) {
      console.error("Reset Password Error:", error.message);
      alert("Gagal mengirim email reset password.");
    }
  };

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
          <button onClick={handleResetPassword}>Forget Password?</button>
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
