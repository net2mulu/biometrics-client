import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";

import ResetIcon from "../../assets/svgs/FaceResetIcon.svg";
import ProfilePicture from "../../assets/svgs/AbebeFace.svg";

const SideOptions = ({ children }) => {
  return (
    <div className="rounded-2xl flex flex-col shadow-lg items-center justify-between w-full h-full bg-white">
      <div className="px-4">
        <div className="w-full flex justify-center items-center py-4 2xl:py-8 border-b border-b-N99">
          <div className="group relative z-50 ">
            <img
              className="w-20 rounded-full"
              src={ProfilePicture}
              alt="ProfilePicture"
            />

            <div className="absolute top-[70%] right-[70%] w-max  font-medium text-prime20 shadow-custom rounded-md bg-slate-100 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition duration-200 ease-in overflow-hidden z-50">
              <div className="cursor-pointer hover:bg-slate-200  px-4 py-3 capitalize flex space-x-4 items-center">
                <CgProfile className="text-lg text-prime10" />
                <p>Profile</p>
              </div>
              <div className="cursor-pointer hover:bg-slate-200  px-4 py-3 capitalize flex space-x-4 items-center">
                <FiSettings className="text-lg text-prime10" />
                <p>Settings</p>
              </div>
              <div className="cursor-pointer hover:bg-slate-200  px-4 py-3 capitalize flex space-x-4 items-center">
                <HiOutlineLogout className="text-lg text-prime10" />
                {/* <p>Log Out</p> */}
                <p>Log Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {children}

      <div className="flex flex-col items-center space-y-1">
        <img className="h-8 w-8" src={ResetIcon} alt="Reset" />
        <p className="text-center text-prime80 font-medium">Reset</p>
      </div>

      <div className="h-14 2xl:h-24 w-full relative rounded-b-2xl overflow-hidden">
        <svg className="smallWaveOne absolute bottom-0" viewBox="0 0 147 76.93">
          <path
            id="Path_724"
            data-name="Path 724"
            d="M93.652,442.912H240.528V387.459s-21.174-26.117-44.02-20.75-71.653,56.884-102.857,17.173C93.373,383.524,93.652,442.912,93.652,442.912Z"
            transform="translate(-93.528 -365.983)"
            fill="#3170B5"
            opacity="0.4"
          />
        </svg>

        <svg
          className="smallWaveTwo absolute bottom-0 rounded-md "
          viewBox="0 0 147 76.93"
        >
          <path
            id="Path_22"
            data-name="Path 22"
            d="M240.4,442.912H93.528V387.459s21.174-26.117,44.02-20.75S209.2,423.593,240.4,383.882C240.683,383.524,240.4,442.912,240.4,442.912Z"
            transform="translate(-93.528 -365.983)"
            fill="#3170B5"
          />
        </svg>
      </div>
    </div>
  );
};

export default SideOptions;
