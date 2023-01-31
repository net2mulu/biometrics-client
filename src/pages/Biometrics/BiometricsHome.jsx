import { useEffect, useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { labourDatavar } from "../../apollo/store";
import { GET_LABOR_BIOMETRIC_DATA } from "../../apollo/query";
import ServerContext from "../../context/ServerContext";
//components
import StatusNotification from "../../components/biometricsHome/StatusNotification";
import { handleErrorMessage } from "../../components/utills/Helpers";
import FingerPrintLink from "../../components/biometricsHome/FingerPrintLink";
import IrisLink from "../../components/biometricsHome/IrisLink";
import FaceScanLink from "../../components/biometricsHome/FaceScanLink";
import RegistrationSteps from "../../components/biometricsHome/RegistrationSteps";
import LaborStatus from "../../components/biometricsHome/LaborStatus";
import CameraContext from "../../context/CameraContext";

const BiometricsHome = () => {
  const [laborBiometricsStatus, setLaborBiometricsStatus] = useState({
    face_completed: false,
    iris_completed: false,
    fingerprint_completed: false,
  });

  useQuery(GET_LABOR_BIOMETRIC_DATA, {
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
  });

  const { status, ws } = useContext(ServerContext);
  const { devices } = useContext(CameraContext);
  console.log(devices.length);

  // to send labor id to the server by looking at status
  useEffect(() => {
    // if status is tru send labor id
    if (status) {
      ws.send(`ID:${labourDatavar().id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <div className="body-height z-20 bg-white rounded-2xl shadow-custom">
        <div className="h-full w-full flex flex-col justify-between">
          <StatusNotification />
          <div className="w-3/5 h-biometric">
            {/* labor status */}
            <LaborStatus laborBiometricsStatus={laborBiometricsStatus} />
            {/* reg steps */}
            <RegistrationSteps laborBiometricsStatus={laborBiometricsStatus} />
          </div>
          {/* Links section */}
          <div className="bg-gradient-to-br to-prime20 from-prime10 h-20 3xl:h-full w-full rounded-b-2xl -mt-16">
            <div className="flex w-[67%] items-start justify-around -translate-y-[50%] 3xl:-translate-y-1/3">
              {/* face  */}
              <FaceScanLink laborBiometricsStatus={laborBiometricsStatus} />
              {/* iris */}
              <IrisLink laborBiometricsStatus={laborBiometricsStatus} />
              {/* finger print */}
              <FingerPrintLink laborBiometricsStatus={laborBiometricsStatus} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BiometricsHome;
