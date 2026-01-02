
import axios, { Method } from "axios";
import { API_BASE_URL } from "./constant";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// GLOBAL RESPONSE HANDLING
api.interceptors.response.use(
  (response) => response,
  (error) => {
  if (error.response) {
    console.error("API Error:", {
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data,
      headers: error.response.headers,
    });
  } else if (error.request) {
    console.error("API Error: No response received", error.request);
  } else {
    console.error("API Error:", error.message);
  }

  return Promise.reject(error);
}
);

const apiCall = async (endpoint: string,
  method: Method,
  data?: string) => {
  try {
    const response = await api({
      url: endpoint,
      method: method,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error; 
  }
};
export default apiCall
