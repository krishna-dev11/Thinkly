import { PiQuotesFill } from "react-icons/pi";
import Hieghlightedtext from "../Home/Hieghlightedtext";



const QuoteSection = () => {
  return (


    <div className="flex flex-wrap gap-2 py-40 px-4 mx-auto justify-center w-[90%] md:w-[80%] text-center">
      <sup>
        <PiQuotesFill fill="#424854" size={20} className="rotate-180" />
      </sup>
      <p className="text-richblack-5 text-[1.5rem] md:text-[1.7rem] font-semibold font-inter leading-[2.5rem] md:leading-[2.75rem]">
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <Hieghlightedtext color={"bg-gradient-to-br from-[#0093E9] to-[#80D0C7] bg-clip-text text-transparent text-[2.23rem] font-inter font-semibold leading-[2.75rem]"} data=" combines technology" /> , <Hieghlightedtext data="expertise" color={"text-[#EB5B00] text-[2.1rem]"}/> , and community to create an
        <Hieghlightedtext color={"text-transparent bg-clip-text bg-[linear-gradient(135deg,#BF600B,#EDC257)] font-bold text-[2.23rem]"}  data=" unparalleled educational experience." />
      </p>
      <sup>
        <PiQuotesFill fill="#424854" size={20} />
      </sup>
    </div>

  );
};

export default QuoteSection;
