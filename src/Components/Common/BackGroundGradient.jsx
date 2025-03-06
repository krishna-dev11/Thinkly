import React from 'react'

const BackGroundGradient = ({shade , position , dimensions , z}) => {
  return (
    <div className={`rounded-full  opacity-50 blur-3xl shadow-2xl absolute ${ shade} ${position} ${dimensions} ${z}`}></div>
  )
}

export default BackGroundGradient