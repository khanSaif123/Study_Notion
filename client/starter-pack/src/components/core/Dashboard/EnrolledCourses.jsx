import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {useSelector} from 'react-redux'
import {getUserEnrolledCourses} from '../../../services/operations/profileApi'
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {

    const token = useSelector((state) => state.auth.token)
    console.log("Token for enrolledCourses ----> ", token)

    const [enrolledCourses, setEnrolledCourses] = useState(null)

    // backend call
    const getEnrolledCourses = async ()=>{
        try {

            const response = await getUserEnrolledCourses(token)
            console.log('Frontend enrolled courses -->', response)

            setEnrolledCourses(response)
            
        } catch (error) {
            toast.error("Enable to get the Enrolled courses")
            console.log("Enable to get the Enrolled courses")
        }
    }

    useEffect(()=>{
        getEnrolledCourses()
    },[])
  return (
    <div className='text-white'>
        {/* heading */}
        <h1>Enrolled Courses</h1>

        {/* courses progress cards */}
        {
            !enrolledCourses ? (<div> Loading.... </div>) : !enrolledCourses.length ? 
            (<p>You have not enrolled in any course yet</p>) :
            (
                <div>
                    <div>
                        <p>Courses Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>

                    {/* cards */}
                    {
                        enrolledCourses.map((course, ind) =>{
                            return <div key={ind}>
                                <div>
                                    <img src={course.thumbnail}/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>

                                {/* here the duration part */}
                                <div>
                                    {course?.totalDuration}
                                </div>

                                {/* progress part */}
                                <div>
                                    <p>Progress: {course.progressPercentage || 0}</p>

                                    {/* progress bar we can use 3rd party package ramonak/react-Progrss bar*/}
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                    />
                                </div>

                            </div>
                        })
                    }
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses