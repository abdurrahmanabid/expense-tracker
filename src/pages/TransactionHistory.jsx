import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import transactionAnimation from "../assets/lottie/Transaction.json";
import { getTransactions } from "../crud/getTransactions";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: transactionAnimation,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();
        setTransactions(res);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const renderTransactionItem = (transaction) => (
    <div
      key={transaction.id}
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex flex-col">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(transaction.dateTime).toLocaleString()}
        </div>
        <div className="font-semibold text-gray-800 dark:text-gray-200">
          {transaction.description}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {transaction.category}
        </div>
      </div>
      <div className="text-green-600 dark:text-green-400 font-bold">
        ${transaction.amount}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie options={lottieOptions} height={200} width={200} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Transaction History
        </h2>
        <div className="w-24 h-24">
          <Lottie options={lottieOptions} height={96} width={96} />
        </div>
      </div>

      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map(renderTransactionItem)
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
