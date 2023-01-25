import FaceStream from "../../../components/Face/FaceScan/FaceStream";
import FaceCaptureControls from "../../../components/Face/FaceScan/FaceCaptureControls";
import FaceLayout from "../../../components/Face/FaceLayout";

const FaceScan = () => {
  return (
    <FaceLayout>
      <div className="h-full rounded-md overflow-hidden flex gap-4 justify-end items-center bg-transparent shadow-sm">
        <FaceStream />
        <FaceCaptureControls />
      </div>
    </FaceLayout>
  );
};

export default FaceScan;
