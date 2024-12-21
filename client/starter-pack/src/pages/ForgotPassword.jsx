import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6";
import { getPasswordResetToken } from '../services/operations/authApi';

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const nevigate = useNavigate()

    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")

    const {loding} = useSelector((state) => state.auth)

    const handleChange = (e)=>{
        setEmail(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {loding ? <div className="spinner">Loading....</div> :

        <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                {
                    emailSent ? "Check email" : "Reset your password"
                }
            </h1>

            <p  className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                {
                    !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                        : `We have sent the reset email to ${email}`
                }
            </p>

            {/* create form */}
            <form onSubmit={handleSubmit}>
                {!emailSent &&
                    
                    <div>
                        <label className="w-full">
                            <p
                            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                            >Email Address <sup className="text-pink-200">*</sup></p>
                            <input
                                required
                                type='email'
                                name='email'
                                value={email}
                                onChange={handleChange}
                                placeholder='Enter Your Email Addresss'
                                className="form-style w-full"
                            />
                        </label>
                    </div>
                    
                }

                <button type='submit'
                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                >
                    {
                        emailSent ? "Resend" : "Reset Password"
                    }
                </button>
            </form>

                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                           <p className="flex items-center gap-x-2 text-richblack-5">
                                <FaArrowLeftLong /> Back to Login  
                           </p>
                        </Link>
                        
                    </div> 

        </div>

        }
    </div>
  )
}

export default ForgotPassword