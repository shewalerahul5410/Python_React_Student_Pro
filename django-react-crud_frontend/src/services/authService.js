import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register/", userData);

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login/", userData);

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

export const isAutheticated = () => {
  return !!localStorage.getItem("access_token");
};
