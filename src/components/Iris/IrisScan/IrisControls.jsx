import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { trackPromise } from "react-promise-tracker";
import { useNavigate } from "react-router-dom";
import { IRIS_REGISTER } from "../../../apollo/mutation";
import { labourDatavar } from "../../../apollo/store";
import ServerContext from "../../../context/ServerContext";

const IrisControls = () => {
  const {
    sendMessage,
    finalIrisZip,
    setRightEyeToggle,
    setLeftEyeToggle,
    setIrisCurrentScanning,
    setLeftIrisSuccess,
    setRightIrisSuccess
  } = useContext(ServerContext);
  const navigate = useNavigate();

  const [irisRegister] = useMutation(IRIS_REGISTER);

  const sendIris = () => {
    trackPromise(
      irisRegister({
        variables: { archive_file: finalIrisZip, labor_id: labourDatavar().id },
        onCompleted(data) {
          toast.success("Iris registered successfully!");
          setRightEyeToggle(true);
          setLeftEyeToggle(true);
          navigate("/biometric");
        },
        onerror(err) {
          toast.error("Iris registration failed!");
        },
      })
    );
  };

  return (
    <>
      <div className="rounded-md flex">
        <div className="w-full bg-white h-full rounded-md border-t-4 shadow-custom border-primary py-6 px-10 flex flex-col justify-center items-center">
          {/* <p className="text-md font-semibold text-primary">Biometrics Process</p>
          <p className="text-sm text-N80 text-center">
            The Registration process is taking major steps identifying the user
          </p> */}
          <div className="w-full flex flex-col  justify-center">
            {/* <button className="px-8 py-1.5 bg-Prime90 text-N40 font-medium rounded self-center">
              Retake
            </button> */}
            <p className="text-[13px] text-center text-dark mb-5">
              <span className="text-red">Note:</span> Use the buttons to
              manipulate the iris capturing device, <br />
              (to retake a picture, to capture or to Register the image)
            </p>
            <div className="flex justify-around">
              <button
                onClick={() => {
                  sendMessage("start_iris_scan");
                  setIrisCurrentScanning(true);
                  setLeftIrisSuccess("");
                  setRightIrisSuccess("");
                }}
                className="px-8 py-1.5 shadow-md hover:bg-primary border border-primary text-primary hover:text-white font-medium rounded self-center"
              >
                Retake
              </button>

              <button
                onClick={() => {
                  setIrisCurrentScanning(false);
                  sendMessage("stop_iris_scan");
                  //  we need to look for a better approch...
                  setTimeout(() => sendMessage("iris_submit"), 3000);
                  // sendMessage("iris_submit");
                }}
                className="px-8 py-1.5 shadow-md bg-primary hover:bg-prime50 text-white font-medium rounded self-center"
              >
                Capture
              </button>
              <button
                onClick={() => {
                  sendIris();
                }}
                className="px-8 py-1.5 shadow-md hover:bg-primary border border-primary text-primary hover:text-white font-medium rounded self-center"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IrisControls;
