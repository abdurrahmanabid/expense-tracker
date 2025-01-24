import api from "../helper/api";
import getUserId from "../helper/getUserId";

const id = getUserId();

const addBudget = async (current, amount) => {
  const res = await api.patch(`budget/${current.id}`, {
    totalBudget: Number(current.totalBudget) + Number(amount),
    remainingBudget: Number(current.remainingBudget) + Number(amount),
  });
  return res.data;
};

const addNewBudget = async (amount) => {
  const res = await api.post(`budget`, {
    totalBudget: Number(amount),
    remainingBudget: Number(amount),
    userId: id,
  });
  return res.data;
};

export { addBudget, addNewBudget };
