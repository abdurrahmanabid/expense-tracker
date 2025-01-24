import { LogOut } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import Lottie from "react-lottie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoutLottie from "../assets/lottie/Sign Out.json";
import { logout } from "../feature/user/userSlice";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch= useDispatch();
  const navigate = useNavigate();

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: logoutLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleLogout =  () => {
    setIsLoading(true);
    try {
       dispatch(logout())
       enqueueSnackbar("Sign Out Successfully", {
         variant: "success",
       });
       navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      enqueueSnackbar("Logout failed", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-64 h-64 mb-8">
        <Lottie options={lottieOptions} height="100%" width="100%" />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Ready to Sign Out?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Confirm your logout from the application
        </p>

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="
            flex 
            items-center 
            justify-center 
            w-full 
            bg-red-500 
            text-white 
            py-3 
            rounded-lg 
            hover:bg-red-600 
            transition-colors
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {isLoading ? (
            <span>Logging out...</span>
          ) : (
            <>
              <LogOut className="mr-2" />
              Sign Out
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Logout;
