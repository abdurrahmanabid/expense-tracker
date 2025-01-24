import api from "../helper/api";

export const addTransaction = async (data, budgetData) => {
  const [budget] = budgetData;
  console.log("🚀 ~ addTransaction ~ budget:", budget);
  await api.patch(`budget/${budget.id}`, {
    remainingBudget: Number(budget.remainingBudget) - Number(data.amount),
  });
  const res = await api.post(`transaction`, data);
  return res.data;
};
