import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links" // Import sidebar links data
import { logout } from "../../../services/operations/authApi" // Import logout function
import ConfirmationModal from "../../common/ConfirmationModal" // Import confirmation modal component
import SidebarLink from "./SidebarLink" // Import sidebar link component

export default function Sidebar() {

  // Access profile data and loading state from Redux store
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)

  const dispatch = useDispatch() // Redux dispatch function
  const navigate = useNavigate() // Hook for navigation

  const [confirmationModal, setConfirmationModal] = useState(null) 

  // Show loading spinner if profile or auth is still loading
  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      {/* Main wrapper for sidebar */}
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px]
       border-r-richblack-700 bg-richblack-800 py-10">
       
        {/* Sidebar links */}
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
           
            // Skip link if the user account type doesn't match
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
       
        {/* Divider line */}
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        
        {/* Settings and logout section */}
        <div className="flex flex-col">
          
          {/* Settings link */}
          <SidebarLink
            link={{ name: "Setting", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          
          {/* Logout button */}
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?", 
                text2: "You will be logged out of your account.", 
                btn1Text: "Logout", 
                btn2Text: "Cancel", 
                btn1Handler: () => dispatch(logout(navigate)), 
                btn2Handler: () => setConfirmationModal(null), // Cancel handler to close modal
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Render confirmation modal if it exists */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
