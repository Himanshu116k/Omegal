import React from 'react'
import RotatingWheel from '../Wheel/RotatingWheel'
import SudarshanChakra from '../Animation/Sudarshan'

const Security = () => {
  return (
    <div>
        <div className='flex flex-col justify-between items-center p-8 gap-5 w-full '>
            <h1 className='text-white text-4xl '>Your data is safe with us </h1>
            <p className='text-white text-2xl'>End TO End Protection</p>
        
        </div>
        <div   className='w-full h-full '>
            <SudarshanChakra/> 
        </div>
    </div>
  )
}

export default Security