import React, { useState } from "react";
import SignupLock from "../Components/Animation/SignupLock";
import { toast } from "sonner";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });
  const [loding, setloading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`,
        data
      );
      toast.success("Please veriy your email");

      setData({
        name: "",
        email: "",
        age: "",
        password: "",
      });
      setloading(false);
    }  catch (error) {
          if (error.response) {
            if (error.response.status === 409) {
              toast.warning("User already exist");
            }
          } else {
            toast.error("Network error");
          }
        } finally {
          setloading(false);
        }
  };
  return (
    <div className="w-screen h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 h-full hidden md:flex items-center justify-center bg-black">
        {/* <img
          src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80"
          alt="Signup Illustration"
          className="object-cover w-full h-full"
        /> */}
        <SignupLock />
      </div>

      {/* Right Side (Glassmorphic Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-auto">
        <div className="relative w-[90%] max-w-md p-8 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Create Account
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-gray-200 mb-1">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={data.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-200 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-200 mb-1">age</label>
              <input
                type="text"
                name="age"
                placeholder="20"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={data.age}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-1">
                Confirm Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
            >
              {loding ? (
                <span className="flex justify-center    items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                </span>
              ) : (
                "Signup"
              )}
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
