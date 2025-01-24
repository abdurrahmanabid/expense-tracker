import { Edit, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../crud/getUserInfo";
import profileAnimation from "./../assets/lottie/Profile.json";

const ProfileDetails = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const res = await getUserInfo();
        setUser(res);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: profileAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-pulse text-gray-500 dark:text-gray-300">
          Loading profile...
        </div>
      </div>
    );
  }

  return user ? (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 rounded-lg shadow-lg min-h-[80vh]">
      {/* Animation Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie options={lottieOptions} height={400} width={400} />
      </div>

      {/* Profile Details */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Profile Details
          </h2>
          <button
            onClick={() => navigate("./update-profile",{state:user})}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Edit className="mr-2" size={20} /> Update Profile
          </button>
        </div>

        <div className="space-y-4">
          {/* Username */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center">
            <User className="mr-3 text-gray-500 dark:text-gray-300" />
            <div>
              <span className="text-gray-600 dark:text-gray-400 block text-sm">
                Username
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {user.username}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center">
            <Mail className="mr-3 text-gray-500 dark:text-gray-300" />
            <div>
              <span className="text-gray-600 dark:text-gray-400 block text-sm">
                Email
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {user.email}
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center">
            <Lock className="mr-3 text-gray-500 dark:text-gray-300" />
            <div className="flex-grow">
              <span className="text-gray-600 dark:text-gray-400 block text-sm">
                Password
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {showPassword
                  ? user.password
                  : "•".repeat(user.password.length)}
              </span>
            </div>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Account Status */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center">
            <Lock className="mr-3 text-gray-500 dark:text-gray-300" />
            <div>
              <span className="text-gray-600 dark:text-gray-400 block text-sm">
                Terms
              </span>
              <span
                className={`font-semibold ${
                  user.acceptTerms
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {user.acceptTerms ? "Accepted" : "Not Accepted"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProfileDetails;
