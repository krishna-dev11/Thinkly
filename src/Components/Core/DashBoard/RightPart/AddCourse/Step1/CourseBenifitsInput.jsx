import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const CourseBenifitsInput = ({
  name,
  lable,
  register,
  Placeholder,
  errors,
  setValue,
  getValues,
}) => {

  const [Chip, setChip] = useState([]);

  const { editCourse , course} = useSelector((state) => state.Course);


  useEffect(() => {
    if (editCourse) {
      setChip(course.whatYouWillLearn)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
  }, []);


  useEffect(() => {
    setValue(name , Chip);
  }, [Chip]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const Chipvalue = event.target.value.trim();

      if (Chipvalue && !Chip.includes(Chipvalue)) {
        const newArray = [...Chip, Chipvalue];
        setChip(newArray);
        event.target.value = "";
      }
    }
  };

  const removeChipInput = (chipIndex) => {
    const newChips = Chip.filter((_, index) => index !== chipIndex);
    setChip(newChips);
  };

  return (
    <div className=" flex flex-col gap-y-2 ">

      <label className="  ">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          {lable}
          <sup className="text-pink-200">*</sup>
        </p>
        <input
          type="text"
          name={name}
          placeholder={Placeholder}
          onKeyDown={handleKeyDown}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className=" w-full  rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder:px-8 placeholder-gray-500 text-richblack-5"
        />
      </label>

      {errors[name] && (
        <p className="text-red-500 text-sm">This field is required.</p>
      )}


      <div className="flex-wrap flex gap-x-2 gap-y-2">
        {Chip.map((c, i) => (
          <div
            key={i}
            className="flex  gap-x-2  bg-richblack-50  px-3 py-1 rounded-full"
          >
            <p>{c}</p>
            <RxCross2
              className="cursor-pointer"
              onClick={() => removeChipInput(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


export default CourseBenifitsInput
