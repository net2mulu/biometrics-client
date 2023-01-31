import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";
import { labourDatavar } from "../../apollo/store";

const BreadCrumb = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(labourDatavar())

  const breadCrumpData = [
    {
      label: "Home",
      link: "/",
      isHome: true,
    },
    {
      label: labourDatavar().first_name+" "+labourDatavar().father_name,
      link: "/biometrics-home",
    },
    {
      label: pathname.substring(1),
      link: pathname,
    },
  ];
  return (
    <div>
      <ul className="flex items-center space-x-2 text-prime20 shadow-md text-sm  px-3 py-4 rounded-md capitalize bg-white">
        {breadCrumpData.map((item, index) => (
          <React.Fragment key={index}>
            {item.isHome ? (
              <>
                <li
                  className="flex cursor-pointer items-center space-x-2"
                  onClick={(e) => navigate(item.link)}
                >
                  <FaHome className="text-primary text-lg" />
                  <p>{item.label}</p>
                </li>
              </>
            ) : (
              <>
                <BsChevronRight className="text-prime20/60 text-xs" />
                <li
                  className="cursor-pointer"
                  onClick={(e) => navigate(item.link)}
                >
                  {item.label}
                </li>
              </>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default BreadCrumb;
