import React, { useState } from 'react'
import {ACCOUNT_TYPE} from '../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { setSignupData } from '../../../slices/authSlice'
import { useDispatch } from 'react-redux'
import { sendOtp } from '../../../services/operations/authApi'
import Tab from '../../common/Tab'

const SignupForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)


  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {firstName, lastName, email, password, confirmPassword} = formData

  // get the form data.
  const handleChange = (e)=>{
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    
    if(password !== confirmPassword){
      toast.error('Password do not match')
      return
    }

    const signupData = {
      ...formData,
      accountType
    }
    
    // To be used after otp verification
    dispatch(setSignupData(signupData))

    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  // data to pass to Tab component - TAB Component is PENDING
    // data to pass to Tab component
    const tabData = [
      {
        id: 1,
        tabName: "Student",
        type: ACCOUNT_TYPE.STUDENT,
      },
      {
        id: 2,
        tabName: "Instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
      },
    ]

  return (
    <div className='text-richblack-5'>
     <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
        {/* first name - last name */}
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              name='firstName'
              value={firstName}
              placeholder='Enter first name'
              onChange={handleChange}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>

          <label>
            <p  className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type='text'
              name='lastName'
              value={lastName}
              placeholder='Enter last name'
              onChange={handleChange}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>

        {/* email */}
        <label className="w-[95%]">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email} 
            placeholder="Enter email address"
            onChange={handleChange}
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>

        {/* create - password */}
        <div  className="flex gap-x-4">

          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Create Password <sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type={showPassword ? "text" : "password"}
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={handleChange}
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
          </label>

          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm Password'
              onChange={handleChange}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>

        </div>

        <button
          type='submit'
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Create Account
          </button>

      </form>
    </div>
  )
}

export default SignupForm