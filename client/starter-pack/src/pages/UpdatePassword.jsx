import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../services/operations/authApi'

const UpdatePassword = () => {

    const dispatch = useDispatch()
    const nevigate = useNavigate()
    const location = useLocation()

    const {loading} = useSelector((state) => state.auth)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    
    const {password, confirmPassword} = formData

    const handleChange = (e)=>{
        setFormData((prev)=> ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const token = location.pathname.split('/').at(-1)
        dispatch(resetPassword(password, confirmPassword, token, nevigate))
    }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {loading ? 
        <div className='spinner'>Loading....</div> :
        <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose  new password</h1>
            <p
            className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100"
            >Almost done. Enter your new password and youre all set.</p>

            <form onSubmit={handleSubmit}>
                <label className="relative">
                    <p
                        className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                    >New Password <sup className="text-pink-200">*</sup></p>
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        name='password'
                        value={password}
                        onChange={handleChange}
                        placeholder='Enter New Password'
                        className="form-style w-full !pr-10"
                    />
                </label>

                <label className="relative mt-3 block">
                    <p
                    className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                    >Confirm Password <sup className="text-pink-200">*</sup></p>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        placeholder='Confirm New Password'
                        className="form-style w-full !pr-10"
                    />
                </label>
                <button type='submit'
                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                >
                    Reset Password
                </button>
            </form>

            <div className="mt-6 flex items-center justify-between">
                <Link to="/login">
                    <p className="flex items-center gap-x-2 text-richblack-5">
                        <FaArrowLeftLong />
                        Back to Login
                    </p>
                </Link>
            </div> 
        </div>
        }
    </div>
  )
}

export default UpdatePassword