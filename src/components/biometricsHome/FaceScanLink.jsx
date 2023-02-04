import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FaceImage from "../../assets/svgs/face.svg";
import ServerContext from "../../context/ServerContext";
import CameraContext from "../../context/CameraContext";

const FaceScanLink = ({ laborBiometricsStatus }) => {
  const { status } = useContext(ServerContext);
  const { devices } = useContext(CameraContext);

  const navigate = useNavigate();
  return (
    <div
      className={`bg-white ${
        !status || devices.length <= 1 || laborBiometricsStatus.face_completed
          ? "disconnected"
          : ""
      } py-4 3xl:py-8 3xl:px-16 px-8 relative text-primary font-semibold rounded-md shadow-custom flex  flex-col items-center justify-center cursor-pointer`}
      onClick={() =>
        status && !laborBiometricsStatus.face_completed && devices.length > 1
          ? navigate("/face-setting")
          : laborBiometricsStatus.face_completed
          ? toast.error("The labor is already registered by face!", {
              position: "top-left",
            })
          : !status
          ? toast.error("Kit Software Not Opened!", {
              position: "top-left",
            })
          : devices.length <= 1 &&
            toast.error("No camera Detected1", {
              position: "top-left",
            })
      }
    >
      <div className="bg-N99 opacity-0 invisible duration-400 text-N30 shadow-lg disconnected-tooltip rounded-md -top-[26%] text-center px-3 pt-1 font-medium  pb-4 text-xs 3xl:text-sm absolute">
        Server Connection or Hardware Device Is
        <b className="text-error40">Disconnected</b>
      </div>
      <img
        src={FaceImage}
        alt="Face"
        className={`${
          !status || devices.length <= 1 || laborBiometricsStatus.face_completed
            ? "opacity-20"
            : ""
        } mb-6 w-16 xl:w-18 3xl:w-28 4xl:w-32`}
      />
      <h3
        className={`${
          !status || devices.length <= 1 || laborBiometricsStatus.face_completed
            ? "text-gray"
            : ""
        } text-lg text-primary capitalize text-center`}
      >
        face camera
      </h3>
    </div>
  );
};

export default FaceScanLink;
