import { VITE_API_BASE_URL } from "../config";
import axios from "axios";





export const getBrandDatas = async () => {
  try {
    const response = await axios.get(`${VITE_API_BASE_URL}brand/getBrands`);

    const data:any = response.data;

    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Brend məlumatları alınmadı");
    }

    return data; // This should be an array of brands
  } catch (error: any) {
    console.error("getBrandDatas error:", error);
    throw new Error(error.response?.data?.message || error.message || "Xəta baş verdi");
  }
};



export const getSupplierDatas = async () => {
  try {
    const response = await axios.get(`${VITE_API_BASE_URL}supplier/getSuppliers`);

    const data:any = response.data;

    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Təchizatçı məlumatları alınmadı");
    }

    return data; // Expected to be an array of suppliers
  } catch (error: any) {
    console.error("getSupplierDatas error:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  }
};
