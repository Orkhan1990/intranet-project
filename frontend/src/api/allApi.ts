import { VITE_API_BASE_URL } from "../config";
import axios from "axios";

export const getBrandDatas = async () => {
  try {
    const response = await axios.get(`${VITE_API_BASE_URL}brand/getBrands`);

    const data: any = response.data;

    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Brend məlumatları alınmadı");
    }

    return data; // This should be an array of brands
  } catch (error: any) {
    console.error("getBrandDatas error:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  }
};

export const getSupplierDatas = async () => {
  try {
    const response = await axios.get(
      `${VITE_API_BASE_URL}supplier/getSuppliers`
    );

    const data: any = response.data;

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

export const createPrixod = async (prixodData: any) => {
  console.log(prixodData);
  
  try {
    const response = await axios.post(
      `${VITE_API_BASE_URL}prixod/createPrixod`,
      prixodData,
      {
          withCredentials: true
      }
    );
    const data: any = response.data;

    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Faktura yaradılmadı");
    }
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  }
};

export const getOrdersData = async () => {
  try {
    const response = await axios.get(`${VITE_API_BASE_URL}order/getAllOrders`);
    const data: any = response.data;

    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Sifariş məlumatları alınmadı");
    }
    return data; // This should be an array of orders
  } catch (error: any) {
    console.error("getOrdersData error:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  }
};

export const getClientsData = async () => {
  try {
    const response = await axios.get(
      `${VITE_API_BASE_URL}client/getClients`
    );
    const data: any = response.data;
    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Müştəri məlumatları alınmadı");
    }
    return data; // This should be an array of clients
  } catch (error: any) {
    console.error("getClientsData error:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  }
};

export const getPrixodsData = async () => {
  try {
    const response = await axios.get(`${VITE_API_BASE_URL}prixod/getPrixods`);
    const data: any = response.data;
    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Müştəri məlumatları alınmadı");
    }
    return data; // This should be an array of clients
  } catch (error: any) {
    console.error("getClientsData error:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  }
};

export const getPrixodById = async (id: number) => {
  try {
    const response = await axios.get(`${VITE_API_BASE_URL}prixod/getPrixodById/${id}`, {
    });
    const data: any = response.data;
    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Müştəri məlumatları alınmadı");
    }

    return data; // This should be an array of clients
  } catch (error: any) {
    console.error("getClientsData error:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  } 
};



export const updatePrixod = async (id: number, prixodData: any) => {
  try {
    const response = await axios.put(`${VITE_API_BASE_URL}prixod/updatePrixod/${id}`,prixodData, {
      withCredentials: true
    });
    const data: any = response.data;
    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Faktura yenilənmədi");
    }
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  } 
};

export  const writeMessageApi=async(id:number,message:string)=>{
  try {
    const response = await axios.put(`${VITE_API_BASE_URL}prixod/writeMessage/${id}`,{message}, { 
      withCredentials: true
    });
    const data: any = response.data;  
    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Mesaj yazılmadı");
    }
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  }
};  

export const confirmPrixodApi=async(id:number)=>{
  try {
    const response = await axios.put(`${VITE_API_BASE_URL}prixod/confirmPrixod/${id}`, {
      withCredentials: true
    });
    const data: any = response.data;  
    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Faktura təsdiqlənmədi");
    }
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  } 
};

export const confirmLastPrixodApi=async(id:number,message:string)=>{
  try {
    const response = await axios.put(`${VITE_API_BASE_URL}prixod/confirmLastPrixod/${id}`,{message}, {  
      withCredentials: true
    });
    const data: any = response.data;  
    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Faktura təsdiqlənmədi");
    }
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  } 
};

export const rejectPrixodApi=async(id:number,message:string)=>{
  try {
    const response = await axios.put(`${VITE_API_BASE_URL}prixod/rejectPrixod/${id}`,{message}, {  
      withCredentials: true
    });
    const data: any = response.data;
    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Faktura təsdiqlənmədi");
    }
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  }
};


export const getUsersData= async()=>{
  try {

    const response=await axios.get(`${VITE_API_BASE_URL}user/getAllUsers`);
    const data: any = response.data;
    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "İstifadəçi məlumatları alınmadı");
    }
    return data;
    
  } catch (error:any) {
     console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  }
}

export const getReceptionUsersData= async()=>{
  try {
    const response=await axios.get(`${VITE_API_BASE_URL}user/getReceptionWorkers`);
    const data: any = response.data;
    if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Qəbul işçiləri məlumatları alınmadı");
    }
    return data;
    
  }
    catch (error:any) { 
      console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
  }
}

export const addToCard=async(id:string,selectedCount:number,cardId:any)=>{
  try {
    const response=await axios.post(`${VITE_API_BASE_URL}card/addToCard`,{id,selectedCount,cardId},{  
      withCredentials: true
    });

    const data: any = response.data;
      if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Faktura təsdiqlənmədi");
    }
    return data;
    
  } catch (error:any) {
     console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );
    
  }
}

export const createCardApi=async(cardData:any,totalPriceWorker:any)=>{
  try {
    const response=await axios.post(`${VITE_API_BASE_URL}card/createCard`,{cardData,totalPriceWorker},{  
      withCredentials: true
    });
    const data: any = response.data;
      if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Kart yaradılmadı");
    } 
    return data;
    
  } catch (error:any) {
     console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );    
  }
}

export const getWorkerUsers=async()=>{  
  try {
    const response=await axios.get(`${VITE_API_BASE_URL}user/getWorkers`);
    const data: any = response.data;  
      if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "İşçi məlumatları alınmadı");
    } 
    return data;

  } catch (error:any) {

      console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );  
  } 
}


export const filterTheCardsAPI=async(filters:any)=>{  
  try {
    const response=await axios.post(`${VITE_API_BASE_URL}card/filterCards`,{filters},{
      withCredentials: true
    });
    const data: any = response.data;  
      if (!response.status.toString().startsWith("2") || data.success === false) {
      throw new Error(data.message || "Kart məlumatları alınmadı");
    }
    return data;
  } catch (error:any) {
      console.log(error);
    throw new Error(
      error.response?.data?.message || error.message || "Xəta baş verdi"
    );  
  } 
}


export const  fetchCardDetails = async (id:any) => {

  console.log({id},"necesen?????");
  
  try {
      const res = await axios.get(`${VITE_API_BASE_URL}card/getCardDetails/${id}`);
      const data: any = res.data;
      if (!res.status.toString().startsWith("2") || data.success === false) {
        throw new Error(data.message || "Kart məlumatları alınmadı");
      }
      return data;
    } catch (error: any) {
      console.error("fetchCardDetails error:", error);
      throw new Error(
        error.response?.data?.message || error.message || "Xəta baş verdi"
      );
    }

  }


  export const updateCardApi=async(id:any,cardData:any,totalPriceWorker:any)=>{
    try {
      const response=await axios.post(`${VITE_API_BASE_URL}card/updateCard/${id}`,{cardData,totalPriceWorker},{
        withCredentials: true
      });
      const data: any = response.data;
        if (!response.status.toString().startsWith("2") || data.success === false) {
        throw new Error(data.message || "Kart yenilənmədi");
      }
      return data;
    } catch (error:any) {
        console.log(error);
      throw new Error(
        error.response?.data?.message || error.message || "Xəta baş verdi"
      );    
    } 
  }


  export const returnPart=async(partId:any,cardId:any)=>{
    try {
      const response=await axios.post(`${VITE_API_BASE_URL}card/returnPart`,{partId,cardId},{  
        withCredentials: true
      });
      const data: any = response.data;
        if (!response.status.toString().startsWith("2") || data.success === false) {
        throw new Error(data.message || "Ehtiyat hissə anbara qaytarılmadı");
      } 
      return data;
      
    } catch (error:any) {
       console.log(error);
      throw new Error(
        error.response?.data?.message || error.message || "Xəta baş verdi"
      );    
    } 
  }



