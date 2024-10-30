import { Field, FieldArray, Form, Formik } from "formik";
import { PartsInterface, WarehouseInterface } from "../types";
import { Liquidity, Market, PayType } from "../enums/projectEnums";
import { Button, Select, Table, Textarea, TextInput } from "flowbite-react";
import NewPartsComponent from "../components/NewPartsComponent";
import * as XLSX from 'xlsx';


const ImportWarehouse = () => {
  const wareHouseInitialValues: WarehouseInterface = {
    requestId: 0,
    supplierId: 0,
    invoice: "",
    market: Market.Local,
    paymentType: PayType.Cash,
    comment: "",
    parts: [
      {
        kod: "",
        origKod: "",
        nameParts: "",
        brand: 0,
        liquidity: Liquidity.Fast,
        count: 0,
        price: 0,
        salesPrice: 0,
      },
    ],
    message: "",
  };

  const handleFileChange=(event:any,setFieldValue:any)=>{
      const file=event.target.files[0];
      const reader=new FileReader();

      reader.onload=()=>{
         const data=new Uint8Array(event.target.result);
         const workbook= XLSX.read(data,{type:"array"});
         const firstSheet=workbook.Sheets[workbook.SheetNames[0]];
         const jsonData=XLSX.utils.sheet_to_json(firstSheet);

         const partsData = jsonData.map((item:any) => ({
            kod: item.Kod || "",
            origKod: item.OriginalKod || "",
            nameParts: item.Name || "",
            brand: item.Brand || 0,
            liquidity: item.Liquidity || Liquidity.Fast,
            count: item.Count || 0,
            price: item.Price || 0,
            salesPrice: item.SalesPrice || 0,
          }));

          setFieldValue("parts",partsData)
      }

      reader.readAsArrayBuffer(file);
  }

  const onsubmit = (values: WarehouseInterface) => {
    console.log(values);
  };
  return (
    <div className="min-h-screen mt-[100px] mb-[100px]">
      <h2 className="font-semibold text-xl text-center  mb-[50px]">
        Anbara daxil etmək
      </h2>

      <Formik initialValues={wareHouseInitialValues} onSubmit={onsubmit}>
        {({ values,setFieldValue }) => (
          <Form className="ml-[90px]">
            <div className="flex  items-center ">
              <label htmlFor="" className="text-sm  w-[200px]">
                Zayavka nömrəsi
              </label>
              <Field as={Select} name="requestId" className="w-20">
                <option value="1">1</option>
              </Field>
            </div>

            <div className="flex  items-center mt-5 ">
              <label htmlFor="" className="text-sm  w-[200px]">
                Təchizatçı
              </label>
              <Field as={Select} name="supplierId" className="w-96">
                <option value="1">DHL</option>
                <option value="2">Forex</option>
              </Field>
            </div>

            <div className="flex  items-center mt-5 ">
              <label htmlFor="" className="text-sm  w-[200px]">
                Hesab
              </label>
              <Field as={TextInput} name="invoice" />
            </div>

            <div className="flex  items-center mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Bazar
              </label>
              <Field as={Select} name="market" className="w-32">
                <option value={Market.Local}>Yerli</option>
                <option value={Market.External}>Xarici</option>
                <option value={Market.Based_On_The_Act}>Akt Əsasında</option>
              </Field>
            </div>

            <div className="flex  items-center mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Ödəniş üsulu
              </label>
              <Field as={Select} name="paymentType" className="w-32">
                <option value={PayType.Cash}>Nağd</option>
                <option value={PayType.Transfer}>Xarici</option>
              </Field>
            </div>

            <div className="flex  items-start mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Şərh yaz
              </label>
              <Field as={Textarea} rows={7} name="comment" className="w-1/2" />
            </div>

            <div className="mt-10 ">
              <FieldArray name="parts">
                {({ push, remove }) => (
                  <div className="border text-sm w-[90%] p-5 rounded-md ">
                    <Table className="flowbite-table">
                      <Table.Head>
                        <Table.HeadCell>№</Table.HeadCell>
                        <Table.HeadCell>Kod</Table.HeadCell>
                        <Table.HeadCell>Original Kod</Table.HeadCell>
                        <Table.HeadCell>Adı</Table.HeadCell>
                        <Table.HeadCell>Brend</Table.HeadCell>
                        <Table.HeadCell>Likvidlik</Table.HeadCell>
                        <Table.HeadCell>Say</Table.HeadCell>
                        <Table.HeadCell>Qiymet</Table.HeadCell>
                        <Table.HeadCell>Satış Qiyməti</Table.HeadCell>
                      </Table.Head>
                      {values.parts.map((_, index) => (
                        <NewPartsComponent
                          name={`parts[${index}]`}
                          key={index}
                          index={index}
                        />
                      ))}
                    </Table>
                    <div className="flex gap-5">
                      <Button
                        color="blue"
                        size="xs"
                        className="mt-5"
                        onClick={() =>
                          push({
                            kod: "",
                            origKod: "",
                            nameParts: "",
                            brand: 0,
                            liquidity: Liquidity.Fast,
                            count: 0,
                            price: 0,
                            salesPrice: 0,
                          })
                        }
                      >
                        Əlavə et <span className="ml-2 ">+</span>
                      </Button>
                      <Button
                        size="xs"
                        color="blue"
                        className="mt-5"
                        onClick={() => {
                          if (values.parts.length > 1) {
                            remove(values.parts.length - 1);
                          }
                        }}
                      >
                        Azalt <span className="ml-2 ">-</span>
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
              <Button size={"sm"} color={"blue"}>
                Yadda Saxla
              </Button>
              <Button size={"sm"} color={"blue"}>
                Təsdiqlə
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ImportWarehouse;
