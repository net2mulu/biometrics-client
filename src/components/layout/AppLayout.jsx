import NavBar from "./NavBar";
import SideBar from "./SideBar";

const AppLayout = ({ children }) => {
  return (
    <div className={`flex space-x-6 p-4 h-screen`}>
      <div className={` h-full `}>
        <SideBar />
      </div>
      <NavBar />
      {children}
    </div>
  );
};

export default AppLayout;
