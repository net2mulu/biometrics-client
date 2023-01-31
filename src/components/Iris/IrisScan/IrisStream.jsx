import React, { useEffect, useContext } from "react";
import Eye from "../../../assets/images/eye.jpg";
import ServerContext from "../../../context/ServerContext";

const IrisStream = () => {
  const { ws, leftEyePreview, rightEyePreview, rightIris, leftIris } =
    useContext(ServerContext);
  useEffect(() => {
    if (rightIris && leftIris) {
      ws.send("start_iris_scan");
    } else if (!rightIris && leftIris) {
      ws.send("start_onlyleftiris_scan");
    } else if (rightIris && !leftIris) {
      ws.send("start_onlyrightiris_scan");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-[55%] rounded-md flex justify-between gap-8">
      <div className="rounded-2xl overflow-hidden shadow-md">
        <img
          className="h-full w-full flipped"
          src={rightEyePreview ? rightEyePreview : Eye}
          alt="Eye Demo"
        />
      </div>
      <div className="rounded-2xl overflow-hidden shadow-md">
        <img
          className="h-full w-full "
          src={leftEyePreview ? leftEyePreview : Eye}
          alt="Eye Demo"
        />
      </div>
    </div>
  );
};

export default IrisStream;
