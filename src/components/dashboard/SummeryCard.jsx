import { CreditCard, DollarSign, TrendingUp } from "lucide-react";
import React from "react";

const SummaryCards = ({ transactions }) => {
  const calculateMetrics = () => {
    const totalExpenses = transactions.reduce(
      (sum, tx) => sum + Number(tx.amount),
      0
    );

    const categoryTotals = transactions.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
      return acc;
    }, {});

    const topCategory = Object.entries(categoryTotals).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["None", 0]
    )[0];

    const totalTransactions = transactions.length;

    return {
      totalExpenses,
      topCategory,
      totalTransactions,
      averageExpense: totalExpenses / totalTransactions || 0,
    };
  };

  const { totalExpenses, topCategory, totalTransactions } = calculateMetrics();

  const cardData = [
    {
      title: "Total Expenses",
      value: `$${totalExpenses.toFixed(2)}`,
      icon: <DollarSign className="text-red-400 dark:text-red-300" />,
      lightBg: "bg-red-50",
      darkBg: "dark:bg-red-900/20",
      lightText: "text-red-600",
      darkText: "dark:text-red-300",
    },
    {
      title: "Top Spending Category",
      value: topCategory,
      icon: <TrendingUp className="text-blue-400 dark:text-blue-300" />,
      lightBg: "bg-blue-50",
      darkBg: "dark:bg-blue-900/20",
      lightText: "text-blue-600",
      darkText: "dark:text-blue-300",
    },
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: <CreditCard className="text-green-400 dark:text-green-300" />,
      lightBg: "bg-green-50",
      darkBg: "dark:bg-green-900/20",
      lightText: "text-green-600",
      darkText: "dark:text-green-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`
            ${card.lightBg} 
            ${card.darkBg}
            rounded-lg 
            p-5 
            transform 
            hover:scale-105 
            transition-all 
            duration-300 
            ease-in-out
            shadow-sm
            hover:shadow-md
          `}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {card.title}
              </h3>
              <p
                className={`
                text-2xl 
                font-bold 
                ${card.lightText} 
                ${card.darkText}
              `}
              >
                {card.value}
              </p>
            </div>
            <div
              className="
              bg-white 
              dark:bg-gray-800 
              rounded-full 
              p-3 
              shadow-sm
            "
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
