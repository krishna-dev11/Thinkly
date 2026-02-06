import React, { useState } from "react"
import { IoIosTv } from "react-icons/io"
import { IoMdArrowDropdown } from "react-icons/io"

const OverviewofLectures = ({ data }) => {

  const [totalSectionDuration, setTotalSectionDuration] = useState(0)

  const CountTotalSectionDuration = (time) => {
    const newTime = totalSectionDuration + parseFloat(time)
    setTotalSectionDuration(newTime)
  }

  console.log(CountTotalSectionDuration )

  function calculateSectionDuration(sectionData) {
    let totalSeconds = 0

    sectionData.subSections.forEach(sub => {
      const duration = parseFloat(sub.timeDuration)
      if (!isNaN(duration)) {
        totalSeconds += duration
      }
    })

    const hours = Math.floor(totalSeconds / 3600)
    const remainingSecondsAfterHours = totalSeconds % 3600
    const minutes = Math.floor(remainingSecondsAfterHours / 60)
    const seconds = Math.floor(remainingSecondsAfterHours % 60)

    return `${hours}h ${minutes}min ${seconds}sec`
  }

  return (
    <div className="flex flex-col border border-richblack-700 mt-3 rounded-md w-[70%]">
      {data.map((section) => (
        <details key={section._id}>

          <summary className="flex justify-between px-4 bg-richblack-800 h-[3rem] border-b border-richblack-700">
            <div className="flex gap-x-2 justify-center items-center">
              <IoMdArrowDropdown />
              <p>{section.sectionName}</p>
            </div>

            <div className="flex gap-x-4 justify-center items-center">
              <p className="text-yellow-50">{`${section.subSections.length} lectures`}</p>
              <p className="text-caribbeangreen-50">
                {calculateSectionDuration(section)}
              </p>
            </div>
          </summary>

          <div>
            {section.subSections.map((subSection) => (
              <div
                className="flex gap-x-2 justify-between py-2 px-16 items-center border-b border-richblack-700"
                key={subSection._id}
              >

                <div className="flex gap-x-3">
                  <IoIosTv />

                  <details>
                    <summary className="flex gap-x-2 list-none items-center">
                      <p>{subSection.title}</p>
                      <IoMdArrowDropdown />
                    </summary>

                    <p className="text-richblack-300 text-xs w-[90%]">
                      {subSection.description}
                    </p>
                  </details>
                </div>

                <p>{subSection.timeDuration} sec</p>

              </div>
            ))}
          </div>

        </details>
      ))}
    </div>
  )
}

export default OverviewofLectures
