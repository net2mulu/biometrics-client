import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { labourDatavar } from "../../apollo/store";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const AppLayout = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //paths to re-route
  const allowed = ["/home", "/biometrics-home", "/face-setting"];

  const notAllowedNav = ["/face-setting"];

  useEffect(() => {
    if (!allowed.includes(pathname) || !labourDatavar()) {
      routeToDash();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routeToDash = () => {
    navigate("/home");
  };

  return (
    <div className="bg-blue-200/20 flex space-x-6 p-4 h-screen">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="w-full space-y-6 relative flex flex-col">
        {!notAllowedNav.includes(pathname) && <NavBar />} {children}
      </div>
    </div>
  );
};

export default AppLayout;
