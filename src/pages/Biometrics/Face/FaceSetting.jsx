import FaceCaptureDescription from "../../../components/Face/FaceSetting/FaceCaptureDescription";
import FaceCaptureGuide from "../../../components/Face/FaceSetting/FaceCaptureGuide";
import FaceLayout from "../../../components/Face/FaceLayout";

const FaceSetting = () => {
  return (
    <FaceLayout>
      <FaceCaptureGuide />
      <FaceCaptureDescription />
    </FaceLayout>
  );
};

export default FaceSetting;
