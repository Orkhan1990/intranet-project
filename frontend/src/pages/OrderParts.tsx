import {
  Button,
  Checkbox,
  Select,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import { Field, FieldArray, Form, Formik } from "formik";
import { DeliverType, OrderType, PayType } from "../enums/projectEnums";
import { OrdersInterface } from "../types";
import OrderPartsComponent from "../components/OrderPartsComponent";
import OrderHistory from "../components/OrderHistory";

const Orders = () => {
  const produceDateData: string[] = [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
  ];

  const ordersInitialValue: OrdersInterface = {
    project: "",
    cardNumberId: 0,
    orderType: OrderType.Local_Market,
    clientId: 0,
    brandId: 0,
    model: "",
    chassisNumber: "",
    engineNumber: "",
    produceDate: "",
    probeg: "",
    gosNumber: "",
    payType: PayType.Transfer,
    deliverPeriod: DeliverType.Fast,
    deliverMethod: "",
    prepayment: 0,
    comment: "",
    oil: false,
    parts: [
      {
        partNumber: "",
        count: 1,
        checkOnWarehouse: false,
        partName: "",
      },
    ],
  };

  const onsubmit = (values: OrdersInterface) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen mt-[100px] mb-[100px] ml-[90px] ">
      <h2 className="font-semibold text-xl text-center  mb-[50px]">
        Sifariş
      </h2>
      <Formik initialValues={ordersInitialValue} onSubmit={onsubmit}>
        {({ values, setFieldValue }) => {
          const deletePart = (index: number) => {
      
              setFieldValue(
                "parts",
                values.parts.filter((_, i) => i !== index)
              );
         
          };
          return (
            <Form>
              <div className="flex  items-center ">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Proyekt
                </label>
                <Field as={Select} name="project" required>
                  <option value="project1">Project 1</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5 ">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Kart nömrəsi
                </label>
                <Field as={Select} name="cardNumberId">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5 ">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Sifarişin tipi
                </label>
                <Field as={Select} name="orderType">
                  <option value={OrderType.Standart_Client}>
                    Standart (müştəri)
                  </option>
                  <option value={OrderType.Local_Market}>Yerli bazar</option>
                  <option value={OrderType.Stok}>Stok</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Müştəri
                </label>
                <Field as={Select} name="clientId" className="w-32">
                  <option value="zqan">Zqan</option>
                  <option value="avrora">Avrora</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Istehsalçı
                </label>
                <Field as={Select} name="brandId" className="w-32">
                  <option value="man">Man</option>
                  <option value="bobcat">Bobcat</option>
                  <option value="sumitomo">Sumitomo</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-start mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Model
                </label>
                <Field as={TextInput} name="model" className="w-64" />
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-start mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Şassi nömrəsi
                </label>
                <Field as={TextInput} name="chassisNumber" className="w-64" />
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-start mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Mühərrik nömrəsi
                </label>
                <Field as={TextInput} name="engineNumber" className="w-64" />
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Buraxılış ili
                </label>
                <Field as={Select} name="produceDate" className="w-32">
                  {produceDateData.map((item: string) => (
                    <option value={item}>{item}</option>
                  ))}
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-start mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Km/saat
                </label>
                <Field as={TextInput} name="probeg" className="w-64" />
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-start mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Maşın nömrəsi
                </label>
                <Field as={TextInput} name="gosNumber" className="w-64" />
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Ödəniş üsulu
                </label>
                <Field as={Select} name="payType" className="w-32">
                  <option value={PayType.Transfer}>Köçürmə</option>
                  <option value={PayType.Cash}>Nağd</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Çatdırılma
                </label>
                <Field as={Select} name="deliverPeriod">
                  <option value={DeliverType.Fast}>Təcili (7-15 gün)</option>
                  <option value={DeliverType.Normal_Fast}>
                    Orta (15-30 gün)
                  </option>
                  <option value={DeliverType.Planned}>
                    Planlaşdırılmış (40-60 gün)
                  </option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Çatdırılma üsulu
                </label>
                <Field as={Select} name="deliverMethod">
                  <option value="simplified">Sadələşmiş</option>
                  <option value="standart">Standart</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  İlkin ödəniş
                </label>
                <Field as={Select} name="prepayment">
                  <option value="0">0%</option>
                  <option value="65">65%</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Şərh
                </label>
                <Field as={Textarea} rows={5} name="comment" className="w-96" />
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Yağ
                </label>
                <Field as={Checkbox} name="oil" />
              </div>

              <div className="mt-10 ">
                <FieldArray name="parts">
                  {({ push, remove }) => (
                    <div className="border text-sm w-[50%] p-5 rounded-md ">
                      <Table className="flowbite-table">
                        <Table.Head>
                          <Table.HeadCell>№</Table.HeadCell>
                          <Table.HeadCell>Detalın nömrəsi</Table.HeadCell>
                          <Table.HeadCell>Sayı</Table.HeadCell>
                          <Table.HeadCell>Anbarda varmı</Table.HeadCell>
                          <Table.HeadCell>Detalın adı</Table.HeadCell>
                          <Table.HeadCell>#</Table.HeadCell>
                        </Table.Head>
                        {values.parts.map((_, index) => (
                          <OrderPartsComponent
                            name={`parts[${index}]`}
                            key={index}
                            index={index}
                            deletePart={() => deletePart(index)}
                            value={values.parts[index]}
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
                              partNumber: "",
                              count: 0,
                              checkOnWarehouse: false,
                              partName: "",
                            })
                          }
                        >
                          Əlavə et <span className="ml-2 ">+</span>
                        </Button>
                        <Button color="blue" size="xs" className="mt-5">
                          Anbarda yoxla
                        </Button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="mt-10 flex justify-between mr-[190px] ">
                <div></div>

                <div className="flex flex-col gap-5 border p-5 rounded-md">
                  <div className="w-[400px] flex flex-col gap-2">
                    <h2>Geri qaytarma səbəbi</h2>
                    <Field as={Textarea} rows={5} name="message" />
                    <div className="flex gap-2">
                    <Field as={Select} className="flex-1">
                        <option value="">Cavabdehliyi dəyişmək</option>
                        <option value="">Sifarişin yerləşdirilməsi</option>
                        <option value="">Təchizatçıya müraciət</option>
                        <option value="">Təchizatçıya cavab verin</option>
                        <option value="">Qiymətləndirmə</option>
                        <option value="">Mühasibatlığın təsdiqi</option>
                        <option value="">Sifarişi bağlamaq</option>
                        <option value="">Çatdırıldı</option>


                    </Field>
                    <Field as={Select} className="flex-1">
                        <option value="">Heybet Cebrayilov</option>
                        <option value="">Royal Amirli</option>
                        <option value="">Ilkin Mammadov</option>
                        <option value="">Aqil  Huseyniv</option>
                    </Field>
                  </div>
                  </div>

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
          );
        }}
      </Formik>

      <OrderHistory/>
    </div>
  );
};

export default Orders;
