import React from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import EyeRegistrationIcon from "../../assets/svgs/EyeRegistrationIcon.svg";
const IrisSideOptions = () => {
  return (
    <div className="flex flex-col justify-around">
      <div className="flex justify-around items-center mt-6">
        <img
          className="ring-[5px] ring-green bg-green/20 rounded-full w-14 h-14 p-2 2xl:h-20 2xl:w-20"
          src={EyeRegistrationIcon}
          alt="EyeRegistrationIcon"
        />
      </div>

      <div className="flex flex-col justify-center items-center mt-6">
        <BsFillEyeFill className="opacity-40 text-[2.5rem] " />
        <p className="text-sm opacity-40">Left Eye</p>
      </div>

      <div className="flex flex-col justify-center items-center mt-6">
        <BsFillEyeSlashFill className="opacity-40 text-[2.5rem] " />
        <p className="text-sm opacity-40">Right Eye</p>
      </div>
    </div>
  );
};

export default IrisSideOptions;
