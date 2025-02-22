import React from 'react'

const Hieghlightedtext = ({color , data}) => {
  return (
    <div className={` text-2xl ${color}`}>{data}</div>
  )
}

export default Hieghlightedtext