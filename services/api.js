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
//   baseURL: "https://whole-doors-clap.loca.lt",
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

const getReview = async (rating, params) => {
  return await api.get(`/glodok/v1/data?type=getallreview&rating=${rating}`, {
    params,
  });
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
  return await api.get(`/glodok/v1/data?type=getjenisdestinasidropdown`);
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

export default {
  //beranda
  getFotoBeranda,
  getSejarahBeranda,
  getVideoBeranda,

  //review
  insertReview,
  getReview,

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
};
