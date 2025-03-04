import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com"; // Change this to your backend API

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// CRUD Functions
export const getItems = async (endpoint: string) => {
  const response = await api.get(`/${endpoint}`);
  return response.data;
};

export const createItem = async (endpoint: string, data: object) => {
  const response = await api.post(`/${endpoint}`, data);
  return response.data;
};

export const updateItem = async (endpoint: string, id: number, data: object) => {
  const response = await api.put(`/${endpoint}/${id}`, data);
  return response.data;
};

export const deleteItem = async (endpoint: string, id: number) => {
  await api.delete(`/${endpoint}/${id}`);
};
