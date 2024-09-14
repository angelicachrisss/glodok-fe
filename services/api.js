import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 10000,
});

// const api = axios.create({
//   baseURL: "https://shy-pianos-hope.loca.lt",
//   timeout: 10000,
// });

//review
const insertReview = async (payload) => {
  return await api.post("/glodok/v1/data?type=insertreview", payload);
};

const getReview = async (params) => {
  return await api.get(`/glodok/v1/data?type=getreview`, { params });
};

export default {
  insertReview,
  getReview,
};
