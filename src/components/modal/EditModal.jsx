
import { AiOutlineClose } from "react-icons/ai";

const EditModal = ({ isModalOpen, setModalOpen }) => {

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
          <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
            {/* CONTENT */}
            <div>
              <div className="h-full lg:h-auo md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-one">
                {/* HEADER */}
                <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                  <button
                    className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                    onClick={closeModal}
                  >
                    <AiOutlineClose size={18} />
                  </button>
                  <div className="text-lg font-semibold">Login</div>
                </div>
                {/* BODY */}
                <div className="relative p-6 flex-auto">
                  <div className="text-start">
                    <div className="text-2xl">Welcome back</div>
                    <div className="font-light text-neutral-500 mt-2 mb-6">
                      Login to your account
                    </div>
                    <p>hamster@stud.noroff.no</p>
                  </div>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;