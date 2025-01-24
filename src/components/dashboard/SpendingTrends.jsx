import React from "react";
import {
      Bar,
      BarChart,
      CartesianGrid,
      ResponsiveContainer,
      Tooltip,
      XAxis,
      YAxis,
} from "recharts";

const SpendingTrends = ({ transactions }) => {
  const monthlySpending = transactions.reduce((acc, tx) => {
    const month = new Date(tx.dateTime).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const trendsData = Object.keys(monthlySpending).map((month) => ({
    month,
    amount: monthlySpending[month],
  }));

  const maxSpending = Math.max(...trendsData.map((data) => data.amount));
  const minSpending = Math.min(...trendsData.map((data) => data.amount));

  const highestMonth = trendsData.find(
    (data) => data.amount === maxSpending
  )?.month;
  const lowestMonth = trendsData.find(
    (data) => data.amount === minSpending
  )?.month;

  return (
    <div className="spending-trends bg-white dark:bg-gray-800 shadow-sm dark:shadow-none rounded p-4">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
        Spending Trends
      </h3>

      <div className="insights mb-6 text-gray-600 dark:text-gray-400">
        <p>
          <strong className="text-gray-800 dark:text-gray-200">
            Highest Spending Month:
          </strong>{" "}
          {highestMonth} (${maxSpending.toFixed(2)})
        </p>
        <p>
          <strong className="text-gray-800 dark:text-gray-200">
            Lowest Spending Month:
          </strong>{" "}
          {lowestMonth} (${minSpending.toFixed(2)})
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={trendsData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            strokeOpacity={0.5}
          />
          <XAxis dataKey="month" tick={{ fill: "gray" }} />
          <YAxis tick={{ fill: "gray" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "8px",
            }}
          />
          <Bar
            dataKey="amount"
            fill="#8884d8"
            className="transition-all duration-300 hover:opacity-80"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingTrends;
