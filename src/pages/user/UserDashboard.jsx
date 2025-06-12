import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaUser } from "react-icons/fa";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { getAuth, onAuthStateChanged, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(fireDB, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            setForm(docSnap.data());
          }
        } catch (err) {
          toast.error("Failed to load user data");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // stop loader if user is not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(fireDB, "users", currentUser.uid), form);
      setUserData({ ...form });
      toast.success("Profile updated!");
      setEditMode(false);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handlePasswordChange = async () => {
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, passwords.current);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, passwords.new);
      toast.success("Password updated!");
      setShowChangePassword(false);
    } catch (err) {
      toast.error("Password update failed. Check current password.");
    }
  };

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
    <Layout>
      <div className="container mx-auto px-4 py-6 bg-[#FFF0DC] min-h-screen">
        <div className="bg-white rounded-xl shadow p-5 max-w-2xl mx-auto border">
          <div className="bg-[#F0BB78] rounded-t-xl p-4 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#D9D9D9] flex items-center justify-center font-bold text-xl text-[#543A14]">
              {userData?.name?.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-[#543A14] text-md">{userData?.name}</h2>
              <p className="text-sm text-white">{currentUser?.email}</p>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-[#543A14]">Account Details</h3>
              <button
                className="text-sm text-[#F0BB78] hover:underline"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#543A14]">
              <div className="flex items-start space-x-2">
                <FaUser className="mt-1 text-[#F0BB78]" />
                <div>
                  <p className="font-medium">Full Name</p>
                  {editMode ? (
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <p>{userData?.name}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <FaEnvelope className="mt-1 text-[#F0BB78]" />
                <div>
                  <p className="font-medium">Email Address</p>
                  <p>{currentUser?.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <FaPhoneAlt className="mt-1 text-[#F0BB78]" />
                <div>
                  <p className="font-medium">Phone Number</p>
                  {editMode ? (
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <p>{userData?.phone || "-"}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="mt-1 text-[#F0BB78]" />
                <div>
                  <p className="font-medium">Address</p>
                  {editMode ? (
                    <textarea
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <p>{userData?.address || "-"}</p>
                  )}
                </div>
              </div>

              {editMode && (
                <button
                  onClick={handleUpdate}
                  className="mt-3 bg-[#F0BB78] text-white px-4 py-2 rounded hover:bg-[#dfa95f]"
                >
                  Save Changes
                </button>
              )}

              <hr className="my-4" />

              <div className="flex items-center justify-between">
                <p className="font-medium">Password</p>
                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="text-sm text-[#F0BB78] hover:underline"
                >
                  Change Password
                </button>
              </div>

              {showChangePassword && (
                <div className="space-y-2">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full border px-3 py-2 rounded"
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full border px-3 py-2 rounded"
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  />
                  <button
                    onClick={handlePasswordChange}
                    className="mt-2 bg-[#F0BB78] text-white px-4 py-2 rounded hover:bg-[#dfa95f]"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={handleResetPassword}
                    className="mt-2 bg-[#F0BB78] text-white px-4 py-2 rounded hover:bg-[#dfa95f]"
                  >
                    Forget Password?
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;