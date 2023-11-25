import { FaTshirt, FaWineGlass, FaMobileAlt, FaLaptop } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import { PiHouseBold } from "react-icons/pi";

const categories = [
    "Electronics",
    "Fashion",
    "Phone",
    "Wine",
    "Housing",
    "Furniture",
];
  
const categoryIcons = {
    Electronics: <FaLaptop className="text-3xl" size={26} />,
    Fashion: <FaTshirt className="text-3xl" size={26} />,
    Phone: <FaMobileAlt className="text-3xl" size={26} />,
    Wine: <FaWineGlass className="text-3xl" size={26} />,
    Housing: <PiHouseBold className="text-3xl" size={26} />,
    Furniture: <GiSofa className="text-3xl" size={26} />,
};

const Categories = () => {
    return (
        <div className="flex items-center justify-between overflow-x-auto ">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-center p-2 text-gray-500 hover:text-blue-500 transition cursor-pointer"
                >
                    {categoryIcons[category]}{" "}
                    <div className="px-5 rounded-full">
                        <p>{category}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Categories;