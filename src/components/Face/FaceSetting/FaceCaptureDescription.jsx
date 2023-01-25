import { useNavigate } from "react-router-dom";
import { BsCameraFill, BsFillCloudDownloadFill } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import FaceRegistrationAmico from "../../../assets/svgs/FaceRegistrationAmico.svg";

const FaceCaptureDescription = ({ disabled }) => {
  const navigate = useNavigate();
  // const { ws } = useContext(ServerContext);

  const handleStart = () => {
    // ws.send(msg);
    navigate("/face-scan");
  };
  return (
    <div className="bg-white w-full px-4 py-4 flex justify-between items-center rounded-lg shadow-lg">
      <div className="text-darkBlue flex flex-col justify-between relative  space-y-2 w-2/5">
        <div className="border-r border-dashed border-N80 h-4/5 w-0 top-2 left-[3.2%] absolute" />
        <div className="flex items-start space-x-4 z-10 h-[4rem]">
          {/* <img className="w-8" src={CameraIcon} alt="Camera Icon" /> */}
          <div className=" bg-Prime99 p-2 rounded-full">
            <BsCameraFill className="text-xl" />
          </div>
          <div>
            <h3 className="font-semibold capitalize mb-1">Capturing</h3>
            <p className="text-xs text-dark">
              The formost requirement is to capture the image and that can be
              done using camera
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 z-10 h-[4rem]">
          {/* <img className="w-8" src={DownloadIcon} alt="Downloading Icon" /> */}
          <div className=" bg-Prime99 p-2 rounded-full">
            <BsFillCloudDownloadFill className="text-xl" />
          </div>
          <div>
            <h3 className="font-semibold capitalize mb-1">Extracting Data</h3>
            <p className="text-xs text-dark">
              Unique facial data is then extracted from the sample
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 z-10 h-[4rem]">
          {/* <img className="w-8" src={CompleteIcon} alt="Completed Icon" /> */}
          <div className="bg-Prime99 p-2 rounded-full">
            <BiCheck className="text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-green capitalize mb-1">
              Complete Registering
            </h3>
            <p className="text-xs text-dark">
              The software the decided weather the sample matchs any picture in
              the database or not.
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/6">
        <img src={FaceRegistrationAmico} alt="Illustration" />
      </div>
      <div className=" w-4/12 space-y-4 flex flex-col items-center">
        <p className="text-primary font-semibold text-md text-center">
          Biometrics process
        </p>
        <p className="text-N50 text-xs text-center w-4/5">
          The processes are taking four major steps to identify and register the
          user.
        </p>
        <button
          className={`${
            disabled ? "bg-primary/25" : "bg-primary hover:bg-prime30"
          }  text-white font-medium px-10 py-1.5 rounded cursor-pointer  }`}
          disabled={disabled}
          onClick={() => handleStart()}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default FaceCaptureDescription;
