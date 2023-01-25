import { useContext, useEffect } from "react";
import FaceHologram from "../../../assets/images/Group.png";
import CameraContext from "../../../context/CameraContext";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./utill";

const FaceStream = () => {
  const {
    feedRef,
    captureMode,
    imageRef,
    feedWidth,
    feedHeight,
    currentStream,
  } = useContext(CameraContext);

  //  Load posenet
  const runFacemesh = async () => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (typeof feedRef.current !== "undefined") {
      const face = await net.estimateFaces({ input: feedRef.current });
      const ctx = imageRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
    }
  };

  useEffect(() => {
    runFacemesh();
  }, []);

  return (
    <div className="relative flex justify-center w-full items-center">
      <div className=" flex  rounded-2xl  h-full   flex-col justify-center items-center absolute z-0">
        <canvas
          style={{ display: captureMode && "none" }}
          className="rounded-2xl z-[60] bg-black"
          width={feedWidth}
          height={feedHeight}
          ref={imageRef}
        ></canvas>
        <video className="rounded-2xl relative" ref={feedRef}></video>
      </div>
      <div className="relative flex justify-center items-center z-10">
        <img
          src={FaceHologram}
          className="object-contain h-[700px] w-[500px]"
          alt="Face Loading Hologram"
        />
      </div>
    </div>
  );
};

export default FaceStream;
