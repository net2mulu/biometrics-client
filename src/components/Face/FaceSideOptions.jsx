import { useContext, useEffect, useState } from "react";
//icons
import { AiFillCamera } from "react-icons/ai";
import { BiCameraHome } from "react-icons/bi";
//assets
import FrontFace from "../../assets/svgs/FrontFace.svg";
import RightFace from "../../assets/svgs/RightFace.svg";
import LeftFace from "../../assets/svgs/LeftFace.svg";
import ResetIcon from "../../assets/svgs/FaceResetIcon.svg";

//context
import CameraContext from "../../context/CameraContext";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const FaceSideOptions = () => {
  const {
    devices,
    setSelectedDevice,
    setCaptureMode,
    captureMode,
    setFrontFace,
    setRightFace,
    setLeftFace,
  } = useContext(CameraContext);
  const [showcameraSelector, setShowCameraSelector] = useState(false);

  const toggleCameraSelector = () => {
    setShowCameraSelector(!showcameraSelector);
  };

  const resetPictures = () => {
    setFrontFace(null);
    setRightFace(null);
    setLeftFace(null);
    toast.success("cleared!");
  };

  useEffect(() => {
    console.log(showcameraSelector);
  }, [showcameraSelector]);

  const { pathname } = useLocation();
  return (
    <div className="h-[60%] flex flex-col w-full justify-between items-center py-2 gap-4 relative">
      {pathname !== "/face-scan" && (
        <div className="h-[68vh] w-full bg-white  opacity-80 absolute z-10 flex flex-col justify-center items-center cursor-not-allowed text-darkBlue"></div>
      )}
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
            {devices.map((device, id) => (
              <p
                key={id}
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

      <div
        onClick={() => {
          setCaptureMode("left");
          toast.success("Left Side Mode!");
        }}
        className="flex flex-col items-center  text-xs 2xl:text-xs font-medium text-prime70"
      >
        <img
          className={`${
            captureMode === "left" ? "ring-[4px] ring-green " : ""
          } rounded-full  w-14 h-14 p-2 2xl:h-20 2xl:w-20`}
          src={LeftFace}
          alt="FaceIconThree"
        />
        <p>Left Side</p>
      </div>

      <div
        onClick={() => {
          setCaptureMode("front");
          toast.success("Front Face Mode!");
        }}
        className="flex  flex-col items-center  text-xs 2xl:text-xs font-medium text-prime70"
      >
        <img
          className={`${
            captureMode === "front" ? "ring-[4px] ring-green " : ""
          } rounded-full  w-14 h-14 p-2 2xl:h-20 2xl:w-20`}
          src={FrontFace}
          alt="FaceIcon"
        />
        <p>Front</p>
      </div>

      <div
        onClick={() => {
          setCaptureMode("right");
          toast.success("Right Side Mode!");
        }}
        className="flex flex-col items-center  text-xs 2xl:text-xs font-medium text-prime70"
      >
        <img
          className={`${
            captureMode === "right" ? "ring-[4px] ring-green " : ""
          } rounded-full  w-14 h-14 p-2 2xl:h-20 2xl:w-20`}
          src={RightFace}
          alt="FaceIconTwo"
        />
        <p>Right Side</p>
      </div>

      <div
        onClick={() => resetPictures()}
        className="flex flex-col items-center space-y-1 pt-2"
      >
        <img className="h-8 w-8" src={ResetIcon} alt="Reset" />
        <p className="text-center text-prime80 font-medium">Reset</p>
      </div>
    </div>
  );
};

export default FaceSideOptions;
