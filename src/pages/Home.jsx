import HeroSection from "../components/hero/HeroSection";
import Mobilenav from "../components/nav/MobileNav";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="md:hidden">
        <Mobilenav />
      </div>
    </div>
  );
}
