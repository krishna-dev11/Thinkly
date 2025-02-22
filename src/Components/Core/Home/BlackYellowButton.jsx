import React from 'react'

const BlackYellowButton = ({buttonData1 ,  buttoncolor1  , buttonData2 ,  buttoncolor2}) => {
  return (
    <div className=' flex gap-x-5 '>
        <button className={`py-2 px-3 rounded-md ${buttoncolor1}`}>{buttonData1}</button>
        <button className={`py-2 px-3 rounded-md ${buttoncolor2}`}>{buttonData2}</button>
    </div>
  )
}

export default BlackYellowButton