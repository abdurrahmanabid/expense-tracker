import api from "../helper/api";
import getUserId from "../helper/getUserId";

export const getTransactions = async () => {
  const id = getUserId();
  const res = await api.get(`transaction/?userId=${id}`);
  return res.data;
};
