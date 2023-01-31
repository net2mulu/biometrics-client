import BreadCrumb from "../shared/BreadCrumb";
import SideOptions from "../shared/SideOptions";
import FaceSideOptions from "./FaceSideOptions";

const FaceLayout = ({ children }) => {
  return (
    <div className="flex gap-4 flex-row minfour">
      <div className="flex flex-col w-full h-full justify-around">
        <div className="w-11/12 flex items-start">
          <BreadCrumb />
        </div>
        {/* page content here */}
        {children}
      </div>

      <div className="min-w-[6rem]">
        <SideOptions>
          <FaceSideOptions />
        </SideOptions>
      </div>
    </div>
  );
};

export default FaceLayout;
