import Logocircle from "../../assets/Logo-Circle.svg";

const Loader = () => {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <img
          src={Logocircle}
          alt="Loading..."
          className="animate-spin h-16 w-16"
        />
      </div>
    );
  };

export default Loader;