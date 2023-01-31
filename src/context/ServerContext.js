import toast from "react-hot-toast";
import { useState, createContext, useEffect } from "react";

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
  const [status, setStatus] = useState(false);

  // conn status
  const [ws, setWs] = useState(null);
  const [rs, setRs] = useState(false);
  const [fpMachineStatus, setFpMachineStatus] = useState("fp_unknown");
  const [irisMachineStatus, setIrisMachineStatus] = useState("iris_unknown");
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

  //scan states
  const [currentScanning, setCurrentScanning] = useState(null);

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
    if (!ws && rs !== 1) {
      const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_LINK);
      setWs(socket);
      setRs(socket.readyState);
    }
  }, [rs, ws]);

  //states for fingerprint scan settings
  const [availLeftFinger, setAvailLeftFinger] = useState(4);
  const [availRightFinger, setAvailRightFinger] = useState(4);
  const [availRightThumb, setAvailRightThumb] = useState(1);
  const [availLeftThumb, setAvailLeftThumb] = useState(1);

  if (ws) {
    ws.onopen = () => {
      setStatus(true);
    };

    ws.onclose = () => {
      setStatus(false);
      setWs(null);

      setFpMachineStatus("fp_unknown");
      setIrisMachineStatus("iris_unknown");
    };

    ws.onerror = (e) => {
      // TODO: handle error
    };

    ws.onmessage = (msg) => {
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
        switch (msg.data) {
          case "fpon":
            setFpMachineStatus("fpon");
            break;
          case "fpoff":
            setFpMachineStatus("fpoff");
            break;
          case "iris_on":
            console.log("onnnnnnnnnn");
            setIrisMachineStatus("iris_on");
            break;
          case "iris_off":
            setIrisMachineStatus("iris_off");
            break;
          case "fp_unknown":
            setFpMachineStatus("fp_unknown");
            break;
          case "timeout":
            toast.success("Time out, please scan hands");
            break;
          default:
            break;
        }
      }
    };
  }

  const checkJson = (msg) => {
    try {
      JSON.parse(msg);
    } catch (e) {
      return false;
    }
    return true;
  };

  const registerFingerPrint = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  return (
    <ServerContext.Provider
      value={{
        status,
        ws,
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
        irisMachineStatus,
        setIrisMachineStatus,
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
        setWs,
        setLoading,
        registerFingerPrint,
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
