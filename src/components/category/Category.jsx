import { useNavigate } from "react-router";

const category = [
    {
        image: 'https://res.cloudinary.com/dvu5pzwte/image/upload/v1748345669/WhatsApp_Image_2025-05-27_at_18.32.38_ca3be61a_shjkgm.jpg',
        name: 'Bolu'
    },
    {
        image: 'https://res.cloudinary.com/dvu5pzwte/image/upload/v1748345669/WhatsApp_Image_2025-05-27_at_18.32.38_f1eac40a_rkp5pu.jpg',
        name: 'Chiffon'
    },
    {
        image: 'https://res.cloudinary.com/dvu5pzwte/image/upload/v1748345669/WhatsApp_Image_2025-05-27_at_18.32.38_a70c1f09_snkii9.jpg',
        name: 'Mandarin'
    }
]

const Category = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-col mt-5">
                {/* main 1 */}
                <div className="flex overflow-x-scroll lg:justify-center  hide-scroll-bar">
                    {/* main 2  */}
                    <div className="flex min-w-max mx-auto space-x-4 lg:space-x-10 px-4">
                        {/* category  */}
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-3 lg:px-10">
                                    {/* Image  */}
                                    <div onClick={() => navigate(`/category/${item.name}`)} className=" w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full  bg-[#F0BB78] transition-all hover:bg-[#F0BB78] cursor-pointer mb-1 " >
                                        <div className="flex justify-center mb-12">
                                            {/* Image tag  */}
                                            <img src={item.image} alt="img" className="rounded-lg" />
                                        </div>
                                    </div>

                                    {/* Name Text  */}
                                    <h1 className=' text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase '>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}" }} />
        </div>
    );
}

export default Category;