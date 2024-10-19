import { ComboRequest } from "@/model/Service";
import axios from "axios";

const api = axios.create({
  baseURL: "http://34.126.80.91:8085/api/",
});

export const comboApi = {
  getCombo: async () => {
    try {
      const response = await api.get("combos-management/get-all-combos");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  createCombo: async (data: ComboRequest) => {
    try {
      const response = await api.post("combos-management/create-combo", data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getDetailCombo: async (id: number) => {
    try {
      const response = await api.get(`combos-management/get-combo-by-id/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getService: async () => {
    try {
      const response = await api.get("services-management");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
};
