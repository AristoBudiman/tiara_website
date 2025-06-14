import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="bg-[#543A14] py-8">
            <div className="container mx-auto px-5">
                {/* Judul */}
                <h2 className=" text-[#FFF0DC] text-center text-lg font-bold mb-6">ABOUT US</h2>

                {/* Isi 3 kolom */}
                <div className=" text-[#FFFFFF] flex flex-col md:flex-row justify-between text-sm space-y-8 md:space-y-0">
                    {/* Address */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Address</h3>
                        <p>Jl. Semeru Utara IV, Tegalharjo, </p>
                        <p>Jebres, Surakarta, Jawa Tengah<br />Indonesia</p>
                        <a
                            href="https://maps.app.goo.gl/kbUwHkjKciEQMM5G6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                        >
                            Lihat di Google Maps
                        </a>
                    </div>

                    {/* Working Hours */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
                        <p>Weekday: 6 am - 8 pm<br />Weekend: 6 am - 5 pm</p>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h6 className="text-lg font-semibold mb-2">Contact Us</h6>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <FaInstagram />
                                <a
                                href="https://www.instagram.com/tiarabakerysolo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                                >
                                @tiarabakerysolo
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaTiktok />
                                <a
                                href="https://www.tiktok.com/@tiarabakerysolo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                                >
                                @tiarabakerysolo
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MdEmail />
                                <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=tiarabakerysolo@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                                >
                                tiarabakerysolo@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaWhatsapp />
                                <a
                                href="https://wa.me/6282241900657"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                                >
                                082241900657
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
