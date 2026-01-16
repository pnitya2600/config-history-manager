import axios from "axios";

const API_BASE = "http://localhost:5050";


export const getConfig = () =>
  axios.get(`${API_BASE}/config`);

export const saveConfig = (config) =>
  axios.post(`${API_BASE}/config/save`, config);

export const getVersions = () =>
  axios.get(`${API_BASE}/config/versions`);

export const getDiff = (from, to) =>
  axios.get(`${API_BASE}/config/diff`, {
    params: { from, to }
  });
