import React, { useState } from "react";
import axios from "axios";
import LoginLock from "../Components/Animation/LoginLock";

import { toast } from "sonner";
import useCallStore from "../Store/useCallStore";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useCallStore();
  const { User } = useCallStore();
  const [data, setData] = useState({
    email: "",
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
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
        data
      );
      setUser(responce.data.data.user);
      toast.success("Login successfull");
      setData({
        email: "",
        password: "",
      });
      setloading(false);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.warning("Verify your email first");
        } else if (error.response.status === 404) {
          toast.error("User not found in records");
        } else if (error.response.status === 401) {
          toast.error("Invalid emial or  password");
        } else {
          toast.error(error.response.data.message || "Login failed");
        }
      } else {
        toast.error("Network error");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex">
        {/* {console.log("comming from store----> " + User.name)} */}
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
                  required
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
                  required
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
                  "Login"
                )}
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
    </>
  );
};

export default Login;
