import axios from "axios";

export const axiosStandart = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API
});