import api from "../../helper/api";

export const postRegistration = async (user) => {
  const res = api.post("/users", user);
  console.log("🚀 ~ postRegistration ~ user:", user);
  const checkUser = await api.get(`/users?email=${user.email}`);
  console.log("🚀 ~ postRegistration ~ checkUser:", checkUser);
  if (checkUser.data.length > 1) {
    return null;
  }
  return res;
};
export const loginUser = async (user) => {
  const res = api.get(`/users?email=${user.email}&password=${user.password}`);
  return res;
};
