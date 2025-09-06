import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import MainContent from '../Components/MainContent/MainContent'
import MagicBento from '../Components/CreateParticle/createParticleElement '
import Security from '../Components/Security/Security'
import useCallStore from '../Store/useCallStore'



const Homepage = () => {
  

  const {User} = useCallStore()
  return (
       <div  className="flex flex-col gap-12 w-full h-full">
      <div>
   <Navbar/>
         {/* {console.log("comming from store----> " + User.name)} */}
   
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