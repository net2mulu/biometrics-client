import toast from "react-hot-toast";
import useWebSocket from "react-use-websocket";
import { useState, createContext, useEffect } from "react";

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
  const [status, setStatus] = useState(false);

  // conn status
  const [fpMachineStatus, setFpMachineStatus] = useState("fp_unknown");
  const [irMachineStatus, setIrMachineStatus] = useState("iris_unknown");
  const [handState, setHandState] = useState("red");

  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [irisModalOpened, setIrisModalOpened] = useState(false);

  //fingerPrintstate
  const [fingerPrintPreview, setFingerPrintPreview] = useState("");
  const [fingerPrintCompleted, setFingerPrintCompleted] = useState(false);
  // Iris states
  const [leftEyePreview, setLeftEyePreview] = useState(null);
  const [rightEyePreview, setRightEyePreview] = useState(null);
  const [finalIrisZip, setFinalIrisZip] = useState(null);
  //final zip to send to server
  const [finalZip, setFinalZip] = useState();

  //hands state
  const [leftHandStatus, setLeftHandStatus] = useState({
    fullhand: true,
    lt: true,
    li: true,
    lm: true,
    lr: true,
    lp: true,
  });

  const [rightHandStatus, setRightHandStatus] = useState({
    fullhand: true,
    rt: true,
    ri: true,
    rm: true,
    rr: true,
    rp: true,
  });

  // iris state
  const [rightIris, setRightIris] = useState(true);
  const [leftIris, setLeftIris] = useState(true);

  // state variables
  const [leftEyeToggle, setLeftEyeToggle] = useState(true);
  const [rightEyeToggle, setRightEyeToggle] = useState(true);

  //scan states
  const [currentScanning, setCurrentScanning] = useState(null);
  const [irisCurrentScanning, setIrisCurrentScanning] = useState(true);

  const [leftIrisSuccess, setLeftIrisSuccess] = useState("");
  const [rightIrisSuccess, setRightIrisSuccess] = useState("");

  const [leftHandFingersScan, setLeftHandFingersScan] = useState(false);
  const [rightHandFingersScan, setRightHandFingersScan] = useState(false);
  const [thumbFingersScan, setThumbFingersScan] = useState(false);

  const [
    fingerprintVerificationFilterData,
    setFingerprintVerificationFilterData,
  ] = useState({
    region: null,
    gender: null,
  });

  useEffect(() => {
    console.log(irMachineStatus);
  }, [irMachineStatus]);

  const { sendMessage } = useWebSocket(process.env.REACT_APP_WEB_SOCKET_LINK, {
    onOpen: () => setStatus(true),
    onMessage: (msg) => {
      if (checkJson(msg.data)) {
        JSON.parse(msg.data, function (key, value) {
          if (key === "left") {
            setLeftEyePreview(`data:image/png;base64, ${value}`);
          } else if (key === "right") {
            setRightEyePreview(`data:image/png;base64, ${value}`);
          } else if (key === "fingerprint") {
            setFingerPrintPreview(`data:image/bmp;base64, ${value}`);
          } else if (key === "fingerprint_archive") {
            setFinalZip(value);
          } else if (key === "iris_archive") {
            setFinalIrisZip(value);
          } else {
            switch (msg.data) {
              case "0":
                setHandState("red");
                break;
              case "1":
                setHandState("yellow");
                break;
              case "2":
                setHandState("green");
                if (currentScanning === "lfs") {
                  setLeftHandFingersScan(true);
                } else if (currentScanning === "tmb") {
                  setThumbFingersScan(true);
                } else if (currentScanning === "rfs") {
                  setRightHandFingersScan(true);
                }
                break;
              default:
                break;
            }
          }
        });
      } else {
        console.log(msg.data);
        switch (msg.data) {
          case "fpon":
            setFpMachineStatus("fpon");
            break;
          case "fpoff":
            setFpMachineStatus("fpoff");
            break;
          case "fp_unknown":
            setFpMachineStatus("fp_unknown");
            break;
          case "iris_on":
            setIrMachineStatus("iris_on");
            break;
          case "iris_off":
            setIrMachineStatus("iris_off");
            break;
          case "iris_unknown":
            setIrMachineStatus("iris_off");
            break;
          case "timeout":
            toast.success("Time out, please scan!");
            break;
          case "left_eye_only_enabled":
            toast.success("left_eye_only_enabled");
            break;
          case "right_eye_only_enabled":
            toast.success("right_eye_only_enabled");
            break;
          case "both_eyes_enabled":
            toast.success("Scanning Both Eyes");
            break;
          case "right_eye_unqualified":
            setRightIrisSuccess("bad");
            toast.error("Right Eye Unqualified!");
            break;
          case "left_eye_unqualified":
            setLeftIrisSuccess("bad");
            toast.error("Left Eye Unqualified!");
            break;
          case "both_eyes_are_unqualified":
            setLeftIrisSuccess("bad");
            setRightIrisSuccess("bad");
            toast.error("Both Eyes Are Unqualified!");
            break;
          default:
            break;
        }
      }
    },
    onClose: () => {
      setStatus(false);
      setFpMachineStatus("fp_unknown");
      setIrMachineStatus("iris_unknown");
    },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
  });

  //states for fingerprint scan settings
  const [availLeftFinger, setAvailLeftFinger] = useState(4);
  const [availRightFinger, setAvailRightFinger] = useState(4);
  const [availRightThumb, setAvailRightThumb] = useState(1);
  const [availLeftThumb, setAvailLeftThumb] = useState(1);

  const checkJson = (msg) => {
    try {
      JSON.parse(msg);
    } catch (e) {
      return false;
    }
    return true;
  };

  return (
    <ServerContext.Provider
      value={{
        status,
        sendMessage,
        fpMachineStatus,
        fingerPrintPreview,
        handState,
        rightHandStatus,
        leftHandStatus,
        loading,
        finalZip,
        leftEyePreview,
        rightEyePreview,
        leftHandFingersScan,
        rightHandFingersScan,
        thumbFingersScan,
        currentScanning,
        availLeftFinger,
        finalIrisZip,
        fingerPrintCompleted,
        availRightFinger,
        availLeftThumb,
        modalOpened,
        leftIris,
        rightIris,
        irisModalOpened,
        availRightThumb,
        fingerprintVerificationFilterData,
        irMachineStatus,
        leftEyeToggle,
        rightEyeToggle,
        irisCurrentScanning,
        leftIrisSuccess,
        setLeftIrisSuccess,
        rightIrisSuccess,
        setRightIrisSuccess,
        setIrisCurrentScanning,
        setRightEyeToggle,
        setLeftEyeToggle,
        setIrMachineStatus,
        setFingerprintVerificationFilterData,
        setAvailLeftFinger,
        setAvailRightFinger,
        setFingerPrintCompleted,
        setAvailRightThumb,
        setIrisModalOpened,
        setModalOpened,
        setAvailLeftThumb,
        setCurrentScanning,
        setLeftHandFingersScan,
        setRightHandFingersScan,
        setThumbFingersScan,
        setLoading,
        setLeftHandStatus,
        setRightHandStatus,
        setFingerPrintPreview,
        setFpMachineStatus,
        setFinalZip,
        setRightIris,
        setLeftIris,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export default ServerContext;
