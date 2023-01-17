import { usePromiseTracker } from "react-promise-tracker";
const Loader = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <>
      {promiseInProgress && (
        <div className="z-50 flex items-center absolute top-0  left-0 w-full  justify-center h-full bg-N30/20 backdrop-blur-[2px]">
          <div className="-translate-y-full">
            <span className="loader"></span>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
