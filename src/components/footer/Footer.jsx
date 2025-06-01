import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="bg-[#543A14] text-white py-8">
            <div className="container mx-auto px-5">
                {/* Judul */}
                <h2 className="text-center text-lg font-bold mb-6">ABOUT US</h2>

                {/* Isi 3 kolom */}
                <div className="flex flex-col md:flex-row justify-between text-sm space-y-8 md:space-y-0">
                    {/* Address */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Address</h3>
                        <p>Jebres, Surakarta, Jawa Tengah<br />Indonesia</p>
                    </div>

                    {/* Working Hours */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
                        <p>Weekday: 7 am - 7 pm<br />Weekend: 8 am - 6 pm</p>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h6 className="text-lg font-semibold mb-2">Contact Us</h6>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2"><FaInstagram /> @Tiara_Bakery</li>
                            <li className="flex items-center gap-2"><FaTiktok /> @Tiara_Bakery</li>
                            <li className="flex items-center gap-2"><MdEmail /> tiarabakery@gmail.com</li>
                            <li className="flex items-center gap-2"><FaWhatsapp /> 08123456789</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
