import { CameraProvider } from "../../context/CameraContext";
import BreadCrumb from "../shared/BreadCrumb";
import FaceSideOptions from "./FaceSetting/FaceSideOptions";

const FaceLayout = ({ children }) => {
  return (
    <CameraProvider>
      <div className="flex gap-4 flex-row minfour">
        <div className="flex flex-col w-full h-full justify-around">
          <div className="w-11/12 flex items-start">
            <BreadCrumb />
          </div>
          {/* page content here */}
          {children}
        </div>

        <div className="min-w-[6rem]">
          <FaceSideOptions />
        </div>
      </div>
    </CameraProvider>
  );
};

export default FaceLayout;
