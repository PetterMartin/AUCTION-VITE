import { LiaShippingFastSolid } from "react-icons/lia";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { TfiWallet } from "react-icons/tfi";
import PropTypes from "prop-types";

const Feature = ({ icon, title, description, color }) => (
  <div className="flex gap-6">
    {icon({ size: 48, className: `text-${color}` })}
    <div>
      <h1 className="text-lg font-bold">{title}</h1>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </div>
);

Feature.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  };

const FeatureSection = () => (
  <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-2 max-w-screen-xl hidden md:block">
    <div className="flex justify-center gap-16">
      <Feature
        icon={LiaShippingFastSolid}
        title="Free Shipping"
        description="Free Shipping On All Order"
        color="rose-500"
      />
      <Feature
        icon={IoShieldCheckmarkOutline}
        title="Money Guarantee"
        description="30 Day Money Back"
        color="blue-500"
      />
      <Feature
        icon={MdOutlineHeadsetMic}
        title="Online Support 24/7"
        description="Technical Support 24/7"
        color="emerald-500"
      />
      <Feature
        icon={TfiWallet}
        title="Secure Payment"
        description="All Cards Accepted"
        color="amber-500"
      />
    </div>
  </div>
);

export default FeatureSection;