import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import registerAnimation from "../../assets/lottie/Registration.json";
import { registration } from "../../feature/user/userSlice";
import { fields } from "../../objStore/registerObj";
import CommonForm from "../CommonForm";

const Registration = () => {
  const userRegistration = useSelector((state) => state.user);
  const { isLoading, isError, error, isLoggedIn } = userRegistration;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Lottie options for animation (Optional)
  const lottieOptions = {
    loop: true,
    autoplay: true, // animation will autoplay
    animationData: registerAnimation, // pass the imported Lottie animation JSON data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Submit handler function
  const handleSubmit = (formData) => {
    dispatch(registration(formData));
  };

  // Effect to handle notifications based on state changes
  useEffect(() => {
    if (isLoading) {
      enqueueSnackbar("Registration in progress", { variant: "info" });
    } else if (isError) {
      enqueueSnackbar(error || "Registration failed", { variant: "error" });
    } else if (isLoggedIn) {
      enqueueSnackbar("Registration successful", {
        variant: "success",
        action: () => {
              navigate("/dashboard");
        }
      });
    }
  }, [isLoading, isError, error, isLoggedIn, enqueueSnackbar, navigate]);

  return (
    <div className="registration-container">
      <CommonForm
        formTitle="Create Account"
        fields={fields}
        onSubmit={handleSubmit}
        lottieOptions={lottieOptions}
      />
    </div>
  );
};

export default Registration;
