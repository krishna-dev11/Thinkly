import { useState } from "react";

const CustomRadioButton = () => {
  const [selectedGender, setSelectedGender] = useState("");

  const genders = ["Male", "Female", "Other"];

  return (
    <div className="flex gap-x-5">
      {genders.map((gender) => (
        <label key={gender} className="flex items-center gap-x-3 cursor-pointer">
          <input
            type="radio"
            name="gender"
            value={gender}
            checked={selectedGender === gender}
            onChange={() => setSelectedGender(gender)}
            className="hidden peer"
          />
          <div
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all
              ${
                selectedGender === gender
                  ? "border-yellow-50 bg-primary"
                  :  " border-richblack-400 bg-transparent"
              }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all 
                ${selectedGender === gender ? "bg-yellow-50 " : "bg-transparent"}`}
            ></div>
          </div>
          <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5">
            {gender}
          </p>
        </label>
      ))}
    </div>
  );
};

export default CustomRadioButton;
