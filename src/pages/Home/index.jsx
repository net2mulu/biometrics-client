import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
//global vars
import { labourDatavar } from "../../apollo/store";
import { LABOR_BY_BIOMETRICS_ID } from "../../apollo/mutation";
//icons
import { FaSearch } from "react-icons/fa";
//assets
import folderImage from "../../assets/svgs/folder.svg";
//components
import Button from "../../components/shared/Button";
import { trackPromise } from "react-promise-tracker";
import ResultNotFound from "../../components/home/ResultNotFound";
import Result from "../../components/home/Result";

const Home = () => {
  const navigate = useNavigate();

  // state variable
  const [result, setResult] = useState(false);
  const [biometricsId, setbiometricsId] = useState();

  // apollo mutation
  const [getLabourByBiometricsId, { data: labourData }] = useLazyQuery(
    LABOR_BY_BIOMETRICS_ID
  );

  const handleSearch = (e) => {
    if (biometricsId) {
      trackPromise(
        getLabourByBiometricsId({
          variables: {
            _eq: biometricsId ? biometricsId : null,
          },
          onCompleted(data) {
            setResult(true);
            // set selected labour data
            labourDatavar(data?.registration_namespace?.labors[0]);
          },
          onError(data) {},
        })
      );
    }
  };

  const gotoBiometrics = () => {
    // if (ws && ws.readyState === 1) {
    //   ws.send(`ID:${labourDatavar().id}`);
    //   // since we are also trying to send an id to the server on the next path(/biometrics), having this is causing some errors like websocket is on closing state
    //   // ws.close();
    // }
    navigate("/biometrics-home");
  };

  // functio that runs  when a key is pressed
  const handleOnKeyDown = (e) => {
    if (e.code === "Enter") {
      handleSearch(e);
    }
  };

  useEffect(() => {}, [result]);

  return (
    <>
      <div
        className={`body-height py-6 z-20 bg-white rounded-2xl shadow-custom`}
      >
        <div>
          <div className="flex bg-darkBlue max-w-6xl w-3/5 rounded-md space-x-2 mx-auto mb-6 3xl:mb-16 p-1 ">
            <input
              type="text"
              className="w-full p-2 outline-none rounded-md"
              placeholder="Confirmation number"
              onChange={(e) => {
                setbiometricsId(e.target.value);
                setResult(false);
              }}
              onKeyDown={(e) => handleOnKeyDown(e)}
            />
            <Button custom="text-white" onClick={(e) => handleSearch(e)}>
              <FaSearch />
            </Button>
          </div>

          {result && (
            <div className="bg-lightGray/50 w-full py-6 px-24 mb-6">
              <div className="flex bg-white py-6 px-12 max-w-3xl mx-auto shadow-custom rounded-xl items-center justify-between relative">
                {labourData?.registration_namespace?.labors?.length > 0 ? (
                  <Result
                    labourData={labourData}
                    gotoBiometrics={gotoBiometrics}
                    setResult={setResult}
                  />
                ) : (
                  <ResultNotFound setResult={setResult} />
                )}
              </div>
            </div>
          )}
          <div className="grid gap-4 3xl:gap-8 md:grid-cols-2 lg:grid-cols-3  px-12 mx-auto">
            <div
              className="flex cursor-pointer justify-between hover:bg-N99/50 transition duration-200 ease-in items-center space-x-4 border-l-primary border-l-8 rounded-lg bg-white shadow-custom p-2 lg:p-4 3xl:py-8"
              onClick={(e) => navigate("/biometrics-completed-labors")}
            >
              <img className="w-24" src={folderImage} alt="folder" />
              <div>
                <h3 className="font-semibold mb-2 text-primary capitalize 3xl:text-xl">
                  Labors who completed biometrics
                </h3>
                <p className="text-dark text-sm 3xl:text-base">
                  labors assisted by the current ossc to complete their
                  biometrics registration
                </p>
              </div>
            </div>

            <div
              className="flex cursor-pointer justify-between hover:bg-N99/50 transition duration-200 ease-in items-center space-x-4 border-l-primary border-l-8 rounded-lg bg-white shadow-custom p-2 lg:p-4 3xl:py-8"
              onClick={(e) => navigate("/registered-labors")}
            >
              <img className="w-24" src={folderImage} alt="folder" />
              <div>
                <h3 className="font-semibold mb-2 text-primary capitalize 3xl:text-xl">
                  Labors registered by the current ossc
                </h3>
                <p className="text-dark text-sm 3xl:text-base">
                  Total registered labors for total statistics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
