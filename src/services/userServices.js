import axios from "axios";

const baseUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const register = async (newObj) => {
  try {
    const response = await axios.post(baseUrl, newObj);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const login = async (loginObj) => {
  const response = await axios.post("/api/login", loginObj);
  return response.data;
};

const getScoreCard = async () => {
  const config = { headers: { Authorization: token } };
  const response = await axios.get(`${baseUrl}/scorecard`, config);
  return response.data;
};

const sendScore = async (score) => {
  const scoreObj = { score };
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/score`, scoreObj, config);
  return response.data;
};

export default {
  setToken,
  register,
  login,
  sendScore,
  getScoreCard,
};
