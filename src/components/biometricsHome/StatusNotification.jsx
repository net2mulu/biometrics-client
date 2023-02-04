import { useContext } from "react";
import NetworkImage from "../../assets/svgs/network.svg";
import ServerContext from "../../context/ServerContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
import CameraContext from "../../context/CameraContext";

const StatusNotification = () => {
  const { status, fpMachineStatus, irMachineStatus } =
    useContext(ServerContext);

  const { devices } = useContext(CameraContext);

  return (
    <div className="overflow-hidden z-20 text-white rounded-2xl shadow-custom fixed w-[25rem] 2xl:w-[32rem] scale-90 top-32 -right-1 3xl:h-[70%] h-[78%] bg-white">
      <div className="flex items-center space-x-4 bg-primary/20 p-4">
        <img src={NetworkImage} className="w-10" alt="network" />
        <h2 className="text-lg capitalize text-primary font-semibold flex items-center justify-between w-full">
          <span>biometrics status</span>
          <div className="connection-status flex justify-center items-center cursor-pointer h-8 w-8 bg-error40/20  rounded-full shadow-md z-40">
            <div
              className={`${
                status ? "bg-green40" : "bg-error40 animate-pulse"
              }  relative cursor-pointer h-4 w-4 rounded-full`}
            >
              {status ? (
                <span className="absolute top-[130%] opacity-0 invisible transition-all duration-400 ease-in-out connection-tooltip bg-green40 p-2 shadow-md rounded-md rounded-tr-none -left-[1010%] text-xs w-max text-white">
                  Connected with the kit
                </span>
              ) : (
                <span className="absolute  top-[130%]  opacity-0 invisible transition-all duration-400 ease-in-out connection-tooltip bg-gray p-2 shadow-md rounded-md rounded-tr-none -left-[866%] text-xs w-max text-N40">
                  Kit connection lost
                </span>
              )}
            </div>
          </div>
        </h2>
      </div>
      <div className="relative h-full">
        {status ? (
          " "
        ) : (
          <div className="flex items-center absolute top-0  z-10 left-0 w-full  justify-center h-full bg-N30/20 backdrop-blur-[2px]">
            <div className="-translate-y-full">
              <span className="loader"></span>
            </div>
          </div>
        )}
        <div className="py-4 px-8 flex items-start justify-between space-x-6">
          <div className="w-[10%] flex flex-col items-center justify-start -mt-2">
            {status && fpMachineStatus === "fpon" ? (
              <IoIosCheckmarkCircle className="text-green p-1 text-xl 2xl:text-2xl rounded-full my-2 bg-green/20" />
            ) : fpMachineStatus === "fpoff" ? (
              <IoIosCloseCircle className="text-red text-xl 2xl:text-2xl p-1 rounded-full my-2 bg-red/20" />
            ) : fpMachineStatus === "fp_unknown" ? (
              <AiOutlineLoading3Quarters className="animate-spin my-2 text-primary p-1 text-xl 2xl:text-2xl rounded-full bg-primary/20" />
            ) : (
              ""
            )}
            <div className="w-[2px] xl:h-16 2xl:h-11 h-12 bg-dark/30 mx-auto"></div>

            {/* iris */}
            {status && irMachineStatus === "iris_on" ? (
              <IoIosCheckmarkCircle className="text-green p-1 text-xl 2xl:text-2xl rounded-full my-2 bg-green/20" />
            ) : irMachineStatus === "iris_off" ? (
              <IoIosCloseCircle className="text-red text-xl 2xl:text-2xl p-1 rounded-full my-2 bg-red/20" />
            ) : irMachineStatus === "iris_unknown" ? (
              <AiOutlineLoading3Quarters className="animate-spin my-2 text-primary p-1 text-xl 2xl:text-2xl rounded-full bg-primary/20" />
            ) : (
              ""
            )}

            <div className="w-[2px] xl:h-12 2xl:h-11 h-12 bg-dark/30 mx-auto"></div>

            {/*  */}
            {status && devices.length > 1 ? (
              <IoIosCheckmarkCircle className="text-green p-1 text-xl 2xl:text-2xl rounded-full my-2 bg-green/20" />
            ) : devices.length <= 1 ? (
              <IoIosCloseCircle className="text-red text-xl 2xl:text-2xl p-1 rounded-full my-2 bg-red/20" />
            ) : !status ? (
              <AiOutlineLoading3Quarters className="animate-spin my-2 text-primary p-1 text-xl 2xl:text-2xl rounded-full bg-primary/20" />
            ) : (
              ""
            )}

            <div className="w-[2px] xl:h-12 lg:h-14 2xl:h-10 h-10 bg-dark/30 mx-auto"></div>

            {/*  */}
            {status && fpMachineStatus === "fpon" ? (
              <IoIosCheckmarkCircle className="text-green p-1 text-xl 2xl:text-2xl rounded-full my-2 bg-green/20" />
            ) : fpMachineStatus === "fpoff" ? (
              <IoIosCloseCircle className="text-red text-xl 2xl:text-2xl p-1 rounded-full my-2 bg-red/20" />
            ) : fpMachineStatus === "fp_unknown" ? (
              <AiOutlineLoading3Quarters className="animate-spin my-2 text-primary p-1 text-xl 2xl:text-2xl rounded-full bg-primary/20" />
            ) : (
              ""
            )}
          </div>
          <div className="w-11/12 text-darkBlue flex flex-col  gap-7">
            <div>
              <h3 className="font-semibold capitalize mb-1">
                fingerprint sensor
              </h3>
              <p className="text-xs text-dark">
                Finger print scanner is perfectly working is ready to read
                fingerprints
              </p>
            </div>
            <div>
              <h3 className="font-semibold capitalize mb-1">iris scanner</h3>
              <p className="text-xs text-dark">
                There is slight problem with Iris Scanner Please try refershing
                it or connect it again.
              </p>
            </div>
            <div>
              <h3 className="font-semibold capitalize mb-1">face camera</h3>
              <p className="text-xs text-dark">
                There is slight problem with Iris Scanner Please try refershing
                it or connect it again.
              </p>
            </div>
            <div>
              <h3 className="font-semibold capitalize mb-1">
                device driver integration
              </h3>
              <p className="text-xs text-dark">
                Some little information for the step here And so much more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusNotification;
