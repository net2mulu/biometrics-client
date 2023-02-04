import { useContext } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import ServerContext from "../../../context/ServerContext";
import ToggleButton from "../../shared/ToggleButton";

const IrisToggle = () => {
  const {
    leftIris,
    rightIris,
    setRightIris,
    setLeftIris,
    leftEyeToggle,
    setLeftEyeToggle,
    rightEyeToggle,
    setRightEyeToggle,
  } = useContext(ServerContext);

  const ToggleLeftEye = () => {
    setLeftEyeToggle((prev) => !prev);
    setLeftIris(!leftIris);
  };

  const ToggleRightEye = () => {
    setRightEyeToggle((prev) => !prev);
    setRightIris(!rightIris);
  };

  return (
    <div className="h-[48%] w-full flex justify-between items-center px-12 space-x-12 overflow-hidden border border-primary rounded-md">
      <div className="flex flex-col justify-center items-center w-1/2 cursor-pointer h-full">
        {leftEyeToggle ? (
          <BsFillEyeFill
            onClick={ToggleLeftEye}
            className="text-[10rem] opacity-40 transition ease-in-out delay-150"
          />
        ) : (
          <BsFillEyeSlashFill
            onClick={ToggleLeftEye}
            className="text-[10rem] opacity-25 transition ease-in-out delay-150"
          />
        )}
        <p>Left Eye</p>
        <ToggleButton toggle={leftIris} onchange={() => ToggleLeftEye()} />
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 cursor-pointer h-full">
        {rightEyeToggle ? (
          <BsFillEyeFill
            onClick={ToggleRightEye}
            className="opacity-40 text-[10rem]"
          />
        ) : (
          <BsFillEyeSlashFill
            onClick={ToggleRightEye}
            className="opacity-25 text-[10rem]"
          />
        )}
        <p>Right Eye</p>
        <ToggleButton toggle={rightIris} onchange={() => ToggleRightEye()} />
      </div>
    </div>
  );
};

export default IrisToggle;
