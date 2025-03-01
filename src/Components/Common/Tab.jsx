import React from 'react'
// import { ACCOUNT_TYPE } from '../../Utilities/Constaints'

const Tab = ({tabData , currentTab , setCurrentTab}) => {
  return (
    <div className=' bg-richblack-800 h-10 w-[71%]  rounded-full flex justify-evenly items-center'>
        {
          tabData.map((tab)=>(
            <button key={tab.id} className={`text-richblack-400  h-[80%] px-10 rounded-full ${currentTab === tab.type ? " bg-richblack-900" : "text-pink-200 "}`} onClick={() =>setCurrentTab(tab.type)}>{tab.tabName}</button>
          ))
        }
    </div>
  )
}

export default Tab