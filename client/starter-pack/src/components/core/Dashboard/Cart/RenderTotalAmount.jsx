import React from 'react'
import IconeBtn from '../../../common/IconeBtn'
import { useSelector } from 'react-redux'

const RenderTotalAmount = () => {
  const {total, cart} = useSelector((state) => state.cart)

  const handleBuyCourse = ()=>{
      const courses = cart.map((course) =>course._id)
      console.log("Bought these course: ", courses)
      // TODO: API integeration -> though payment gateway
  }
  return (
    <div>
      <p>Total: </p>
      <p>Rs {total}</p>

      <IconeBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  )
}

export default RenderTotalAmount