import React from "react";
import BreadCrumb from "../shared/BreadCrumb";
import SideOptions from "../shared/SideOptions";
import IrisSideOptions from "./IrisSideOptions";

const IrisLayout = ({ children }) => {
  return (
    <div className="flex justify-between gap-4 flex-row minfour">
      <div className="flex flex-col w-full justify-between gap-2">
        <div className="w-11/12 flex items-start">
          <BreadCrumb />
        </div>
        {/* page content here */}
        {children}
      </div>

      <div className="min-w-[6rem] w-[7rem] h-full">
        <SideOptions>
          <IrisSideOptions />
        </SideOptions>
      </div>
    </div>
  );
};

export default IrisLayout;
