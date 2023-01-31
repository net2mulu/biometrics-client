import { useContext, useEffect, useState } from "react";
//icons
import { AiFillCamera } from "react-icons/ai";
import { BiCameraHome } from "react-icons/bi";
//assets
import FrontFace from "../../assets/svgs/FrontFace.svg";
import RightFace from "../../assets/svgs/RightFace.svg";
import LeftFace from "../../assets/svgs/LeftFace.svg";
//context
import CameraContext from "../../context/CameraContext";

const FaceSideOptions = () => {
  const { devices, setSelectedDevice } = useContext(CameraContext);
  const [showcameraSelector, setShowCameraSelector] = useState(false);

  const toggleCameraSelector = () => {
    setShowCameraSelector(!showcameraSelector);
  };

  useEffect(() => {
    console.log(showcameraSelector);
  }, [showcameraSelector]);
  return (
    <div className="h-[60%] flex flex-col w-full justify-between items-center pt-4 ">
      {devices && (
        <div className="group flex relative flex-col items-center  text-xs 2xl:text-xs font-medium text-prime70">
          <AiFillCamera
            onClick={toggleCameraSelector}
            className="text-white bg-green p-2 text-[2.5rem] cursor-pointer rounded-full"
          />
          <p>Camera</p>
          <div
            className={`absolute top-[50%]  right-full rounded-md overflow-hidden z-40 transition-all duration-300 ease-out camera-selector bg-slate-100 shadow-custom w-max text-prime20 font-medium ${
              !showcameraSelector ? "opacity-0 invisible " : ""
            } `}
          >
            {devices.map((device) => (
              <p
                key={device.id}
                onClick={() => {
                  setSelectedDevice(device);
                  setShowCameraSelector(false);
                }}
                className=" cursor-pointer hover:bg-slate-200  px-4 py-3 capitalize flex space-x-4 items-center"
              >
                <BiCameraHome className="text-lg text-prime10" />
                <span> {device.label}</span>
              </p>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col items-center  text-xs 2xl:text-xs font-medium text-prime70">
        <img
          className="rounded-full ring-[4px] ring-green w-14 h-14 p-2 2xl:h-20 2xl:w-20"
          src={FrontFace}
          alt="FaceIcon"
        />
        <p>Front</p>
      </div>
      <div className="flex flex-col items-center  text-xs 2xl:text-xs font-medium text-prime70">
        <img
          className="rounded-full w-14 h-14 p-2 2xl:h-20 2xl:w-20"
          src={RightFace}
          alt="FaceIconTwo"
        />
        <p>Right Side</p>
      </div>
      <div className="flex flex-col items-center  text-xs 2xl:text-xs font-medium text-prime70">
        <img
          className="rounded-full w-14 h-14 p-2 2xl:h-20 2xl:w-20"
          src={LeftFace}
          alt="FaceIconThree"
        />
        <p>Left Side</p>
      </div>
    </div>
  );
};

export default FaceSideOptions;
