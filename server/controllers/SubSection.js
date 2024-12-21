const Section = require('../models/Section')
const SubSection = require('../models/SubSection')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config()

// create subSection. here in this HOME WORK present
exports.createSubSection = async (req, res) =>{
    try {
        // get data req body.
        const {sectionId, title, timeDuration, description} = req.body;
        
        // get viedo file
        const viedo = req.files.viedoFile;
        
        // validation
        if(!sectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        
        // upload viedo on cloudinary. and get secure_url
        const cloudinaryResponse = await uploadImageToCloudinary(viedo, process.env.FOLDER_NAME)
        
        // create SubSection
        const subSectionDetails = await SubSection.create({
            title,
            timeDuration,
            description,
            viedoUrl: cloudinaryResponse.secure_url
        })

        // push subSection id in Section
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                            {
                                                $push:{
                                                    subSection: subSectionDetails._id
                                                }
                                            },
                                            {new:true}) // her also want object id so populate it.
        // return response
        return res.status(200).json({
            success:true,
            message:"SubSection Created successfully",
            updatedSection
        })

    } catch (error) {
        console.log("error: ", error.message)
        return res.status(500).json({
            success:false,
            message:"Unable to create SubSection, Plaese Try Again"
        })
    }
}

// update SubSection.
exports.updateSubSection = async (req, res) =>{
    
    try {
        const {sectionId, subSectionId, title, description} = req.body;
        const subSection = await SubSection.findById(subSectionId)

        if(!subSection){
            return res.status(404).json({
                success: false,
                message: 'Subsection not found'
            })
        }

        // update title and description
        if(title !== undefined){
            subSection.title = title
        }

        if(description !== undefined){
            subSection.description = description
        }

        // update viedo also.
        if(req.files && req.files.viedo !== undefined){
            const viedo = req.files.viedoFile;
            const uploadDetails = await uploadImageToCloudinary(viedo, process.env.FOLDER_NAME)

            // update it in the subSection
            subSection.viedoUrl = uploadDetails.secure_url,
            subSection.timeDuration = `${uploadDetails.duration}` 
        }

        await subSection.save()

        // find updated section and retur it.
        const updatedSection = await Section.findById(sectionId).populate("subSection").exec()
        console.log("updated section", updatedSection)

        // return response
        return res.json({
            success:true,
            message: "Section updated successfully",
            data:updatedSection
        })

        
        } catch (error) {
            console.error(error)
            return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
            })
        }

}

// delete SubSection.
exports.deleteSubSection = async (req, res) =>{
    try {
        const {sectionId, subSectionId} = req.body;

        // goto Section and delete the required subSectionId.
        await Section.findByIdAndUpdate({_id: sectionId},
            {
                $pull:{
                    subSection: subSectionId,
                }
            })

        // find the subSection through subSectionId and delete it.
        const subSection = await SubSection.findByIdAndDelete({_id:subSectionId})

        if(!subSection){
            return res.status(404).json({ 
                success: false,
                message: "SubSection not found" 
            })
        }

        // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while deleting the SubSection",
        })
    }
}

