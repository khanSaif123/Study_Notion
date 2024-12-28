const Course = require('../models/Course')
const Category = require("../models/Category")
const User = require('../models/User')
const Section = require('../models/Section')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config()

// create course
exports.createCourse = async (req, res)=>{
    try {
        // fetch data.
        const { courseName, courseDescription, whatYouWillLearn, price, category, status, tag} = req.body;

        // thumbnail
        const thumbnail = req.files.thumbnailImage


        // validation.
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        }

        // check for instructor.
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
          })
        console.log("Instructor Details: ", instructorDetails)
        // TODO: Verify that userId and Instructor Id same or different

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message: "Instructor Details not found"
            })
        }

        // check given Category valid or not.
        const categoryDetails = await Category.findById(category)
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message: "Category Detail not found"
            })
        }

        // upload Image to cloudinary.
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        console.log("thumbnailImage -> ",thumbnailImage)

        // create an entry for new course.
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            tag:tag,
            status:status,
           
        })

        // add the new course to the user schema of instructor.
        await User.findByIdAndUpdate(
            instructorDetails._id,
            {
                $push :{
                    courses: newCourse._id
                }
            },
            {new:true}
        )

        // update the Category schema TODO

        return res.status(200).json({
            success:true,
            message: "Course created successfully",
            data:newCourse
        })
        
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success:false,
            message: "Somthing went wrong while creating the Course",
            error:error.message
        })
    }
}

// get all courses
exports.getAllCourse = async (req, res)=>{
    try {
        // get the courses from DB.
        const allCourses = await Course.find({}, {
                                                courseName: true,
                                                price: true,
                                                thumbnail: true,
                                                instructor: true,
                                                ratingAndReviews: true,
                                                studentsEnrolled: true,
                                                }).populate("instructor").exec()
        return res.status(200).json({
            success:false,
            message: "Fetching data succussfully",
            data:allCourses
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Somthing went wrong while fetching the Course"
        })
    }
}

// getCourseDetails.
exports.getCourseDetails = async (req, res) =>{
    try {
        // get ID.
        const {courseId} = req.body;

        // find course details.
        const courseDetails = await Course.findOne(
            {_id:courseId},)
            .populate({
                path: "instructor",
                populate: {
                  path: "additionalDetails",
                },
              }).populate('category') // .populate("ratingAndReviews")
                .populate({
                    path:"courseContent",
                    populate:{
                        path:"subSection",
                        
                    }
                }).exec()

                

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with this ${courseId}`
            })
        }

        return res.status(200).json({
            success:true,
            message:`Course Details fetched successfully`,
            data:courseDetails
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"Internal server Error, while getting course details"
        })
    }
}

// getFullCourseDetails
exports.getFullCourseDetails = async (req, res) =>{
    const {courseId} = req.body
    const userId = req.user.id

    const courseDetails = await Course.findById(
        {courseId})
        .populate({
            path:"instructor",
            path:{
                path:"additionalDetails"
            }
        })
        .populate('ratingAndReviews')
        .populate("category")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec()
}

// get a list of course for a given Instructor.

exports.getInstructorCourse = async (req, res) =>{
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({_id: instructorId})

    // validate.
    if(!instructorCourses){
        return res.status(404).json({
            success:false,
            message:"No Course found for the associated Instructor Id.."
        })
    }

    // Return the instructor's courses
    return res.status(200).json({
        success:true,
        data:instructorCourses
    })
    } catch (error) {
        console.error(error)
        res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
        })
    }
}

// Delete course.
exports.deleteCourse = async (req, res) => {
    try {
        // get the ID
        const {courseId} = req.body

        // Find the course
        const course = await Course.findById(courseId)

        if(!course){
            return res.status(404).json({
                success:false,
                message:'Course not found'
            })
        }

        // Unenroll students from the course
        const studentEntrolled = course.studentsEnroled;

        for(const studentId of studentEntrolled){
            await User.findByIdAndUpdate(studentId,
                {
                    $pull:{courses: courseId}
                }
            )
        }

        // Delete sections and sub-sections
        const courseSection = course.courseContent // array
        for(const sectionId of courseSection){

            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)

            if(section){
                const subSection = section.subSection
                for(const subSectionId of subSection){
                    await subSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }
        
        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success:true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
        })
    }
}


