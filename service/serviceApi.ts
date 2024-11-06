import { ComboRequest } from "@/model/Service";
import axios from "axios";
import { ApplicationConstants } from "@/constants/ApplicationConstants";

export const api = axios.create({
  baseURL: ApplicationConstants.BASE_URL_WITHOUT_VERSION,
});

export const comboApi = {
  getCombo: async () => {
    try {
      const response = await api.get("/customer/combos/get-all-combos");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getDetailCombo: async (id: number) => {
    try {
      const response = await api.get(`/customer/combos/get-combo-by-id/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getService: async () => {
    try {
      const response = await api.get("/customer/services/get-all-services");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
