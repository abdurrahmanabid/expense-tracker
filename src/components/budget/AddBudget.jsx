import { enqueueSnackbar } from "notistack";
import React from "react";
import { useLocation } from "react-router-dom";
import addAnimation from "../../assets/lottie/Add Budget.json";
import { addBudget, addNewBudget } from "../../crud/addBudget";
import CommonForm from "../CommonForm";

const AddBudget = () => {
  const budget = useLocation().state;
  const handleSubmit = async (data) => {
    try {
      if (budget) {
        await addBudget(budget, data.newMoney);
      }else{
      await addNewBudget(data.newMoney)
      }
      enqueueSnackbar("Successfully Added your Budget", { variant: "info" });
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err)
      enqueueSnackbar("Failed to Added your Budget", { variant: "info" });
    }
  };
  const field = [
    {
      name: "newMoney",
      label: budget ? "Which amount you wanna add? " : "How much ?",
      type: "text",
      required: true,
      placeholder: "Enter your amount",
    },
  ];
  const lottieOptions = {
    loop: true,
    autoplay: true, // animation will autoplay
    animationData: addAnimation, // pass the imported Lottie animation JSON data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <CommonForm
      fields={field}
      formTitle={
        budget
          ? `Your Current Total ${budget.totalBudget} and Remaining ${budget.remainingBudget}`
          : "Add Budget"
      }
      lottieOptions={lottieOptions}
      onSubmit={handleSubmit}
    />
  );
};

export default AddBudget;
