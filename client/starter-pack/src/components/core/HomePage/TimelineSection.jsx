import React from 'react'
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const timeline = [
    {
        Logo: Logo1,
        Heading: "LeaderShip",
        Description: "Fully commited to the success company"
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority",
      },
      {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills",
      },
      {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution",
      },
]

const TimelineSection = () => {
  return (
    <div className='w-full'>
        <div className='flex gap-14 w-[1140px] mx-auto max-w-maxContent mt-20'>
            {/* left box */}
            <div className='w-[40%] flex flex-col'>
                        {timeline.map((ele, i) => {
                        return (
                        <div className="flex flex-col lg:gap-3" key={i}>
                            {/* left-part */}
                            <div className="flex gap-6" key={i}>
                                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                <img src={ele.Logo} alt="" />
                                </div>
                                
                                <div>
                                    <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                                    <p className="text-base">{ele.Description}</p>
                                </div>
                            </div>
                            
                            {/* dots between images*/}
                            { i !== timeline.length - 1 && (
                                <div
                                    className='relative inline-block w-[10px] h-[45px] border-l
                                            border-dotted border-richblack-300 left-[1.6rem] mb-3'>
                                </div>
                            )}
                        </div>
                        );
                    })}
            </div>

            {/* right box */}
            <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
              <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
                {/* Section 1 */}
                <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                  <h1 className="text-3xl font-bold w-[75px]">10</h1>
                  <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                    Years experiences
                  </h1>
                </div>

            {/* Section 2 */}
                <div className="flex gap-5 items-center lg:px-14 px-7">
                  <h1 className="text-3xl font-bold w-[75px]">250</h1>
                  <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                    types of courses
                  </h1>
                </div>
           
          </div>
          <img
            src={TimeLineImage}
            alt="timelineImage"
            className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
          />
        </div>

        </div>
    </div>
  )
}

export default TimelineSection