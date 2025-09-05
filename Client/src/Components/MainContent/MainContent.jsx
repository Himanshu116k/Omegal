import React from "react";
import { Typewriter } from "react-simple-typewriter";

const MainContent = () => {
  return (
    <div className="w-full mt-2 h-full flex justify-center items-center bg-gradient-to-b from-gray-900 via-black to-gray-800 border-2 border-gray-700 rounded-2xl shadow-lg">
      <div className="p-10 text-center text-white max-w-xl">
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
          Remember the Old Days on{" "}
          <span className="text-purple-400">Omegle</span>
        </h1>

        {/* Auto writing effect */}
        <h2 className="text-2xl font-semibold text-purple-300 mb-6">
          <Typewriter
            words={[
                "Remember old days",
              "Chat with Strangers ",
              "Make New Friends ",
              "Random Video Calls ",
              "Fun Conversations ",
            ]}
            loop={0} 
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>

        <p className="text-lg text-gray-300 mb-2">
          Video chat with random people and relive the experience.
        </p>
        <p className="text-gray-400 mb-6">
          This website is developed by <span className="font-semibold">Himanshu</span>.
        </p>

        <div className="bg-gray-800 border border-gray-600 rounded-xl p-4 inline-block shadow-md">
          <p className="text-sm text-gray-400">For support or issues, contact:</p>
          <code className="text-purple-300 font-mono">himanshu1991patan@gmail.com</code>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
