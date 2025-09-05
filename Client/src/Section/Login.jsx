import React, { useState } from "react";
import axios from "axios";
import LoginLock from "../Components/LoginLock";

import { toast } from "sonner";


const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Wrap your axios POST request inside toast.promise
      await toast.promise(
       axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`, data),
    {
      loading: "Logging in...",          // shown while request is pending
      success: (res) => res.data.message, // shown if request succeeds
      error: "Failed to login",          // shown if request fails
    }
  );
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="w-screen h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 h-full hidden md:flex items-center justify-center bg-black">
        <LoginLock />
      </div>

      {/* Right Side */}
      <div className="w-screen md:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="relative w-[90%] max-w-md p-8 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Welcome Back
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-gray-200 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-200 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={data.password}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              
              className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-gray-300 text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-purple-400 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
