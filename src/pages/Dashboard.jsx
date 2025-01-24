import React, { useEffect, useState } from "react";
import Charts from "../components/dashboard/Charts";
import SpendingTrends from "../components/dashboard/SpendingTrends";
import SummaryCards from "../components/dashboard/SummeryCard";
import { getTransactions } from "../crud/getTransactions";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="dashboard p-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <SummaryCards transactions={transactions} />
        <Charts transactions={transactions} />
        <SpendingTrends transactions={transactions} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
