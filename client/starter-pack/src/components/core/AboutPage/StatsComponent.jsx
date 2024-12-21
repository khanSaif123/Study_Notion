import React from 'react'

// stats data
const stats = [
    {
        count:"5k",
        label:"Active Students"
    },
    {
        count:"10+",
        label:"Mentors"
    },
    {
        count:"200+",
        label:"Courses"
    },
    {
        count:"50+",
        label:"Awards"
    },

]

const StatsComponent = () => {

  return (
    <section>
        <div>
            <div className='flex gap-x-10 text-center'>
                {
                    stats.map((data, ind)=>{
                        return <div key={ind}>
                            <h1>{data.count}</h1>
                            <h2>{data.label}</h2>
                        </div>
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent