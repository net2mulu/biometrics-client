import { CameraProvider } from "../../../context/CameraContext";
import FaceStream from "../../../components/Face/FaceScan/FaceStream";
import FaceSideOptions from "../../../components/Face/FaceSetting/FaceSideOptions";
import BreadCrumb from "../../../components/shared/BreadCrumb";
import FaceCaptureControls from "../../../components/Face/FaceScan/FaceCaptureControls";

const FaceScan = () => {
  return (
    <CameraProvider>
      <div className="flex gap-4 flex-row minfour">
        <div className="flex flex-col w-full h-full justify-center">
          <div className="w-11/12 flex items-start">
            <BreadCrumb />
          </div>
          {/* page content here */}
          <div className="h-full rounded-md overflow-hidden flex gap-4 justify-end items-center bg-transparent shadow-sm">
            <FaceStream />
            <FaceCaptureControls />
          </div>
        </div>

        <div className="min-w-[6rem]">
          <FaceSideOptions />
        </div>
      </div>
    </CameraProvider>
  );
};

export default FaceScan;
