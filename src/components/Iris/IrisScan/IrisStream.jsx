import { useEffect, useContext } from "react";
import Eye from "../../../assets/svgs/eye-temp.svg";
import NoEye from "../../../assets/svgs/no-eye.svg";
import ServerContext from "../../../context/ServerContext";
import scanning from "../../../assets/lotty/scanning.json";
import success from "../../../assets/lotty/success.json";
import VerifiedLotty from "../../shared/VerifiedLotty";

const IrisStream = () => {
  const {
    sendMessage,
    leftEyePreview,
    rightEyePreview,
    leftEyeToggle,
    rightEyeToggle,
    rightIris,
    leftIris,
    irisCurrentScanning,
    leftIrisSuccess,
    RightIrisSuccess,
  } = useContext(ServerContext);
  useEffect(() => {
    if (rightIris && leftIris) {
      sendMessage("start_iris_scan");
    } else if (!rightIris && leftIris) {
      sendMessage("start_onlyleftiris_scan");
    } else if (rightIris && !leftIris) {
      sendMessage("start_onlyrightiris_scan");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-[55%] rounded-md flex justify-center gap-8 w-full">
      <div className="relative rounded-2xl bg-gray  overflow-hidden shadow-md w-1/2 flex justify-center items-center">
        <img
          className=""
          src={rightEyePreview ? rightEyePreview : rightEyeToggle ? Eye : NoEye}
          alt="Eye Demo"
        />
        {irisCurrentScanning && (
          <div className="absolute top-0 left-0 w-full h-full  flex justify-center items-center">
            <VerifiedLotty width="650px" lotty={scanning} />
          </div>
        )}
      </div>
      <div className="relative rounded-2xl bg-gray  overflow-hidden shadow-md w-1/2 flex justify-center items-center">
        <img
          className=""
          src={leftEyePreview ? leftEyePreview : leftEyeToggle ? Eye : NoEye}
          alt="Eye Demo"
        />

        {irisCurrentScanning && (
          <div className="absolute top-0 left-0 w-full h-full  flex justify-center items-center">
            <VerifiedLotty width="650px" lotty={scanning} />
          </div>
        )}
        {!irisCurrentScanning && leftIrisSuccess === "bad" ? (
          <div className="absolute top-0 left-0 bg-[#FF0000] w-full h-full opacity-50  flex flex-col justify-center items-center">
            <p className="text-white uppercase text-lg -mb-8">left eye</p>{" "}
            <br />
            <p className="text-white uppercase text-bold font-bold text-2xl">
              Unqualified
            </p>
          </div>
        ) : (
          leftIrisSuccess === "good" && (
            <div className="absolute top-0 left-0 opacity-98 w-full h-full  flex justify-center items-center">
              <VerifiedLotty width="200px" lotty={success} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default IrisStream;
