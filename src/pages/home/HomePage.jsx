import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";

const HomePage = () => {

    return (
        <Layout>
            <HeroSection/>
            <Category/>
            <HomePageProductCard/>
        </Layout>
    );
}

export default HomePage;
