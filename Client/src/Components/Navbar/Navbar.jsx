import { Link } from "react-router";


const Navbar = function(){
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


<ul className="hidden md:flex items-center gap-6 text-white/90 text-sm">
{/* <li className="hover:text-white cursor-pointer">Store</li>
<li className="hover:text-white cursor-pointer">Accessories</li>
<li className="hover:text-white cursor-pointer">Support</li> */}
</ul>


<div className="flex items-center gap-3">
<Link className="text-white text-sm rounded-xl px-4 py-2 border border-white/30 bg-white/10 hover:bg-white/20 transition"    to='/login'>Login</Link>
<Link className="text-white text-sm rounded-xl px-4 py-2 border border-white/30 bg-white/10 hover:bg-white/20 transition"  to='/signup'>Sign Up</Link>
</div>
</nav>
</div>


<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_30%_10%,rgba(255,255,255,0.25),transparent),radial-gradient(40%_30%_at_80%_0%,rgba(255,255,255,0.18),transparent)]" />
</header>
        </>
    )
}




export default Navbar;