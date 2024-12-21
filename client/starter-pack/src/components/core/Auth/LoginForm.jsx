import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { login } from '../../../services/operations/authApi'

const LoginForm = () => {

  const dispatch = useDispatch()
  const nevigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const {email, password} = formData

  // get the value from input fields
  const handleChange = (e)=>{
    setFormData((prev) =>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // send the form data to the funtion to interact with the server.
  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(login(email, password, nevigate))
  }

  return (
    <div className='text-white'>
      <form onSubmit={handleSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
      >

      {/* Enter email */}
        <label className='w-full'>
          <p
          className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >Email Address <sup className="text-pink-200">*</sup></p>
          <input
            required
            name='email'
            value={email}
            type='email'
            placeholder='Enter your registered email'
            onChange={handleChange}
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>

        {/* password field */}
        <label>
          <p>Password <sup className="text-pink-200">*</sup></p>
          <input
            type={showPassword ? "text" : "password"}
            name='password'
            value={password}
            placeholder='Password'
            onChange={handleChange}
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />

          {/* here add the eye icon in span */}
          <Link to='/forgot-password'>
               <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                Forgot Password
               </p>
          </Link>
        </label>

        {/* subbmit btn */}
        <button type='submit'
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
            Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm