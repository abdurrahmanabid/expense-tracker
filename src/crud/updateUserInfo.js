import api from "../helper/api";
import getUserId from "../helper/getUserId";

const updateUserInfo = async (data) => {
  try {
    const res = await api.put(`users/${getUserId()}`, data);
    return res.data;
  } catch (err) {
    return err;
  }
};
export default updateUserInfo;
