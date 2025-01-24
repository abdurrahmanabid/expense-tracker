import api from "../helper/api";

const getUserBudget = async (id) => {
  const response = await api.get(`/budget?userId=${id}`);
  return response.data;
};
export default getUserBudget;
