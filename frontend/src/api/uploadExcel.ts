import axios from "axios";
import { API_BASE_URL } from "../config";

export const uploadExcell = async (
  formData: any,
  setUpload: any,
  setError: any
) => {
  setUpload(true);

  console.log("Uploading file...", API_BASE_URL);

  try {
    const response = await axios.post(
      `${API_BASE_URL}priceList/createPriceList`,
      formData,
      {
        withCredentials: true,
      }
    );

    console.log("Upload successful:", response.data);

    setUpload(false);
    return response.data;
  } catch (error: any) {
    console.log(error);
    setError(error.response?.data || error.message);
  }
};
