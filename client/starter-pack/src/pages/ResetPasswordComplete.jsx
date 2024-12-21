import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const ResetPasswordComplete = () => {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Reset Complete</h1>
            <p
              className="my-3 text-[1.125rem] leading-[1.625rem] text-richblack-100"
            >All done! We have sent an email to yourEmail confirm</p>
            
            <Link to="/login">
                <button 
                className="mt-2 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                >
                  Back to login
                </button>
            </Link>

            <div className="mt-5 flex items-center justify-between">
            <Link to='/login'>
                <p className="flex items-center gap-x-2 text-richblack-5">
                    <FaArrowLeftLong /> Back to login
                </p>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default ResetPasswordComplete