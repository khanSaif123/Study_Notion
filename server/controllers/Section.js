const Course = require('../models/Course')
const Section = require('../models/Section')

// create section. HERE in this HOME Work is present.
exports.createSection = async (req, res) =>{
    try {
        // data fetch
        const {sectionName, courseId} = req.body;
       
        // validate
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
       
        // create section
        const newSection = await Section.create({sectionName})

        // update course with section object id
        const updateCourseDetails = await Course.findByIdAndUpdate(courseId,
                                        {
                                            $push:{
                                                courseContent: newSection._id // here ids are visible
                                                // but we want exact object id
                                            }
                                        },
                                        {new:true}).populate('courseContent')
        
        // home work: use populate to replace section/sub-section both in the updatedCourseDetails
        console.log("Updated course detail -> ",updateCourseDetails)
        // return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updateCourseDetails
        })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success:false,
            message:"Somthing went wrong while creating section"
        })
    }
}

// update-section
exports.updateSection = async (req, res)=>{
   try {
        // get data.
        const {sectionName, sectionId} = req.body

        // data validation.
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
    
        // update data.
        const section = await Section.findByIdAndUpdate(sectionId, {new:true});
    
        // return response.
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            section
        })

   } catch (error) {

    return res.status(500).json({
        success:false,
        message:"Unable to update section, please try again"
    })
   }
}

// delete section.
exports.deleteSection = async (req, res) =>{
    try {

        // get id - from params
        const {sectionId, courseId} = req.body
            
        const section = await Section.findById(sectionId)

        if(!section){
            return res.status(404).json({
                success: false,
                message:"Section not found with accosiated sectionId"
            })
        }
        
        // delete the associated subSection.
        await Section.deleteMany({_id: {$in:section.subSection}})

        // delete Section
        await Section.findByIdAndDelete(sectionId)

        // update the course content in course.
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId
            }
        })

        // return response
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete the section. please try again"
        })
    }
}