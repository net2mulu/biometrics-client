import React from "react";
import RightFace from "../../../assets/images/right-face.png";
import FrontFace from "../../../assets/images/front-face.png";
import LeftFace from "../../../assets/images/left-face.png";

const FaceCaptureGuide = () => {
  return (
    <div className="h-[42%] w-full flex justify-between items-center border border-primary rounded-md">
      <div className="flex flex-col justify-center items-center space-y-2 w-[28%] h-full">
        <img
          className="bg-N80 shadow-md rounded w-8/12 z-10"
          src={LeftFace}
          alt="Right Face"
        />
        <p className="text-primary text-md font-bold">Left</p>
      </div>
      <div className="py-2 flex flex-col justify-center items-center space-y-2 w-[35%] h-full">
        <img
          className="bg-N80 shadow-md rounded w-8/12 z-10"
          src={FrontFace}
          alt="Right Face"
        />
        <p className="text-primary text-md font-bold">Front</p>
      </div>
      <div className="flex flex-col justify-center  items-center space-y-2 w-[28%] h-full">
        <img
          className="bg-N80 shadow-md rounded w-8/12 z-10"
          src={RightFace}
          alt="Right Face"
        />
        <p className="text-primary text-md font-bold">Right</p>
      </div>
    </div>
  );
};

export default FaceCaptureGuide;
