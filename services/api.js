import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
//   timeout: 10000,
// });

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

// const api = axios.create({
//   baseURL: "https://heavy-moments-check.loca.lt",
//   timeout: 10000,
// });

//beranda
const getSejarahBeranda = async () => {
  return await api.get(`/glodok/v1/data?type=getsejarahberanda`);
};

const getFotoBeranda = async () => {
  return await api.get(`/glodok/v1/data?type=getfotoberandaml`);
};

const getVideoBeranda = async () => {
  return await api.get(`/glodok/v1/data?type=getvideoberandaml`);
};

//review
const insertReview = async (payload) => {
  return await api.post("/glodok/v1/data?type=insertreview", payload);
};

const getReview = async (destinasiid, rating, params) => {
  return await api.get(
    `/glodok/v1/data?type=getallreview&destinasiid=${destinasiid}&rating=${rating}`,
    {
      params,
    }
  );
};

const getAvgRating = async (destinasiid) => {
  return await api.get(
    `/glodok/v1/data?type=getavgreview&destinasiid=${destinasiid}`
  );
};

const getDestinasiDropDown = async () => {
  return await api.get(`/glodok/v1/data?type=getdestinasiddml`);
};

//destinasi
const getDestinasi = async (jenisdestinasiid, name) => {
  return await api.get(
    `/glodok/v1/data?type=getalldestinasi&jenisdestinasiid=${jenisdestinasiid}&destinasiname=${name}`
  );
};

const getDestinasiByID = async (id) => {
  return await api.get(
    `/glodok/v1/data?type=getdestinasibyid&destinasiid=${id}`
  );
};

const getJenisDestinasiDropDown = async () => {
  return await api.get(`/glodok/v1/data?type=getjenisdestinasiml`);
};

//maps
const getMaps = async () => {
  return await api.get(`/glodok/v1/data?type=getmaps`);
};

//transportasi
const getTransportasi = async (statusperbaikan) => {
  return await api.get(
    `/glodok/v1/data?type=gettransportasiml&perbaikanyn=${statusperbaikan}`
  );
};

//berita
const getBerita = async (judul, params) => {
  return await api.get(`/glodok/v1/data?type=getberitaml&judul=${judul}`, {
    params,
  });
};

const getBeritaByID = async (id) => {
  return await api.get(`/glodok/v1/data?type=getberitabyid&beritaid=${id}`);
};

//user
const loginUser = async (username, pass) => {
  return await api.post(
    `/glodok/v1/data?type=submitloginml&username=${username}&pass=${pass}`
  );
};

const insertUser = async (payload) => {
  return await api.post("/glodok/v1/data?type=insertuser", payload);
};

const getUser = async (userid) => {
  return await api.get(`/glodok/v1/data?type=getuser&userid=${userid}`);
};

const updateUser = async (userid, payload) => {
  return await api.put(
    `/glodok/v1/data?type=updateuser&userid=${userid}`,
    payload
  );
};

export default {
  //beranda
  getFotoBeranda,
  getSejarahBeranda,
  getVideoBeranda,

  //review
  insertReview,
  getReview,
  getAvgRating,
  getDestinasiDropDown,

  //destinasi
  getDestinasi,
  getDestinasiByID,
  getJenisDestinasiDropDown,

  //maps
  getMaps,

  //transportasi
  getTransportasi,

  //berita
  getBerita,
  getBeritaByID,

  //user
  loginUser,
  insertUser,
  getUser,
  updateUser,
};
