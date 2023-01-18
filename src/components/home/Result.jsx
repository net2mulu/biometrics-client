import { useContext } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import avatarImage from "../../assets/images/avatar2.png";
import { ModalContext } from "../../hooks/modalContext";
import Button from "../shared/Button";
import PhotoViewModal from "./PhotoViewModal";

const Result = ({ setResult, gotoBiometrics, labourData }) => {
  let { handleModal } = useContext(ModalContext);
  return (
    <>
      <AiOutlineClose
        className="absolute top-2 right-2 text-base text-red cursor-pointer"
        onClick={() => setResult(false)}
      />
      <div className="flex items-center space-x-4">
        {/* profile picture */}
        {labourData.registration_namespace?.labors[0]?.profile_picture ? (
          <div className="relative">
            <img
            src={
              process.env.REACT_APP_MEDIA_SERVICE +
              labourData.registration_namespace?.labors[0]?.profile_picture
            }
            alt="avatar"
            className="cursor-pointer h-20 mx-auto object-cover w-20 rounded-full scale-100 hover:scale-110 ease-in duration-200"
            width={60}
            height={60}
            onClick={() =>
              handleModal(
                <PhotoViewModal
                photo={
                  process.env.REACT_APP_MEDIA_SERVICE +
                  labourData.registration_namespace?.labors[0]
                  ?.profile_picture
                }
                />
                )
              }
              />
              </div>
        ) : (
          <img
            src={avatarImage}
            alt="avatar"
            className="border12"
            width={60}
            height={60}
          />
        )}
        <div>
          <h3 className="text-primary font-semibold mb-2 capitalize">
            {labourData.registration_namespace?.labors[0].first_name}{" "}
            {labourData.registration_namespace?.labors[0].father_name}
          </h3>
          <p className="text-xs text-dark">
            ID: {labourData.registration_namespace?.labors[0].biometrics_id}
          </p>
        </div>
      </div>

      <Button
        custom="bg-primary text-white flex items-center space-x-2 py-2"
        onClick={() => gotoBiometrics()}
      >
        <AiFillPlusSquare />
        <span>biometrics</span>
      </Button>
    </>
  );
};

export default Result;
