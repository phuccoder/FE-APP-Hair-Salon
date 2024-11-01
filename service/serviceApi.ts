import { ComboRequest } from "@/model/Service";
import axios from "axios";
import { ApplicationConstants } from "@/constants/ApplicationConstants";

export const api = axios.create({
  baseURL: ApplicationConstants.BASE_URL_WITHOUT_VERSION,
});

export const comboApi = {
  getCombo: async () => {
    try {
      const response = await api.get("customer/combos/get-all-combos");
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
      const response = await api.get(`customer/combos/get-combo-by-id/${id}`);
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
  },
};
