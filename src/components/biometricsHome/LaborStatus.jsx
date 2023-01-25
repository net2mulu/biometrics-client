import avatarImage from "../../assets/images/avatar2.png";
import dbAcceptIcon from "../../assets/svgs/db.svg";
import biometricsIcon from "../../assets/svgs/bio.svg";
import { labourDatavar } from '../../apollo/store'

const LaborStatus = ({laborBiometricsStatus}) => {
    
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

  return (
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
  )
}

export default LaborStatus