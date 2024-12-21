import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import CTAButton from './Button'
import {TypeAnimation} from 'react-type-animation'

const CodeBlocks = ({position, heading, subheading, backgroundGradient, codeColor,
    ctabtn1, ctabtn2, codeblock
}) => {
  return (
    <div className={`flex ${position} m-20 justify-between items-center md:justify-center md:flex-wrap gap-10 w-[100%]
    bg-transparent 
    `}>
        {/* section-1 */}
        <div className='w-[50%] flex flex-col gap-6'>
        {heading}
        <div>
            {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
               <div className='flex items-center gap-2'>
                {ctabtn1.btnText}
                <FaArrowRight />
               </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                {ctabtn2.btnText}
            </CTAButton>
        </div>

        </div>

        {/* section - 2 */}
        <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]
        border-2 border-transparent bg-gradient-to-t from-[#0E1A2D3D] to-[#111E3261] z-10
        ">
        {backgroundGradient}
        {/* Indexing */}
        <div className="text-center relative flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Codes */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono pr-1`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>

      </div>
    </div>
  )
}

export default CodeBlocks