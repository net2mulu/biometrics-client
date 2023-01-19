import FaceCaptureDescription from "../../../components/Face/FaceScan/FaceCaptureDescription";
import FaceCaptureGuide from "../../../components/Face/FaceScan/FaceCaptureGuide";
import BreadCrumb from "../../../components/shared/BreadCrumb";
import FaceSideOptions from "./FaceSideOptions";

const FaceSetting = () => {
  return (
    <div className="flex flex-row minfour">
      <div className="flex flex-col justify-around w-full h-full">
        <div className="w-11/12 flex items-start">
          <BreadCrumb />
        </div>
        <FaceCaptureGuide />
        <FaceCaptureDescription />
      </div>

      <div className="min-w-[6rem] pl-4">
        <FaceSideOptions />  
      </div>
    </div>
  );
};

export default FaceSetting;
