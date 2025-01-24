import { enqueueSnackbar } from "notistack";
import React from "react";
import { useLocation } from "react-router-dom";
import registerAnimation from "../../assets/lottie/Update.json";
import updateUserInfo from "../../crud/updateUserInfo";
import { fields } from "../../objStore/registerObj";
import CommonForm from "../CommonForm";

const UpdateProfile = () => {
  const user = useLocation().state;
  const lottieOptions = {
    loop: true,
    autoplay: true, // animation will autoplay
    animationData: registerAnimation, // pass the imported Lottie animation JSON data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleSubmit = async (data) => {
    try {
      await updateUserInfo(data);
      enqueueSnackbar("Update Successfully", { variant: "info" });
    } catch (err) {
      enqueueSnackbar("Update Failed, Try again", { variant: "error" });
    }
  };
  const updatedFields = fields.filter((item)=>{
      return (item.name !== "email") && item.name !== "confirmPassword";
  })
  const defaultValues = [
    {
      name: "username",
      defaultValue: user.username,
    },
    {
      name: "email",
      defaultValue: user.email,
    },
    {
      name: "password",
      defaultValue: user.password,
    },
    {
      name: "confirmPassword",
      defaultValue: user.confirmPassword,
    },
    {
      name: "acceptTerms",
      defaultValue: user.acceptTerms,
    },
  ];
  return (
    <CommonForm
      formTitle="Update Account"
      fields={updatedFields}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      lottieOptions={lottieOptions}
    />
  );
};

export default UpdateProfile;
