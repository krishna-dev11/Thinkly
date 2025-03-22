import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const CustomTagInput = ({ name, label, register, Placeholder, errors, setValue, getValues }) => {

    const {editCourse} = useSelector(state=>state.Course)

    const [Chip, setChip] = useState([])

    useEffect(()=>{
        if(editCourse){
            setChip(editCourse.tag)
            console.log(Chip)
        }
    })

    useEffect(() => {
        register( name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, [register, name])

    useEffect(() => {
        setValue(name, Chip)
    }, [Chip, name, setValue])

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === ",") {

            event.preventDefault()

            const Chipvalue = event.target.value.trim()

            if (Chipvalue && !Chip.includes(Chipvalue)) {
                const newArray = [...Chip, Chipvalue]
                setChip(newArray)
                event.target.value = ""
            }
        }
    }

    const removeChipInput = (chipIndex) => {
        const newChips = Chip.filter((_, index) => index !== chipIndex)
        setChip(newChips)
    }

    return (
        <div>
            <div className='flex gap-2 flex-wrap mb-2'>
                {Chip.map((c, i) => (
                    <div key={i} className='flex gap-x-2 items-center px-3 py-1 rounded-xl bg-pink-50'>
                        <p>{c}</p>
                        <RxCross2 className='cursor-pointer' onClick={() => removeChipInput(i)} />
                    </div>
                ))}
            </div>

            <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    {label}<sup className="text-pink-200">*</sup>
                </p>
                <input
                    type='text'
                    name={name}
                    placeholder={Placeholder}
                    onKeyDown={handleKeyDown}
                    className="p-2 border border-gray-300 rounded-md w-full"
                />
            </label>

            {errors[name] && <p className="text-red-500 text-sm">This field is required.</p>}
        </div>
    )
}

export default CustomTagInput
