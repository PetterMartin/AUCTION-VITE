import HeroSection from "../components/hero/HeroSection";
import Sidebar from "../components/nav/Sidebar";
import Mobilenav from "../components/nav/MobileNav";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <HeroSection />
      <div className="md:hidden">
        <Mobilenav />
      </div>
    </div>
  );
}
