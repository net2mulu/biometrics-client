import React from "react";
import { TbFileAlert } from "react-icons/tb";
import Button from "../shared/Button";

const ResultNotFound = ({ setResult }) => {
  return (
    <>
      <div className="flex items-center space-x-6 ">
        <TbFileAlert className="text-error40 bg-error99 rounded-full p-3 text-6xl" />
        <div>
          <h3 className=" capitalize text-error40 font-semibold text-lg mb-">
            code not found
          </h3>
          <p className="text-dark">please try again, incorrect code</p>
        </div>
      </div>
      <Button
        onClick={() => setResult(false)}
        custom="text-error40 py-2 border border-error40"
      >
        Cancel
      </Button>
    </>
  );
};

export default ResultNotFound;
