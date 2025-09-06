
import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./Section/Homepage";
import Login from "./Section/Login";
import Signup from "./Section/Signup";
import VideoCall from "./Components/call/VideoCall";
import Home from "./Components/call/Home";
import MatchRandomUser from "./Components/call/MatchRandomUser";


function App() {
  

  return (
    <>
<Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/call/:roomId" element={<VideoCall />} />
              <Route path="/match-random-user" element={<MatchRandomUser />} />

      </Routes>
    </>
  )
}

export default App
