import { BsFillCaretDownFill } from "react-icons/bs";
import avatarImage from "../../assets/images/avatar2.png";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import DiagonalFlag from "../../assets/images/Diagonal Flag.png";
import {
  labourDatavar,
  labourFullDataVar,
  osscDataVar,
  userDatavar,
} from "..//../apollo/store";

const NavBar = () => {
    const navigate = useNavigate();


  // logout
  const logout = (e) => {
    // clear session storage
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("isLoggenIn");

    // clear state variables
    userDatavar(null);
    osscDataVar(null);
    labourDatavar(null);
    labourFullDataVar(null);

    // navigate to the home page
    navigate("/");
  };
  return (
    <div
      className={`h-28 w-full  shadow-sm before:h-12 sticky top-4 before:w-full  before:bg-darkBlue/0
       before:-top-8 before:z-0 before:absolute  z-40 bg-white rounded-2xl shadow-custom bg-yellow-600`}
    >
      <div className="h-full z-20 relative">
        <div className="flex justify-between h-full items-center">
          <div className="px-12 w-1/2">
            <h1 className="text-lg 3xl:text-xl font-semibol capitalize text-primary over">
              ethiopian labor market <br /> information system
            </h1>
          </div>
          <div className="flex w-1/2 space-x-4 items-center justify-between rounded-r-2xl pr-12 text-right bg-gradient-to-br from-prime30 to-prime10 text-white">
            {/* <div className="flex -translate-x-10">
            <div className="bg-green70 w-8 skew-custom h-28"></div>
            <div className="bg-yellow70 w-8 skew-custom h-28"></div>
            <div className="bg-red50 w-8 skew-custom h-28"></div>
          </div> */}

            <img
              src={DiagonalFlag}
              alt=""
              className="h-28 -translate-x-[50%]"
            />
            <div className="flex items-center space-x-6 justify-between">
              <div>
                {/* fetch ossc data from local state variable/reactive variables */}
                {osscDataVar() && (
                  <h3 className="capitalize mb-2 text-base font-semibold">
                    {osscDataVar()?.first_name} {osscDataVar()?.father_name}{" "}
                    {osscDataVar()?.grand_father_name}
                  </h3>
                )}

                {/* <p className="uppercase text-xs">
                role:{` ` + userDatavar()?.role}
              </p> */}
              </div>
              <div className="flex items-center space-x-4">
                {osscDataVar()?.profile_picture ? (
                  <img
                    src={
                      process.env.REACT_APP_MEDIA_SERVICE +
                      osscDataVar()?.profile_picture
                    }
                    alt="avatar"
                    className="border12 rounded-full"
                    width={60}
                    height={60}
                  />
                ) : (
                  <img
                    src={avatarImage}
                    alt="labor avatar"
                    className="border12 rounded-full"
                    width={60}
                    height={60}
                  />
                )}
                <div className="group relative z-50">
                  <BsFillCaretDownFill className="text-lightGray cursor-pointer" />
                  <div className="absolute top-[54%] right-[65%] w-max  font-medium text-prime20 shadow-custom rounded-md bg-slate-100 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition duration-200 ease-in overflow-hidden z-50">
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
                      <p onClick={(e) => logout(e)}>Log Out</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
