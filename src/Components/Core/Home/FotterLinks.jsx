import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import { Link } from "react-router-dom";

const FotterLinks = () => {
  return (
    <div className=" mx-auto flex w-[90%]  h-full">
      {/* left part */}
      <div className=" h-[85%] w-[50%] ">

      </div>

      {/* right part */}
      <div className=" h-[85%] my-auto w-[50%]  border-l border-richblack-400  flex justify-evenly ">
        {
            FooterLink2.map( ( footer , index)=>(
                <div className="flex flex-col " key={index}>
                    <p className="text-white text-lg font-semibold">{footer.title}</p>
                    <div className="mt-5 space-y-[.4rem] flex flex-col">{
                        footer.links.map((singleLink , index)=>(
                            <Link to={singleLink.link} key={index} className=" text-sm text-richblack-400">{singleLink.title}</Link>
                        ))
                    }</div>
                </div>
            ))
        }
      </div>
    </div>
    
  );
};

export default FotterLinks;
