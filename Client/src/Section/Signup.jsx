import React from "react";
import SignupLock from "../Components/SignupLock";

const Signup = () => {
  return (
    <div className="w-screen h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 h-full hidden md:flex items-center justify-center bg-black">
        {/* <img
          src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80"
          alt="Signup Illustration"
          className="object-cover w-full h-full"
        /> */}
        <SignupLock/>
      </div>

      {/* Right Side (Glassmorphic Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-auto">
        <div className="relative w-[90%] max-w-md p-8 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Create Account
          </h2>

          <form className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-200 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-200 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-200 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-200 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
            >
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <p className="text-gray-300 text-sm mt-6 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
