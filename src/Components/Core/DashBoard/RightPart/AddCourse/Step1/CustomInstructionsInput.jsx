import React, { useEffect, useState } from "react";

const CustomInstructionsInput = ({name , label , Placeholder , register , errors , setValue ,getValues }) => {

  const [requirment, setRequirment] = useState("");
  const [RequirmentList, setRequirmentList] = useState([]);


  useEffect(()=>{
    register( name , {
          required:true,
          validate: (value) => value.length > 0
    })
},[ register , name])

useEffect(()=>{
  setValue( name , RequirmentList )
} , [RequirmentList , setValue , name])

  const handleChange = (event) => {
    event.preventDefault();
    setRequirment(event.target.value);
    event.target.value = "";
  };

  const AddRequirments = () => {
    if (requirment && !RequirmentList.includes(requirment)) {
      const newval = [...RequirmentList, requirment];
      setRequirmentList(newval);
      setRequirment("");
    }
  };

  const RemoveRequirment = (Requirmentindex)=>{
       const List = [...RequirmentList]
       const updatedList = List.filter((_, index)=>index!==Requirmentindex)
       setRequirmentList(updatedList)
      }

  return (
    <div>
      <div className=" flex flex-col ">
        <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
        {label}<sup className="text-pink-200">*</sup></p>
          <input
            type="text"
            name={name}
            placeholder={Placeholder}
            onChange={handleChange}
            value={requirment}
          />
        </label>

        {errors[name] && <p className="text-red-500 text-sm">This field is required.</p>}

        <div onClick={AddRequirments}>Add</div>
      </div>
      <div>
        {
            RequirmentList.map((R , i)=>(
                <div key={i} className=" flex gap-x-2 bg-caribbeangreen-50 px-3 py-1">
                    <span className=" text-black">{R}</span>
                    <p onClick={()=>RemoveRequirment(i)}>clear</p>
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default CustomInstructionsInput;
