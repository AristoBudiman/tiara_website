import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Layout = ({children}) => {
    return (
        <div className="bg-[#FFF0DC] min-h-screen">
            <Navbar/>
            <div className="main-content min-h-screen">
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;
