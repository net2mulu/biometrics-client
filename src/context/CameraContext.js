import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
const CameraContext = createContext();
export const CameraProvider = ({ children }) => {
  //ref
  const webcamRef = useRef();
  //devices to enumrate
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState({});

  //capture mode
  const [captureMode, setCaptureMode] = useState("front");

  //faces
  const [frontFace, setFrontFace] = useState();
  const [leftFace, setLeftFace] = useState();
  const [rightFace, setRightFace] = useState();

  const [faceVerificationFilterData, setFaceVerificationFilterData] = useState({
    region: null,
    gender: null,
  });

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot({
      width: 1920,
      height: 1080,
    });
    if (captureMode === "left") {
      setLeftFace(imageSrc);
    } else if (captureMode === "right") {
      setRightFace(imageSrc);
    } else if (captureMode === "front") {
      setFrontFace(imageSrc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef, captureMode]);

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <CameraContext.Provider
      value={{
        capture,
        setCaptureMode,
        setLeftFace,
        setRightFace,
        setFrontFace,
        setSelectedDevice,
        setFaceVerificationFilterData,
        faceVerificationFilterData,
        selectedDevice,
        captureMode,
        leftFace,
        frontFace,
        rightFace,
        devices,
        webcamRef,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export default CameraContext;
