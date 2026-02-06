import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useSelector } from "react-redux";

const CustomInstructionsInput = ({
  name,
  label,
  Placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirment, setRequirment] = useState("");
  const [RequirmentList, setRequirmentList] = useState([]);
  const { editCourse, course } = useSelector((state) => state.Course);

  useEffect(() => {
    if (editCourse) {
      setRequirmentList(course.instructions);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, RequirmentList);
  }, [RequirmentList]);

  const AddRequirments = () => {
    if (requirment && !RequirmentList.includes(requirment)) {
      const newval = [...RequirmentList, requirment];
      setRequirmentList(newval);
      setRequirment("");
    }
  };

  const RemoveRequirment = (Requirmentindex) => {
    const List = [...RequirmentList];
    const updatedList = List.filter((_, index) => index !== Requirmentindex);
    setRequirmentList(updatedList);
  };

  return (
    <div className=" flex flex-col gap-y-3">
      <div className=" flex flex-col gap-y-2">
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            {label}
            <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            name={name}
            placeholder={Placeholder}
            onChange={(e) => {
              setRequirment(e.target.value);
            }}
            value={requirment}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className=" w-full  rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder:px-8 placeholder-gray-500 text-richblack-5"
          />
        </label>

        {errors[name] && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}

        <div onClick={AddRequirments} className=" text-yellow-50 font-inter font-semibold cursor-pointer flex gap-x-1 ">
           <p>Add</p>
           <IoAdd className=" translate-y-1"/>
        </div>
      </div>
      <div className=" flex-wrap flex gap-x-2 gap-y-2">
        {RequirmentList.map((R, i) => (
          <div key={i} className=" flex  gap-x-2  bg-richblack-50  px-3 py-1 rounded-full">
            <span className=" ">{R}</span>
            <p onClick={() => RemoveRequirment(i)}>clear</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomInstructionsInput;
