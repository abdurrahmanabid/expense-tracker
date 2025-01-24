import { enqueueSnackbar } from "notistack";
import React from "react";
import transactionAnimation from "../assets/lottie/Transaction.json";
import CommonForm from "../components/CommonForm";
import { addTransaction } from "../crud/addTransaction";
import getUserBudget from "../crud/getUserBudgets";
import getUserId from "../helper/getUserId";
import { fields } from "../objStore/addTransactionData";

const AddTransaction = () => {
  // Define default values for the form
    const defaultValues = [
      {
        name: "dateTime",
        defaultValue: new Date().toISOString().slice(0, 16),
      },
    ];

  // Lottie options for the animation
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: transactionAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Handle form submission
const handleSubmit = (data) => {
  console.log("🚀 ~ handleSubmit ~ data:", data);
  const userId = getUserId();
  const transactionData = { ...data, userId };

  // Fetch the user's budget and validate it
  getUserBudget(userId)
    .then((budgetData) => {
      // Check if the remaining budget is less than the transaction amount
      if (Number(budgetData[0].remainingBudget) < Number(data.amount)) {
        enqueueSnackbar(
          "You have insufficient budget to make this transaction",
          {
            variant: "error",
          }
        );
        return Promise.reject("Insufficient budget"); // Stop further processing
      }

      // Proceed to add the transaction
      return addTransaction(transactionData, budgetData);
    })
    .then(() => {
      // Notify the user of success
      enqueueSnackbar("Transaction added successfully", {
        variant: "success",
      });
    })
    .catch((err) => {
      if (err !== "Insufficient budget") {
        console.error("Error adding transaction:", err);
        enqueueSnackbar("Failed to add your transaction", { variant: "error" });
      }
    });
};


  return (
    <CommonForm
      fields={fields}
      formTitle={"Make Transaction"}
      lottieOptions={lottieOptions}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
};

export default AddTransaction;
