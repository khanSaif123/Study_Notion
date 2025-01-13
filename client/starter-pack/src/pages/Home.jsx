import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LenarningLanguageSection from '../components/core/HomePage/LenarningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';


const Home = () => {
  return (
    <div>
    {/* section - 1 */}
    <div className='relative mx-auto flex flex-col w-11/12 items-center
    text-white max-w-maxContent'>
        <Link to={"/signup"}>
            <div className='group mx-auto rounded-full bg-[#161D29] text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit mt-16 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
                <div className='flex items-center gap-2 rounded-full px-7 py-[7px] 
                transition-all duration-200 group-hover:bg-richblack-900 leading-7'>
                    <p>Become an Instructor</p>
                    <FaArrowRight />
                </div>
            </div>
        </Link>

        <div className='text-center text-4xl font-semibold mt-10'>
            Empower Your Future with
            <HighlightText text={"Coding Skills"}/>
        </div>

        {/* sub heading */}
        <div className='mt-4 w-[72%] text-center text-lg font-normal text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
        </div>

         {/* CTA Buttons */}
         <div className='flex flex-row gap-7 mt-8 '>
         <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
         </div>

         {/* viedo */}
         <div className='mt-12 w-[80%] shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
            <video muted loop autoPlay className='shadow-[20px_20px_rgba(255,255,255)]'>
                <source src={Banner} type="video/mp4" />
            </video>
        </div>

        {/* code section-1 */}
        <div className='w-[90%] relative -left-14'>
            <CodeBlocks
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl'>
                        Unlock Your <HighlightText text={"Coding Potentials "}/>
                        with ours online courses
                    </div>
                }
                subheading={
                    <p>
                        Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                    </p>
                }
                ctabtn1={{
                    btnText:"Try It Yourself",
                    linkto:"/signup",
                    active:true
                }}
                ctabtn2={{
                    btnText:"Learn More",
                    linkto:"/login",
                    active:false
                }}

                codeColor={"text-yellow-25"}
                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                backgroundGradient={<div className="codeblock1 absolute"></div>}
            />
        </div>

        {/* code section - 2 */}
        <div className='w-[90%] relative -left-16'>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* Explore more section */}
        <ExploreMore/>

    </div>

    {/* section - 2 */}
    <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[310px]'>

        {/* wrapper contain all the items */}
          <div className='w-11/12 max-w-maxContent flex flex-col items-center mt-10 mx-auto'>
              <div className='h-[150px]'></div>
              <div className='flex flex-row gap-7 justify-center text-white mt-11 w-full'>
                <CTAButton active={true} linkto={'/signup'}>
                      <div className='flex gap-2 leading-5 items-center'>
                        Explore Full Catalog
                        <FaArrowRight/>
                      </div>
                      
                  </CTAButton>

                  <CTAButton active={false} linkto={'/login'} className="text-white">
                    Learn More
                  </CTAButton>
              </div>
          </div>

        </div>

        {/* get skill u need part */}
        <div className='mx-auto w-11/12 max-w-maxContent items-center flex justify-evenly'>
          <div className='flex gap-5 w-[45%]'>
                {/* left part */}
                  <div className='text-4xl mt-2 font-semibold text-richblack-800'>
                      Get the skills you need for a 
                      <HighlightText text={'job that is in demand'}/>
                  </div>
          </div>

           {/* right part */}
           <div className='w-[45%] flex flex-col gap-10 mt-16'>
                 <p className='font-semibold'>
                    The modern StudyNotion is the dictates its own terms. Today, to
                    be a competitive specialist requires more than professional
                    skills.
                 </p>
                <div className='flex'>
                <CTAButton active={true} linkto={'signup'}>
                    <div className='font-bold'>Learn More</div>
                 </CTAButton>
                </div>
            </div>

        </div>

        
        <TimelineSection/>

        <LenarningLanguageSection/>

    </div>

    {/* section - 3 */}
    <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between bg-richblack-900 text-white'>

      {/* Become an instructor */}
      <InstructorSection/>

      {/* heading */}
      <h2 className='text-4xl text-center mb-10 font-semibold
      mt-[12rem]
      '>
      Review from other learner
      </h2>

    </div>
    
    {/* footer */}
    <Footer/>
    </div>
  )
}

export default Home