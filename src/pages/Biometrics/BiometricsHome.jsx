import { useContext } from "react";
import avatarImage from "../../assets/images/avatar2.png";
import dbAcceptIcon from "../../assets/images/db.svg";
import biometricsIcon from "../../assets/images/bio.svg";
import { CgArrowLongRight, CgEyeAlt } from "react-icons/cg";
import { TbFingerprint } from "react-icons/tb";
import { MdOutlineFace } from "react-icons/md";
import { labourDatavar } from "../../apollo/store";
import { useQuery } from "@apollo/client";
import { GET_LABOR_BIOMETRIC_DATA } from "../../apollo/query";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import StatusNotification from "../../components/biometricsHome/StatusNotification";
import ServerContext from "../../context/ServerContext";
import { handleErrorMessage } from "../../components/utills/Helpers";
import FingerPrintLink from "../../components/biometricsHome/FingerPrintLink";
import IrisLink from "../../components/biometricsHome/IrisLink";
import FaceScanLink from "../../components/biometricsHome/FaceScanLink";

const BiometricsHome = () => {
  const [laborBiometricsStatus, setLaborBiometricsStatus] = useState({
    face_completed: false,
    iris_completed: false,
    fingerprint_completed: false,
  });

 useQuery(
    GET_LABOR_BIOMETRIC_DATA,
    {
      variables: {
        id: labourDatavar()?.id,
      },
      onError(error) {
        toast.error(handleErrorMessage(error, "Something went wrong"));
      },
      onCompleted(data) {
        let laborBiometricsData = data?.registration_namespace?.labors_by_pk;
        const { biometrics_id, ...rest } = laborBiometricsData;

        setLaborBiometricsStatus({
          ...rest,
        });
      },
    }
  );

  const { status,  ws } = useContext(ServerContext);

  const calcPercentage = () => {
    let count = 0;
    Object.keys(laborBiometricsStatus).forEach(function (key, index) {
      if (laborBiometricsStatus[key] === true) {
        count++;
      }
    });

    if (count === 1) {
      return "before:w-20";
    } else if (count === 2) {
      return "before:w-40";
    } else if (count === 3) {
      return "before:w-56";
    } else {
      return "";
    }
  };

  // to send labor id to the server by looking at status
  useEffect(() => {
    // if status is tru send labor id
    if (status) {
      ws.send(`ID:${labourDatavar().id}`);
    }
  }, [status]);

  return (
    <>
      <div className="h-full w-full flex flex-col justify-between">
        <StatusNotification />

        <div className="w-3/5 h-biometric">
          <div className="bg-white pr-4 layout -mt-10 mb-8 2xl:mb-14 2xl:mt-8 border-b border-b-dark/10 3xl:scale-[1.1]">
            <div className="flex items-center justify-around py-4">
              <div className="flex items-center space-x-4">
                {/* check if the labor has profile picture */}
                {labourDatavar()?.profile_picture ? (
                  <img
                    src={
                      process.env.REACT_APP_MEDIA_SERVICE +
                      labourDatavar()?.profile_picture
                    }
                    alt="avatar"
                    className="w-16 h-16 border-2 border-primary p-[1px] rounded-full"
                  />
                ) : (
                  <img src={avatarImage} alt="avatar" className="w-16" />
                )}

                <div>
                  {labourDatavar() && (
                    <h3 className="text-primary font-semibold capitalize">
                      {labourDatavar()?.first_name}{" "}
                      {labourDatavar()?.father_name}{" "}
                      {labourDatavar()?.grand_father_name}
                    </h3>
                  )}

                  <p className="text-xs text-dark  uppercase">
                    ID: {labourDatavar()?.biometrics_id}
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-4 capitalize w-2/5">
                <div className="flex items-end space-x-4">
                  <img src={dbAcceptIcon} alt="accept" className="w-6" />
                  <div>
                    <h4 className="mb-1 text-dark text-xs">
                      personal information data
                    </h4>
                    <div className="progress h-4 w-56 bg-lightGray rounded-sm overflow-hidden before:w-56 before:h-4 before:bg-primary relative before:absolute"></div>
                  </div>
                </div>
                <div className="flex items-end space-x-4">
                  <img src={biometricsIcon} alt="biometric" className="w-6" />
                  <div>
                    <h4 className="mb-1 text-dark text-xs">biometrics data</h4>
                    <div
                      className={`progress h-4 w-56 bg-lightGray  ${calcPercentage()} overflow-hidden before:h-4 before:bg-red relative before:absolute rounded-sm`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="layout mb-28">
            <h2 className="text-center 2xl:text-lg 3xl:text-xl text-dark/50 capitalize font-semibold mb-4 2xl:mb-12 3xl:mb-16 ">
              registration steps
            </h2>
            <div className="flex items-center justify-center space-x-4 mx-auto 3xl:scale-[1.3] ">
              {/* face */}
              <div className="bg-white overflow-hidden flex items-center w-48 h-full space-x-2 shadow-md rounded-md">
                <div
                  className={
                    "text-white py-5 px-2" +
                    (laborBiometricsStatus?.face_completed
                      ? " bg-green"
                      : " bg-primary")
                  }
                >
                  <MdOutlineFace className="text-2xl" />
                </div>
                <div className="pr-2">
                  <h3 className="capitalize">face scanning</h3>
                  {/* check if face is completed */}
                  {laborBiometricsStatus?.face_completed ? (
                    <span className="text-xs text-green">Completed</span>
                  ) : (
                    <span className="text-xs text-dark">Not completed</span>
                  )}
                </div>
              </div>
              <CgArrowLongRight className="text-2xl text-dark/30" />
              {/* iris */}
              <div className="bg-white overflow-hidden flex items-center w-48 h-full space-x-2 shadow-md rounded-md">
                <div
                  className={
                    "text-white py-5 px-2" +
                    (laborBiometricsStatus?.iris_completed
                      ? " bg-green"
                      : " bg-primary")
                  }
                >
                  <CgEyeAlt className="text-2xl" />
                </div>
                <div className="pr-2">
                  <h3 className="capitalize">iris scanning</h3>
                  {/* check if iris is completed */}
                  {laborBiometricsStatus?.iris_completed ? (
                    <span className="text-xs text-green">Completed</span>
                  ) : (
                    <span className="text-xs text-dark">Not completed</span>
                  )}
                </div>
              </div>
              <CgArrowLongRight className="text-2xl text-dark/30" />
              {/* finger print */}
              <div className="bg-white overflow-hidden flex items-center w-44 h-full space-x-2 shadow-md rounded-md">
                <div
                  className={
                    "text-white py-5 px-2" +
                    (laborBiometricsStatus?.fingerprint_completed
                      ? " bg-green"
                      : " bg-primary")
                  }
                >
                  <TbFingerprint className="text-2xl " />
                </div>
                <div className="pr-2">
                  <h3 className="capitalize">fingerprint Scanning</h3>
                  {/* check if finger is completed */}
                  {laborBiometricsStatus?.fingerprint_completed ? (
                    <span className="text-xs text-green">Completed</span>
                  ) : (
                    <span className="text-xs text-dark">Not completed</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Links section */}
        <div className="bg-gradient-to-br to-prime20 from-prime10 h-20 3xl:h-full w-full rounded-b-2xl -mt-16">
          <div className="flex w-[67%] items-start justify-around -translate-y-[50%] 3xl:-translate-y-1/3">
            {/* face  */}
           <FaceScanLink laborBiometricsStatus={laborBiometricsStatus} />
            {/* iris */}
            <IrisLink laborBiometricsStatus={laborBiometricsStatus} />
            {/* finger print */}
            <FingerPrintLink   laborBiometricsStatus={laborBiometricsStatus} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BiometricsHome;
