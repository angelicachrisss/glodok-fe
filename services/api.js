import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 10000,
});

// const api = axios.create({
//   baseURL: "http//localhost:8080",
//   timeout: 10000,
// });

// const api = axios.create({
//   baseURL: "https://whole-doors-clap.loca.lt",
//   timeout: 10000,
// });

//review
const insertReview = async (payload) => {
  return await api.post("/glodok/v1/data?type=insertreview", payload);
};

const getReview = async (params) => {
  return await api.get(`/glodok/v1/data?type=getreview`, { params });
};

//destinasi
// const getDestinasi = async (ket) => {
//   return await api.get(
//     `/glodok/v1/data?type=getalldestinasibykategori&ket=${ket}`
//   );
// };

const getDestinasi = async (ket, name) => {
  return await api.get(
    `/glodok/v1/data?type=getsearchdestinasibykategori&ket=${ket}&destinasiname=${name}`
  );
};

const getDestinasiByID = async (id) => {
  return await api.get(
    `/glodok/v1/data?type=getdestinasibyid&destinasiid=${id}`
  );
};

export default {
  insertReview,
  getReview,

  getDestinasi,
  getDestinasiByID,
};
