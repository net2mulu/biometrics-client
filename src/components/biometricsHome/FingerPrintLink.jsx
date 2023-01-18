import  { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ServerContext from "../../context/ServerContext";
import FingerPrintImage from "../../assets/images/fingerprint.svg";

const FingerPrintLink = ({ type, laborBiometricsStatus, image, term }) => {
  const { status, fpMachineStatus } = useContext(ServerContext);
  const navigate = useNavigate();
  return (
    <div
      className={`bg-white ${
        !status ||
        fpMachineStatus !== "fpon" ||
        laborBiometricsStatus.fingerprint_completed
          ? "disconnected"
          : ""
      } py-4 3xl:py-8 3xl:px-16 px-8 relative text-primary font-semibold rounded-md shadow-custom flex  flex-col items-center justify-center cursor-pointer`}
      onClick={() =>
        status && !laborBiometricsStatus.fingerprint_completed
          ? navigate("/fingerprint")
          : laborBiometricsStatus.fingerprint_completed
          ? toast.error("The labor is already registered by fingerprint!", {
              position: "top-left",
            })
          : !fpMachineStatus !== "fpon" &&
            toast.error("Fingerprint machine is Not Working!", {
              position: "top-left",
            })
      }
    >
      <div className="bg-N99 opacity-0 invisible duration-400 text-N30 shadow-lg disconnected-tooltip rounded-md -top-[26%] text-center px-3 pt-1 font-medium  pb-4 w-full text-xs 3xl:text-sm absolute">
        Server Connection or Hardware Device Is
        <b className="text-error40">Disconnected</b>
      </div>
      <img
        src={FingerPrintImage}
        alt="fingerprint"
        className={`${
          !status ||
          fpMachineStatus !== "fpon" ||
          laborBiometricsStatus.fingerprint_completed
            ? "opacity-20"
            : ""
        } mb-6 w-16 xl:w-18 3xl:w-28 4xl:w-32`}
      />
      <h3
        className={`${
          !status ||
          fpMachineStatus !== "fpon" ||
          laborBiometricsStatus.fingerprint_completed
            ? "text-gray"
            : ""
        } text-lg text-primary capitalize text-center`}
      >
        Finger Print
      </h3>
    </div>
  );
};

export default FingerPrintLink;
