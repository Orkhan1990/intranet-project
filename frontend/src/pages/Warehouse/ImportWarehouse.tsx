import { Field, FieldArray, Form, Formik } from "formik";
import {  OrderInterface, SupplierInterface, WarehouseInterface } from "../../types";
import { Liquidity, Market, PayType } from "../../enums/projectEnums";
import { Button, Select,Textarea, TextInput } from "flowbite-react";
import NewPartsComponent from "../../components/NewPartsComponent";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux-toolkit/features/brand/brandSlice';
import { fetchSuppliers } from '../../redux-toolkit/features/supplier/supplierSlice';
import { RootState, AppDispatch } from '../../redux-toolkit/store/store';
import { createInvoice } from "../../api/allApi";
import { fetchOrders } from "../../redux-toolkit/features/order/orderSlice";



const ImportWarehouse = () => {
 
  // const[brands,setBrands]=useState<BrandInterface[]>([]);
  const[error,setError]=useState<string>("");
  const[success,setSuccess]=useState<string>("")
  const[addingValue,setAddingValue]=useState<number>(1);
  // const[suppliers,setSuppliers]=useState<SupplierInterface[]>([]);
  const navigate=useNavigate();

  const dispatch = useDispatch<AppDispatch>();

const { brands, loading: brandsLoading, error: brandsError } = useSelector((state: RootState) => state.brand);
const { suppliers, loading: suppliersLoading, error: suppliersError } = useSelector((state: RootState) => state.supplier);
const { orders, loading: ordersLoading, error: ordersError } = useSelector((state: RootState) => state.order);


useEffect(() => {
  dispatch(fetchBrands());
  dispatch(fetchSuppliers());
  dispatch(fetchOrders());
}, [dispatch]);



  const wareHouseInitialValues: WarehouseInterface = {
    requestId: 0,
    supplierId: suppliers[0]?.id||0,
    invoice: "",
    market: Market.Local,
    paymentType: PayType.Cash,
    comment: "",
    parts: [
      {
        kod: "",
        origKod: "",
        nameParts: "",
        brand:Number(brands[0]?.id||0),
        liquidity: Liquidity.Fast,
        count: 0,
        price: 0,
        salesPrice: 0,
        barcode:""
      },
    ],
    message: "",
  };

  const handleAddingValue=(e:any)=>{
    setAddingValue(Number(e.target.value));
  }

  const handleFileChange = (event: any, setFieldValue: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      const partsData = jsonData.map((item: any) => ({
        kod: item.Kod || "",
        origKod: item.OriginalKod || "",
        nameParts: item.Name || "",
        brand: item.Brand || 0,
        liquidity: item.Liquidity || Liquidity.Fast,
        count: item.Count || 0,
        price: item.Price || 0,
        salesPrice: item.SalesPrice || 0,
      }));

      setFieldValue("parts", partsData);
    };

    reader.readAsArrayBuffer(file);
  };

  const onsubmit =async (values: WarehouseInterface) => {
    console.log(values);
    try {
      const data=await createInvoice(values);
        console.log(data);
        
      if(data.success===false){
        setError(data.message);
        return;
      }else{
        setSuccess(data.result);
        navigate('/warehouse');
        window.scrollTo(0,0);
      }
    } catch (error:any) {
      setError(error)
    }
  };



  return (
    <div className="min-h-screen mt-[100px] mb-[100px]">
      <h2 className="font-semibold text-xl text-center  mb-[50px]">
        Anbara daxil etmək
      </h2>

      <Formik initialValues={wareHouseInitialValues} onSubmit={onsubmit} enableReinitialize>
        {({ values, setFieldValue }) => {
          const deletePart = (index: number) => {
            setFieldValue(
              "parts",
              values.parts.filter((_, i) => i !== index)
            );
          };
          return (
            <Form className="ml-[90px]">
              <div className="flex  items-center ">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Zayavka nömrəsi
                </label>
                <Field as={Select} name="requestId" className="w-20" sizing="sm">
                  {
                    orders.length>0&&orders.map((item:OrderInterface,index:number)=>(
                      <option value={item.id} key={index}>{item.id}</option>
                    ))
                  }
                </Field>
              </div>

              <div className="flex  items-center mt-5 ">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Təchizatçı
                </label>
                <Field as={Select} name="supplierId" className="w-96" sizing="sm">
                  {
                    suppliers.length>0&&suppliers.map((item:SupplierInterface,index:number)=>(
                      <option value={item.id} key={index}>{item.supplier}</option>
                    ))
                  }
                </Field>
              </div>

              <div className="flex  items-center mt-5 ">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Hesab
                </label>
                <Field as={TextInput} name="invoice" sizing="sm"/>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Bazar
                </label>
                <Field as={Select} name="market" className="w-32" sizing="sm">
                  <option value={Market.Local}>Yerli</option>
                  <option value={Market.External}>Xarici</option>
                  <option value={Market.Based_On_The_Act}>Akt Əsasında</option>
                </Field>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Ödəniş üsulu
                </label>
                <Field as={Select} name="paymentType" className="w-32" sizing="sm">
                  <option value={PayType.Cash}>Nağd</option>
                  <option value={PayType.Transfer}>Xarici</option>
                </Field>
              </div>

              <div className="flex  items-start mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Şərh yaz
                </label>
                <Field
                  as={Textarea}
                  rows={7}
                  name="comment"
                  className="w-1/2"
                  sizing="sm"
                />
              </div>

              <div className="mt-10 ">
                <FieldArray name="parts">
                  {({ push }) => (
                    <div className="border text-sm w-[95%] p-5 rounded-md ">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                              №
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Kod
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Original Kod
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Adı
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Brend
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Likvidlik
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                              Say
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                              Qiymet
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Satış Qiyməti
                            </th>
                            <th scope="col" className="px-6 py-3">
                              #
                            </th>
                          </tr>
                        </thead>
                        {values.parts.map((_, index) => (
                          <NewPartsComponent
                            name={`parts[${index}]`}
                            key={index}
                            index={index}
                            deletePart={() => deletePart(index)}
                            brands={brands}
                          />
                        ))}
                      </table>
                      <div className="flex gap-3  items-center mt-5">
                        <TextInput sizing={"sm"} className="w-20" onChange={handleAddingValue}/>

                    <Button
  color="blue"
  size="xs"
  onClick={() => {
    const countToAdd = addingValue > 0 ? addingValue : 1;
    for (let i = 0; i < countToAdd; i++) {
      push({
        kod: "",
        origKod: "",
        nameParts: "",
        brand: Number(brands[0]?.id || 0),
        liquidity: Liquidity.Fast,
        count: 0,
        price: 0,
        salesPrice: 0,
        barcode: "",
      });
    }
  }}
>
  Əlavə et <span className="ml-2 ">+</span>
</Button>


                      </div>
                     
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="mt-10 flex justify-between mr-[130px] ">
                <div className="flex items-center">
                  <label htmlFor="fileUpload" className="text-sm w-[200px]">
                    Excel Fayl Yüklə
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    accept=".xlsx, .xls"
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                    className="ml-2 text-sm"
                  />
                </div>
                <div>
                  <div className="w-[400px] flex flex-col gap-2">
                    <h2>Mesaj</h2>
                    <Field as={Textarea} rows={5} name="message" />
                    <Button color={"blue"} className="w-20" size={"xs"}>
                      Mesaj Yaz
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-20">
                <Button size={"xs"} color={"blue"} type="submit">
                  Yadda Saxla
                </Button>
                {/* <Button size={"sm"} color={"blue"}>
                  Təsdiqlə
                </Button> */}
              </div>
            </Form>
          );
        }}
      </Formik>
      {
        !error&&success&&(<p className="mt-10 ml-10 text-sm text-green-700">{success}</p>)

      }
      {
        error&&!success&&(<p className="mt-10 ml-10 text-sm text-red-700">{error}</p>)

      }
    </div>
  );
};

export default ImportWarehouse;
