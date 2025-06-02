import Layout from "../../components/layout/Layout";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaUser } from "react-icons/fa";

const UserDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 bg-[#FFF0DC] min-h-screen">
        {/* Section Account Card */}
        <div className="bg-white rounded-xl shadow p-5 max-w-2xl mx-auto border">
          {/* Header */}
          <div className="bg-[#F0BB78] rounded-t-xl p-4 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#D9D9D9] flex items-center justify-center font-bold text-xl text-[#543A14]">
              C
            </div>
            <div>
              <h2 className="font-bold text-[#543A14] text-md">Costumer</h2>
              <p className="text-sm text-white">Costumer@gmail.com</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-[#543A14]">Account Details</h3>
              <button className="text-sm text-[#F0BB78] hover:underline">Edit</button>
            </div>

            <div className="space-y-4 text-sm text-[#543A14]">
              <div className="flex items-start space-x-2">
                <FaUser className="mt-1 text-[#F0BB78]" />
                <div>
                  <p className="font-medium">Full Name</p>
                  <p>Costumer the best</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <FaEnvelope className="mt-1 text-[#F0BB78]" />
                <div>
                  <p className="font-medium">Email Address</p>
                  <p>customer@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <FaPhoneAlt className="mt-1 text-[#F0BB78]" />
                <div>
                  <p className="font-medium">Phone Number</p>
                  <p>08912345678</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="mt-1 text-[#F0BB78]" />
                <div>
                  <p className="font-medium">Address</p>
                  <p>Jebres, Surakarta, Jawa Tengah, Indonesia</p>
                </div>
              </div>

              <hr />

              {/* Password Section */}
              <div className="flex items-center justify-between">
                <p className="font-medium">Password</p>
                <button className="text-sm text-[#F0BB78] hover:underline">Change Password</button>
              </div>
              <p className="text-gray-400">************</p>
            </div>
          </div>
        </div>

        {/* Optional: Order Section */}
        {/* Jika ingin tetap menampilkan Order seperti sebelumnya, bisa ditambahkan di bawah */}
      </div>
    </Layout>
  );
};

export default UserDashboard;
