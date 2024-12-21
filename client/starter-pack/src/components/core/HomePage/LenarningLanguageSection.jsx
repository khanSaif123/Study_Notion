import React from 'react'
import HighlightText from './HighlightText'
import know_you_progress from '../../../assets/Images/Know_your_progress.svg'
import compare_with_others from '../../../assets/Images/Compare_with_others.svg'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.svg'
import Button from './Button'

const LenarningLanguageSection = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto mt-[150px]'>
        <div className='flex flex-col items-center'>

            {/* heading */}
            <div className='text-4xl font-semibold'>Your swiss knife for <HighlightText 
            text={'learning any language'}/></div>

            {/* para */}
            <div className='w-[57%] text-center mt-4 text-richblack-700 font-medium tracking-[0.02em]'>
                Using spin making learning multiple languages easy. with 20+
                languages realistic voice-over, progress tracking, custom schedule
                and more.
            </div>

            {/* images */}
            <div className='flex flex-col lg:flex-row items-center justify-center mt-28 lg:mt-0'>
                <img src={know_you_progress}
                    className='-mr-28 -mt-16'
                />
                <img src={compare_with_others}/>
                <img src={plan_your_lesson}
                    className='-ml-[10rem]'
                />
            </div>

            <div className='mb-10 mt-8'>
                <Button active={true} linkto={'/signup'}>
                    <div className='font-bold'>Learn More</div>
                </Button>
            </div>

        </div>
    </div>
  )
}

export default LenarningLanguageSection