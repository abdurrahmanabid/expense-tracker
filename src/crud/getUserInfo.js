import api from "../helper/api";
import getUserId from "../helper/getUserId";

const getUserInfo = async () => {
  const id = getUserId();
  const res = await api.get(`users/${id}`);
  return res.data;
};
export default getUserInfo;
