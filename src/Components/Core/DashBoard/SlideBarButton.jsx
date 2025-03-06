import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import * as Icons from "react-icons/fa";


const SlideBarButton = ({ icon, path, name }) => {
  const Icon = Icons[icon];

  const location = useLocation()

  function matchroute(route) {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <Link to={path}>
      <div
        className={`w-full flex gap-x-2 py-2 text-richblack-300  text-base font-inter items-center  ${
          matchroute(path) && " bg-yellow-800 opacity-60 border-yellow-50 border-l-[3px] text-yellow-50"
        } `}
      >
        {Icon ? <Icon /> : <div className="text-red-500">⚠️</div>}
        <div className="">{name}</div>
      </div>
    </Link>
  );
};

export default SlideBarButton;
