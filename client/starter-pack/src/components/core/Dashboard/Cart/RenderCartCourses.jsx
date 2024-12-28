import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    
  return (
    <div>
        {
            cart.map((course, index) =>{
                return <div key={index}>
                        {/* left */}
                        <div>
                            <img src={course?.thumbnail}/>
                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course?.category?.name}</p>
                                <div>
                                    {/* connect the api to get the average rating number*/}
                                    <span>4.8</span>
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<FaStar/>}
                                        fullIcon={<FaStar/>}
                                    />

                                    <span>{course?.ratingAndReviews?.length}</span>
                                </div>
                            </div>
                        </div>

                        {/* btn and price */}
                        <div>
                            <button
                                onClick={() => dispatch(removeFromCart(course.id))}
                            >
                                <RiDeleteBinLine/>
                                <span>Remove</span>
                            </button>
                        </div>
                </div>
            })
        }
    </div>
  )
}

export default RenderCartCourses