import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
      CartesianGrid,
      Cell,
      Legend,
      Line,
      LineChart,
      Pie,
      PieChart,
      ResponsiveContainer,
      Tooltip,
      XAxis,
      YAxis,
} from "recharts";
import getUserId from "../../helper/getUserId";
import getUserBudget from "./../../crud/getUserBudgets";

const Charts = ({ transactions }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D72638"];
  const [budget, setBudget] = useState(null);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const categoryData = transactions.reduce((acc, tx) => {
    const category = tx.category;
    acc[category] = (acc[category] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const categoryChartData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  const expensesByDate = transactions.reduce((acc, tx) => {
    const date = new Date(tx.dateTime).toLocaleDateString();
    acc[date] = (acc[date] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const lineChartData = Object.keys(expensesByDate).map((date) => ({
    date,
    amount: expensesByDate[date],
  }));

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const userId = getUserId();
        const userBudget = await getUserBudget(userId);
        setBudget(userBudget[0]);
      } catch (error) {
        console.error("Failed to fetch budget:", error);
        setError("Unable to retrieve budget information");
      }
    };

    fetchBudget();
  }, []);

  const budgetChartData = budget
    ? [
        { name: "Remaining Budget", value: budget.remainingBudget },
        {
          name: "Spent Budget",
          value: budget.totalBudget - budget.remainingBudget,
        },
      ]
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
      {/* Pie Chart */}
      <div className="chart bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-none rounded-lg">
        <h3 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">
          Category-wise Expenses
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryChartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "8px",
              }}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{ color: "gray" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="chart bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-none rounded-lg">
        <h3 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">
          Expenses Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              strokeOpacity={0.5}
            />
            <XAxis dataKey="date" tick={{ fill: "gray" }} />
            <YAxis tick={{ fill: "gray" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "8px",
              }}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{ color: "gray" }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Budget Chart */}
      {budget && (
        <div className="chart bg-white dark:bg-gray-800 p-4 shadow-sm dark:shadow-none rounded-lg">
          <h3 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">
            Budget Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                <Cell fill="#00C49F" />
                <Cell fill="#FF8042" />
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "8px",
                }}
              />
              <Legend
                iconType="circle"
                layout="horizontal"
                verticalAlign="bottom"
                wrapperStyle={{ color: "gray" }}
              />
            </PieChart>
          </ResponsiveContainer>
          {budget.remainingBudget < 100 && (
            <div className="text-center mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                onClick={() => {
                  /* Add budget logic */
                  Navigate("/budgets/add-budget");
                }}
              >
                Add Budget
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Charts;
