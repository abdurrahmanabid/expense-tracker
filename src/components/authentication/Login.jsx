import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginAnimation from "../../assets/lottie/Logging In.json"; // Lottie animation file
import { login } from "../../feature/user/userSlice";
import { fields } from "../../objStore/loginObj";
import CommonForm from "../CommonForm";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { isLoading, isError, error, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = (formData) => {
    dispatch(login(formData));
  };

  // Effect to handle notifications and navigation based on state
  useEffect(() => {
    if (isLoading) {
      enqueueSnackbar("Loading...", { variant: "info" });
    }

    if (isError) {
      enqueueSnackbar(error || "Login failed", { variant: "error" });
    }

    if (user) {
      enqueueSnackbar("Login successful", { variant: "success" });
      navigate("/dashboard"); // Navigate after successful login
    } else if (!isLoading && !isError && user === null) {
      enqueueSnackbar("User not found", { variant: "error" });
    }
  }, [isLoading, isError, error, user, enqueueSnackbar, navigate]);

  return (
    <CommonForm
      formTitle="Login"
      fields={fields}
      onSubmit={handleSubmit}
      lottieOptions={lottieOptions}
    />
  );
};

export default Login;
