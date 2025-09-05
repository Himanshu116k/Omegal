
import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./Section/Homepage";
import Login from "./Section/Login";
import Signup from "./Section/Signup";


function App() {
  

  return (
    <>
<Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
