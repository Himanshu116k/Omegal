import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import MainContent from '../Components/MainContent/MainContent'
import MagicBento from '../Components/CreateParticle/createParticleElement '
import Security from '../Components/Security/Security'


const Homepage = () => {
  return (
       <div  className="flex flex-col gap-12 w-full h-full">
      <div>
   <Navbar/>
   <MainContent/>
   
<div className="w-full h-full flex justify-center ">
<MagicBento 
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
/>
</div>
</div>
<Security/>

</div>
  )
}

export default Homepage