const instance = require('../config/razorpay')
const Course = require('../models/Course')
const User = require('../models/User')
const mailsender = require('../utils/mailSender')
const courseEnrollmentEmail = require('../mail/templates/courseEnrollmentEmail')
const { default: mongoose } = require('mongoose')
const crypto = require('crypto');


// capture the payment and initiate the Razorpay order
// who buy course and what course he/she buy -> courseId and userId i need to know about.
exports.capturePayment = async (req, res)=>{
    
        // get courseID and userId.\
        const {course_id} = req.body
        const userId = req.user.id
        
        // valid courseID
        if(!course_id){
            return res.json({
                success:false,
                message:"Please provide valid course Id"
            })
        }
        
         // valid courseDetails
        let course;
        try {
            course = await Course.findById(course_id)
            if(!course){
                return res.json({
                    success:false,
                    message:"Could not find the course"
                })
            }
        
            // if user Already pay for the same course
            // convert userId into string to ObjectId.
            const uid = new mongoose.Types.ObjectId(String(userId))
            if(course.studentsEnroled.includes(uid)){
                return res.json(200).json({
                    success:false,
                    message:"Student already enrolled for this course"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message: error.message
            })
        }

        // order create
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount*100,
            currency,
            receipt: Math.random(Date.now().toString()),
            notes:{
                courseId:course_id,
                userId
            }
        }

        // call create function.
        try {
            // initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options)
            console.log("payment response:-> ", paymentResponse)

            // return response
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount
            })

        } catch (error) {
            return res.json({
                success:false,
                message: "Colud not initiate Order"
            })
        }
 
}

// verify segnature.
exports.verifyPayment =async (req, res) => {
    // Your webhook secret
    const webhookSecret = '12345678';

    // Get payload and Razorpay signature from headers
    const payload = JSON.stringify(req.body);
    const razorpaySignature = req.headers['x-razorpay-signature'];

    try {
        // Generate the hash using HMAC with SHA256
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(payload)
            .digest('hex');

        // Compare the generated signature with Razorpay's signature
        if (expectedSignature === razorpaySignature) {

            console.log('Webhook signature verified successfully!');
            // enroll the student in the course
            const {courseId, userId} = req.body.payload.payment.entity.notes;
            try {
                // find the course and enrolled the student init.
                const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},
                    {$push:{studentsEnroled:userId}},
                    {new:true}
                )

                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message:"Course not found"
                    })
                }

                console.log(enrolledCourse)

                // find student update student courses list.
                const enrolledStudent = await User.findOneAndUpdate(
                    {_id:userId},
                    {$push:{courses:courseId}},
                    {new:true}
                )

                console.log(enrolledStudent)
            } catch (error) {
                
            }
           
            // send confirmation mail.
            const emailResponse = await mailsender(enrolledStudent.email,
                 "Congratulation from StudyNotion",
                "Congratulation, you are onboarded into new Study Notion Course")
            
            return res.status(200).json({
                success:true,
                message:'Signature verify successfully'
            })
            
        } else {
            console.error('Invalid signature.');
            return res.status(400).json({ 
                success: false, message: 'Invalid signature.' 
            });
        }
    } catch (error) {
        console.error('Error verifying webhook signature:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};


