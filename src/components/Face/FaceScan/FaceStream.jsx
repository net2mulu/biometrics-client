import { useContext } from "react";
import Webcam from "react-webcam";
import FaceHologram from "../../../assets/images/Group.png";
import CameraContext from "../../../context/CameraContext";

const FaceStream = () => {
  const { webcamRef, selectedDevice } = useContext(CameraContext);

  return (
    <div className="relative flex justify-center w-full items-center">
      <Webcam
        ref={webcamRef}
        videoConstraints={{
          width: 1920,
          height: 1080,
          facingMode: "environment",
          deviceId: selectedDevice.deviceId,
        }}
        audio={false}
        mirrored={true}
        screenshotQuality={1}
        imageSmoothing={false}
        screenshotFormat="image/png"
        className="rounded-2xl  absolute z-0"
      />
      <div className="relative flex justify-center items-center z-10">
        <img
          src={FaceHologram}
          className="object-contain  w-[45%]"
          alt="Face Loading Hologram"
        />
      </div>
    </div>
  );
};

export default FaceStream;
