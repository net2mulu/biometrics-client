import { useState } from "react";
import { useNavigate } from "react-router-dom";
import simpleLogo from "../../assets/svgs/logo-simple.svg";
import { MdDashboard } from "react-icons/md";
import { BsCaretLeftFill } from "react-icons/bs";
import { AiOutlineScan } from "react-icons/ai";
import { IoPersonAdd } from "react-icons/io5";
import WaveAnnimation from "../utills/WaveAnnimation";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={` ${
        open ? "w-72" : "w-24 pl-4"
      } bg-gradient-to-br from-primary h-full to-prime10 rounded-2xl shadow-custom pt-8 sticky top-3 duration-400 transition-all ease-out flex flex-col justify-between`}
    >
      <BsCaretLeftFill
        className={`absolute cursor-pointer -right-3 top-24 w-7 p-1 text-xl bg-white text-prime10 rounded-md shadow-md duration-400 transition-all ease-out
       ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="space-y-16">
        <div className="flex gap-x-2 items-end">
          <img
            src={simpleLogo}
            alt="Simple Logo"
            className={`cursor-pointer w-12 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left uppercase font-bold text-xl duration-200 ${
              !open && "hidden"
            }`}
          >
            E-lmis
          </h1>
        </div>
        <ul className="flex flex-col space-y-4 sidebar-height capitalize text-white/80">
          <li
            className="flex space-x-4 items-center rounded cursor-pointer  min-w-min px-4 py-2 font-semibold "
            onClick={() => navigate("/home")}
          >
            <MdDashboard
              className={`text-2xl p-2 rounded-md bg-white text-prime10 ${
                !open && "scale-150"
              }`}
            />
            <p
              className={`${!open && "hidden"} transition
           duration-200 ease-in-out text-white`}
            >
              Home
            </p>
          </li>
          <li
            className="cursor-pointer text-sm rounded flex space-x-4 items-center min-w-max px-4 py-2   transition-all duration-200"
            onClick={() => navigate("/labor-registration")}
          >
            <IoPersonAdd
              className={`text-2xl rounded-md hover:bg-prime10/25 transition duration-200 ease-in p-2 hover:text-white text-white ${
                !open && "scale-150"
              }`}
            />
            <p
              className={`${!open && "hidden"} transition
           duration-200 ease-in-out`}
            >
              labor registration
            </p>
          </li>
          <li
            className="cursor-pointer text-sm rounded flex space-x-4 items-center min-w-max px-4 py-2   transition-all duration-200"
            onClick={() => navigate("/labor-verification")}
          >
            <AiOutlineScan
              className={`text-2xl rounded-md hover:bg-prime10/25 transition duration-200 ease-in p-2 hover:text-white text-white ${
                !open && "scale-150"
              }`}
            />
            <p
              className={`${!open && "hidden"} transition
           duration-200 ease-in-out`}
            >
              verify users
            </p>
          </li>
         
        </ul>
      </div>

      <div
        className={` ${
          open ? "w-72" : "w-24 -pl-4 -ml-4"
        } relative overflow-hidden h-32 rounded-2xl transition-all ease-out flex`}
      >
        <div
          className={` ${
            open ? "w-72 -bottom-12" : "w-24 -bottom-20"
          } w-full h-32 absolute transition-all ease-out overflow-hidden`}
        >
          <WaveAnnimation AnnimationHeight="-bottom-10 bg-white overflow-hidden " />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
