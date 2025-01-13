import React, { useEffect, useState } from 'react'
import {Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { categories } from '../../services/apis';
import { axiosConnector } from '../../services/apiconnector';
import toast from 'react-hot-toast';

const Navbar = () => {

    // fetch the data form react-redux.
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const {totalItem} = useSelector((state) => state.cart)

    let location = useLocation()

    // API CALL FOR GETTING CATALOG data.
    const [subLinks, setSubLinks] = useState([])
    

    //  Fetch category data
     const fetchCategories = async () => {
        try {
            const result = await axiosConnector('GET', categories.CATEGORIES_API);
            setSubLinks(result.data.data)
        } catch (err) {
            toast.error("Error getting Categories form backend")
            console.log("Cannot get the category list", err);
        }
    };

    useEffect(() => {
        fetchCategories(); // Invoke the function
    }, []);
    

    // it check if the path that u pass matches the current url or not
    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname)
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to='/'>
                <img src={logo} width={160} height={42}/>
            </Link>

            {/* nav links */}
            <nav>
                <ul className='text-richblack-100 flex gap-5'>
                        { 
                            NavbarLinks.map((link, ind) =>{
                                return <li key={ind}>
                                       {
                                        link.title === "Catalog" ? 
                                            <div className='group relative'>
                                            <Link className='flex items-center hover:text-richblack-5'>
                                                {link.title}
                                                <div>
                                                <RiArrowDropDownLine size={20}/>
                                                </div>
                
                                            </Link>

                                            <div className='invisible absolute left-[50%]
                                                    translate-x-[-51.1%] lg:translate-y-[15%] md:translate-y-[-0%]
                                                top-[50%] z-[100]
                                                flex flex-col rounded-2xl bg-richblack-5 p-4 text-richblack-900
                                                opacity-0 transition-all duration-200 group-hover:visible
                                                group-hover:opacity-100 lg:w-[300px]'>

                                                <div className='absolute left-[50%] top-0
                                                translate-x-[80%]
                                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                            </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <div className='flex gap-20 bg-richblack-25 mb-2 pl-5 rounded-lg
                                                pt-2 pb-2 hover:bg-richblack-50 cursor-pointer
                                                ' key={index}>
                                              <Link  to={`/catalog/${subLink.name
                                                        .split(" ")
                                                        .join("-")
                                                        .toLowerCase()}`}key={index}>
                                                <p className='font-semibold'>{subLink?.name}</p>
                                              </Link>

                                                </div>
                                            ) )
                                    ) : (<div></div>)
                                }

                                            </div>
                                            </div>
                                            : 
                                            <Link to={link?.path} className={`${matchRoute(link?.path) ?
                                            "text-yellow-25" : "text-richblack-200 hover:text-richblack-5"}`}>
                                                {link?.title}
                                            </Link>
                                       }
                                    </li>
                            })
                        }
                </ul>
            </nav>

            {/* buttons login/signup - dashboard - cart*/}
            <div className='text-richblack-100 flex gap-3 '>
            
                { user && user?.accountype === "Instructor" && (
                    <Link to='/dashboard/cart'>

                    <FaShoppingCart/>
                    {
                        totalItem > 0 && (
                            <span>
                                {totalItem}
                            </span>
                        )
                    }

                    </Link>
                )
                }

                {/* if token is there  */}
                {token === null && (
                    <div className='text-richblack-100 flex gap-3 '>
                            {/* show signup ang login btn */}
                            <Link to='/signup' className='border 
                            border-richblack-600 px-2 py-1 rounded-lg hover:text-richblack-5
                            hover:border-richblack-5 transition-all duration-200 bg-richblack-700
                            hover:bg-richblack-800'>
                                    Sign Up
                            </Link>

                                <Link to="/login" className='border border-richblack-600 px-2 py-1 
                                rounded-lg hover:text-richblack-5 hover:border-richblack-5
                                transition-all duration-200 bg-richblack-700
                                hover:bg-richblack-800'>
                                    Log In
                            </Link>
                    </div>
                )
                }

                {/* if token not null - show profile dropdown menu*/}
                {token !== null  && (
                    <ProfileDropDown/>
                )

                }
            
            </div>
            
        </div>
    </div>
  )
}

export default Navbar