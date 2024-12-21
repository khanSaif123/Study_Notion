import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='bg-gradient-to-b from-[#6dbdf7] 
    via-[#4eace3] to-[#2e7ee1] text-transparent bg-clip-text font-bold'>
    {" "}{text}
    </span>
  )
}

export default HighlightText