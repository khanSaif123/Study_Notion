import React from 'react'
import instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import Button from './Button'

const InstructorSection = () => {
  return (
    <div className='mt-24'>
        <div className='flex gap-24 w-full'>
            {/* left-part */}
            <div className='w-[55%]'>
                <img src={instructor}
                    className='shadow-white shadow-[-20px_-20px_0_0]'
                />
            </div>

            {/* right-part */}
            <div className="lg:w-[50%] flex gap-16 flex-col mt-36">
            <div className='flex flex-col gap-4'>
                <div className="lg:w-[50%] text-4xl font-semibold ">
                Become an
                <HighlightText text={"instructor"} />
                </div>

                <div className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
                Instructors from around the world teach millions of students on
                StudyNotion. We provide the tools and skills to teach what you
                love.
                </div>
            </div>

            <div className="w-fit">
              <Button active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection