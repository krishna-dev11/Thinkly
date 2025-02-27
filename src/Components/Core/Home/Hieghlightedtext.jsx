import React from 'react'

const Hieghlightedtext = ({color , data}) => {
  return (
    <div className={` text-2xl font-semibold ${color}`}>{data}</div>
  )
}

export default Hieghlightedtext