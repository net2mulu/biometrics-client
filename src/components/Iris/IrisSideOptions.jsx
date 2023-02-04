import React from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { MdReportGmailerrorred } from "react-icons/md";
import { GiTiredEye } from "react-icons/gi";
import EyeRegistrationIcon from "../../assets/svgs/EyeRegistrationIcon.svg";
import { useLocation } from "react-router-dom";

const IrisSideOptions = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col justify-around relative w-full">
      {pathname !== "/iris-scan" && (
        <div className="h-[68vh] w-full bg-white  opacity-80 absolute z-10 flex flex-col justify-center items-center cursor-not-allowed text-darkBlue"></div>
      )}
      <div className="flex justify-around items-center mt-6">
        <img
          className="ring-[5px] ring-green bg-green/20 rounded-full w-12 h-12 p-2 2xl:h-20 2xl:w-20"
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

      <div className="flex flex-col justify-center items-center mt-6">
        <MdReportGmailerrorred className="opacity-40 text-[2.5rem] " />
        <p className="text-sm opacity-40">Visually</p>
        <p className="text-sm opacity-40">Impaired</p>
      </div>

      <div className="flex flex-col justify-center items-center mt-6">
        <GiTiredEye className="opacity-40 text-[2.5rem] " />
        <p className="text-sm opacity-40">Poor Iris</p>
      </div>
    </div>
  );
};

export default IrisSideOptions;
