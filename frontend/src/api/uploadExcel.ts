import axios from "axios";
import { VITE_API_BASE_URL } from "../config";

export const uploadExcell = async (
  formData: any,
  setUpload: any,
  setError: any
) => {
  setUpload(true);

  console.log("Uploading file...", VITE_API_BASE_URL);

  try {
    const response = await axios.post(
      `${VITE_API_BASE_URL}priceList/createPriceList`,
      formData
    );

    console.log("Upload successful:", response.data);

    setUpload(false);
    return response.data;
  } catch (error: any) {
    console.log(error);
    setError(error.response?.data || error.message);
  }
};

export const findOrigKodFromPriceList = async (
  orderPartsId: any,
  setError: any,
  delivering: any,
  editableOrderParts:any
) => {
  try {
    console.log({ delivering });

    const response = await axios.post(
      `${VITE_API_BASE_URL}priceList/checkPriceList`,
      { orderPartsId, delivering,editableOrderParts }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    setError(error.response?.data || error.message);
  }
};

export const calculateStandartOrderPrice = async (editableOrderParts: any[],orderPartsId:any) => {
  try {
    const response = await axios.post(
      `${VITE_API_BASE_URL}priceList/calculateStandartOrderPrice`,
      { editableOrderParts,orderPartsId }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
