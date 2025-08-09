import axios from "axios";

export const loginUser = async (credentials) => {
  const res = await axios.post("https://dummyjson.com/auth/login", credentials, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
};
