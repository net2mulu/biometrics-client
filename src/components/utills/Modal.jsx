// const Modal = ({ setOpened, children }) => {
//   const backdrop = () => {
//     setOpened(false);
//   };
//   return (
//     <div
//       onClick={() => backdrop()}
//       className="absolute top-0 backdrop-blur-sm left-0 bg-dark/20 w-full h-full z-40 flex items-center justify-center  transition-all duration-1000 ease-in-out"
//     >
//       <div className="text-center relative capitalize flex flex-col bg-white py-6 rounded-2xl shadow-custom w-1/3 max-w-[33rem]">
//         <div className="bg-white rounded-full p-3 shadow-md w-min absolute z-20 -top-12 left-1/2 -translate-x-1/2">
//           {/* logo */}
//         </div>
//         <div>{/* background */}</div>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;


import React from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../../hooks/modalContext";


const Modal = () => {
  let { modalContent, handleModal, modal } = React.useContext(ModalContext);
  if (modal) {
    return ReactDOM.createPortal(
      <div
        className="z-50 fixed top-0 left-0 h-screen w-full flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.8)" }}
      >
        <div className="bg-white relative p-5 shadow-lg rounded flex flex-col items-start text-lg text-gray-800">
          <button
            className="absolute top-0 right-0 -mt-12 font-bold self-end rounded-full bg-red-200 mb-3 bg-white text-red-700 w-8 h-8"
            onClick={() => handleModal()}
          >
            &times;
          </button>
          <p>{modalContent}</p>
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;
