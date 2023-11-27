import MobileHeader from "../nav/MobileHeader"
import Searchbar from "../searchbar/Searchbar";
import Banners from "./Banners";
import Listings from "../listings/Listings";
import FeatureSection from "./FeatureSection";
import Categories from "./Categories";

const HeroSection = () => {

  return (
    <div className="w-full px-2 relative bg-white">
      <div className="lg:px-56 sm:px-28">
        <MobileHeader />

        <hr className="my-4 border-t-2 border-blue-400 xl:hidden" />

        <Searchbar />

        <Categories />
      </div>

      <Banners />

      <FeatureSection />

      <div className="lg:px-40 px-6 mt-20">
        <div className="flex sm:items-center justify-center gap-56">
          <p className="mb-2 sm:mb-0 hidden md:block">Home / Product details</p>
          <h1 className="text-2xl text-gray-800 sm:text-4xl font-semibold">
            Annonser
          </h1>
          <button className="bg-gradient-to-b from-blue-600 to-blue-500 text-white px-4 py-2 rounded">
            Default sorting
          </button>
        </div>
      </div>

      <Listings />
    </div>
  );
};

export default HeroSection;
