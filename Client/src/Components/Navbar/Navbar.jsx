import { Link } from "react-router";
import useCallStore from "../../Store/useCallStore";
import { toast } from "sonner";


const Navbar = function(){
    const {setUser} = useCallStore()
    const {User} =useCallStore()
    return(
        <>
        {/* <div className="bg-blue-600/35 flex justify-around p-5 gap-19 realative top-0 ">
            <div>
                <h3 className="text-black h-full    font-semibold w-full text-center text-[10px]  hover:text-white"><span className="text-red-500 text-4xl"> Omegal </span>  Made by Himanshu</h3>
            </div>
            <div className="flex gap-12 justify-around">
                <button className=" bg-[#11e1d0] px-7 py-2 font-bold rounded-xl text-white  border-2 border-white white hover:bg-blue-600 ">Login</button>
                <button className="bg-[#118ae1] px-7 py-2 font-bold rounded-xl text-white  border-2 border-white white hover:bg-blue-900">SignUp</button>

            </div>
        </div> */}
        <header className="realtive top-0 inset-x-0 z-50">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<nav
className="mt-3 flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl supports-[backdrop-filter]:bg-white/10 px-4 sm:px-6 py-3 shadow-lg"
>
<div className="text-white text-lg font-semibold tracking-tight">Omegal</div>


<ul className="hidden md:flex items-center justify-center gap-6 text-white/90 text-sm">
{User?(<a href="https://github.com/Himanshu116k/Omegal" className="hover:text-white cursor-pointer">See code in Github</a>):("")}

{/* <li className="hover:text-white cursor-pointer">Accessories</li>
<li className="hover:text-white cursor-pointer">Support</li> */}
</ul>

 {User?(
    <div className="flex gap-4  justify-end">
        <button onClick={()=>{setUser(null);toast.success("Logut successfully")}} className="text-white text-sm rounded-xl px-4 py-2 border border-white/30 bg-red-600/10 hover:bg-red-600 hover:scale-x-125 transition">
        Logut
      </button>
      
      <img className="h-[8%] w-[8%] hover:scale-75 transition-all " src="https://cdn-icons-png.freepik.com/512/9774/9774938.png?ga=GA1.1.1866649443.1757143166" alt="" />
      
    </div>
 ):(
<div className="flex items-center gap-3">

<Link className="text-white text-sm rounded-xl px-4 py-2 border border-white/30 bg-white/10 hover:bg-white/20 transition"    to='/login'>Login</Link>
<Link className="text-white text-sm rounded-xl px-4 py-2 border border-white/30 bg-white/10 hover:bg-white/20 transition"  to='/signup'>Sign Up</Link>
</div>
)}
</nav>
</div>


<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_30%_10%,rgba(255,255,255,0.25),transparent),radial-gradient(40%_30%_at_80%_0%,rgba(255,255,255,0.18),transparent)]" />
</header>
        </>
    )
}




export default Navbar;