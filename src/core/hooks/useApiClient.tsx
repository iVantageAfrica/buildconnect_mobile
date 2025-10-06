import axios, { AxiosInstance } from "axios";

export const useApiClient = (): AxiosInstance => {
  return axios.create({
    baseURL: "",
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


