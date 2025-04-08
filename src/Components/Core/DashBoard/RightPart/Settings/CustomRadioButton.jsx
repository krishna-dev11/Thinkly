import { useEffect, useState } from "react";

const CustomRadioButton = ({
  name,
  label,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [selectedGender, setSelectedGender] = useState("");

  const genders = ["Male", "Female", "Other"];

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [register, name]);

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setValue(name, gender); // update form state
  };

  return (
    <div className="flex gap-x-5">
      {genders.map((gender) => (
        <label
          key={gender}
          className="flex items-center gap-x-3 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={gender}
            checked={selectedGender === gender}
            onChange={() => handleGenderChange(gender)}
            className="hidden peer"
          />
          <div
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all
              ${
                selectedGender === gender
                  ? "border-yellow-50 bg-primary"
                  : "border-richblack-400 bg-transparent"
              }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all 
                ${
                  selectedGender === gender ? "bg-yellow-50" : "bg-transparent"
                }`}
            ></div>
          </div>
          <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5">
            {gender}
          </p>
        </label>
      ))}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">This field is required</p>
      )}
    </div>
  );
};

export default CustomRadioButton;
