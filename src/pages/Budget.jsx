import { AlertCircle, DollarSign, DollarSignIcon, WalletMinimal } from "lucide-react";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import budgetAnimation from "../assets/lottie/Bank Capital.json";
import getUserBudget from "../crud/getUserBudgets";
import getUserId from "../helper/getUserId";

const Budget = () => {
  const [budget, setBudget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        setIsLoading(true);
        const userId = getUserId();
        const userBudget = await getUserBudget(userId);
        setBudget(userBudget[0]);
      } catch (error) {
        console.error("Failed to fetch budget:", error);
        setError("Unable to retrieve budget information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBudget();
  }, []);

  // Lottie options for animation
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: budgetAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Calculate budget usage percentage
  const calculateUsagePercentage = () => {
    if (!budget) return 0;
    const usedBudget = budget.totalBudget - budget.remainingBudget;
    return Math.round((usedBudget / budget.totalBudget) * 100);
  };

  // Render error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={64} />
          <p className="text-xl text-gray-700 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-48 h-48 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all h-[80vh]">
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie options={lottieOptions} height={250} width={250} />
      </div>

      {/* Budget Info */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="flex gap-36">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
            <DollarSign className="mr-3 text-blue-600" size={32} />
            Budget Overview
          </h2>
          <button
            onClick={() => {
              navigate("./add-budget", { state: budget });
            }}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <DollarSignIcon className="mr-2" size={20} /> Add Budget
          </button>
        </div>

        {budget ? (
          <div className="space-y-4 w-4/6">
            {/* Budget Metrics */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">
                  Total Budget
                </span>
                <span className="font-semibold flex gap-3 items-center">
                  {budget.totalBudget} <DollarSign size={20} />
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">
                  Remaining Budget
                </span>
                <span className="font-semibold text-green-600 flex gap-3 items-center">
                  {budget.remainingBudget} <DollarSign size={20} />
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">
                  Used Budget
                </span>
                <span className="font-semibold text-red-600 flex gap-3 items-center">
                  {budget.totalBudget - budget.remainingBudget}{" "}
                  <DollarSign size={20} />
                </span>
              </div>
            </div>

            {/* Budget Usage Visualization */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${calculateUsagePercentage()}%` }}
              ></div>
            </div>

            {/* Budget Status */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-800 dark:text-gray-300">
                Status
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  budget.remainingBudget > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {budget.remainingBudget > 0 ? "Active" : "Depleted"}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-4 w-1/2">
            <WalletMinimal
              className="text-gray-400 dark:text-gray-600"
              size={64}
            />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No budget information available
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => {
                navigate("./add-budget");
              }}
            >
              Create Budget
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
