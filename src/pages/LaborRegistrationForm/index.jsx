
import { useContext } from "react";
import Webcam from "react-webcam";
import CameraContext from "../../context/CameraContext";

const LaborRegistration = () => {
  // const webcamRef = useRef();

  const {
    devices,
    webcamRef,
    selectedDevice,
    capture,
    frontFace,
    setSelectedDevice,
  } = useContext(CameraContext);

  return (
    <div className={`body-height py-6 z-20 bg-white rounded-2xl shadow-custom`}>
      {devices.map((device, key) => (
        <div>
          <p onClick={() => setSelectedDevice(device)} key={key}>
            {device.label || `Device ${key + 1}`}
          </p>
        </div>
      ))}
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
        // minScreenshotHeight={1080}
        // minScreenshotWidth={1920}
        screenshotQuality={1}
        imageSmoothing={false}
        screenshotFormat="image/png"
        className="rounded-lg w-[50vw]"
      />
      <button
        className="p-4 rounded-md bg-red m-4 text-white"
        onClick={capture}
      >
        Capture photo
      </button>
      {frontFace && <img src={frontFace} alt="net" />}
    </div>
  );
};

export default LaborRegistration;
