import { CgArrowLongRight, CgEyeAlt } from "react-icons/cg";
import { TbFingerprint } from "react-icons/tb";
import { MdOutlineFace } from "react-icons/md";

const RegistrationSteps = ({laborBiometricsStatus}) => {
  return (
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
  )
}

export default RegistrationSteps