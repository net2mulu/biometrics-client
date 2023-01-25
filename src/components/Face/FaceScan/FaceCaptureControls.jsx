import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
//assets
import RightFace from "../../../assets/images/right-face.png";
import FrontFace from "../../../assets/images/front-face.png";
import LeftFace from "../../../assets/images/left-face.png";

// import { SideBySideMagnifier } from "react-image-magnifiers";
import { useMutation } from "@apollo/client";
import { trackPromise } from "react-promise-tracker";
import CameraContext from "../../../context/CameraContext";
import { FACE_REGISTER } from "../../../apollo/mutation";
import { faceDataVar, labourDatavar } from "../../../apollo/store";
import { handleErrorMessage } from "../../utills/Helpers";

const FaceCaptureControls = () => {
    const {
        takePicture,
        frontFace,
        leftFace,
        rightFace,
        setCaptureMode,
        captureMode,
        setLeftFace,
        setRightFace,
        setFrontFace,
        stopMediaTracks,
        currentStream,
      } = useContext(CameraContext);
      const [face_register, { loading: face_reg_loading }] =
        useMutation(FACE_REGISTER);
    
      // state variables
      const navigate = useNavigate();
    
      const hitApi = () => {
        trackPromise(face_register({
          variables: {
            labor_id: labourDatavar().id,
            left_photo: leftFace,
            right_photo: rightFace,
            middle_photo: frontFace,
          },
          onCompleted(data) {
            let faceData = data?.faceRegister?.data;
            setLeftFace(null);
            setRightFace(null);
            setFrontFace(null);
            // set face registration returned data
            faceDataVar(faceData);
            toast.success("image uploaded sent to server!");
            stopMediaTracks(currentStream);
            navigate("/biometric");
          },
          onError(err) {
            const error = `${err}`.split(":").reverse()[0];
            toast.error(handleErrorMessage(err, error));
          },
        }))
      };
      return (
        <>
          <div className="flex flex-col relative border-2 border-primary rounded-2xl w-1/4">
            <div className="flex flex-col justify-between space-x-2 items-center w-full pt-4 2xl:mt-12 px-2">
              <div className="flex flex-col  space-y-2 items-center">
                <img
                  onClick={() => {
                    setLeftFace(null);
                    setCaptureMode("left");
                  }}
                  className={`bg-N80 cursor-pointer shadow-md rounded w-28 z-10 ${
                    captureMode === "left"
                      ? "outline-2 outline-offset-2 outline outline-green"
                      : ""
                  }`}
                  src={leftFace ? leftFace : LeftFace}
                  alt="Right Face"
                />
    
                {/* <SideBySideMagnifier
               onClick={() => setCaptureMode("left")}
              className={`bg-N80 cursor-pointer shadow-md rounded w-28 z-10 ${captureMode === "left" ? "outline-2 outline-offset-2 outline outline-green" : ""}`}
              imageSrc={leftFace ? leftFace : LeftFace}
              imageAlt="leftFace"
              magnifierSize="100%"
              square
            /> */}
                <p className="text-primary text">Left</p>
              </div>
              <div className="flex flex-col space-y-2 items-center">
                <img
                  onClick={() => {
                    setFrontFace(null);
                    setCaptureMode("front");
                  }}
                  className={`bg-N80 cursor-pointer shadow-md rounded w-40 z-10 ${
                    captureMode === "front"
                      ? "outline-2 outline-offset-2 outline outline-green"
                      : ""
                  }`}
                  src={frontFace ? frontFace : FrontFace}
                  alt="Right Face"
                />
                <p className="text-primary text">Front</p>
              </div>
              <div className="flex flex-col space-y-2 items-center">
                <img
                  onClick={() => {
                    setRightFace(null);
                    setCaptureMode("right");
                  }}
                  className={`bg-N80 cursor-pointer shadow-md rounded w-28 z-10 ${
                    captureMode === "right"
                      ? "outline-2 outline-offset-2 outline outline-green"
                      : ""
                  }`}
                  src={rightFace ? rightFace : RightFace}
                  alt="Right Face"
                />
                <p className="text-primary text">Right</p>
              </div>
            </div>
            <div className="w-full p-4 2xl:p-6 rounded-b-md flex justify-center items-center">
              {leftFace && rightFace && frontFace ? (
                <button
                  onClick={() => hitApi()}
                  className="bg-primary rounded font-medium text-sm text-white px-10 py-1.5"
                >
                  Register
                </button>
              ) : (
                <button
                  onClick={() => takePicture()}
                  className="bg-primary rounded font-medium text-sm text-white px-10 py-1.5"
                >
                  Capture
                </button>
              )}
              {face_reg_loading && (
                <div className="flex items-center absolute top-0  z-10 left-0 w-full  justify-center h-full bg-N30/20 backdrop-blur-[2px]">
                  <div className="">
                    <span className="loader"></span>
                  </div>
                </div>
              )}
            </div>
          </div>
    
         </>
      );
    };
export default FaceCaptureControls