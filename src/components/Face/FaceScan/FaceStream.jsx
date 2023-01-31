import { useContext } from "react";
import FaceHologram from "../../../assets/images/Group.png";
import CameraContext from "../../../context/CameraContext";

const FaceStream = () => {
  const { feedRef, captureMode, imageRef, feedWidth, feedHeight } =
    useContext(CameraContext);

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
