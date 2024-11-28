import { Button, Checkbox, Select, Textarea, TextInput } from "flowbite-react";
import { Field, FieldArray, Form, Formik } from "formik";
import { DeliverType, OrderType, PayType } from "../../enums/projectEnums";
import { ClientInterface, OrdersInterface } from "../../types";
import OrderPartsComponent from "../../components/OrderPartsComponent";
import OrderHistory from "../../components/OrderHistory";
import { useEffect, useState } from "react";

const CreateOrders = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    project: "project1",
    cardNumber: "1",
    orderType: OrderType.Local_Market,
    clientId: 1,
    manufacturer: "man",
    model: "",
    chassisNumber: "",
    engineNumber: "",
    produceYear: "2024",
    km: "",
    vehicleNumber: "",
    paymentType: PayType.Transfer,
    delivering: DeliverType.Fast,
    deliveringType: "simplified",
    initialPayment: 0,
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

  //GET ALL CLIENTS

  useEffect(() => {
    const getAllClients = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/client/getClients",
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log(data);

        if (!res.ok || data.success === false) {
          setError(data.message);
        } else {
          setClients(data);
        }
      } catch (error: any) {
        setError(error);
      }
    };
    getAllClients();
  }, []);

  //SUMBIT FORM TO BACKEND
  const onsubmit = async (values: OrdersInterface) => {
    console.log(values);
    try {
      const res = await fetch(
        "http://localhost:3013/api/v1/order/createOrder",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok || data.success === false) {
        setError(data.message);
        return;
      } else {
        setSuccess(data.result);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <div className="min-h-screen mt-[100px] mb-[100px] ml-[90px] ">
      <h2 className="font-semibold text-xl text-center  mb-[50px]">Sifariş</h2>
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
                <Field as={Select} name="project" required sizing="sm">
                  <option value="project1">Project 1</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5 ">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Kart nömrəsi
                </label>
                <Field as={Select} name="cardNumber" sizing="sm">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5 ">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Sifarişin tipi
                </label>
                <Field as={Select} name="orderType" sizing="sm">
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
                <Field as={Select} name="clientId" className="w-32" sizing="sm">
                  {clients.length > 0 &&
                    clients.map((client: ClientInterface, index: number) => (
                      <option key={index} value={client.id}>
                        {client.companyName}
                      </option>
                    ))}
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Istehsalçı
                </label>
                <Field as={Select} name="manufacturer" className="w-32" sizing="sm">
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
                <Field as={TextInput} name="model" className="w-64" sizing="sm" />
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-start mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Şassi nömrəsi
                </label>
                <Field as={TextInput} name="chassisNumber" className="w-64" sizing="sm"/>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-start mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Mühərrik nömrəsi
                </label>
                <Field as={TextInput} name="engineNumber" className="w-64" sizing="sm"/>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Buraxılış ili
                </label>
                <Field as={Select} name="produceDate" className="w-32" sizing="sm">
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
                <Field as={TextInput} name="km" className="w-64" sizing="sm"/>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-start mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Maşın nömrəsi
                </label>
                <Field as={TextInput} name="vehicleNumber" className="w-64" sizing="sm"/>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Ödəniş üsulu
                </label>
                <Field as={Select} name="paymentType" className="w-32" sizing="sm">
                  <option value={PayType.Transfer}>Köçürmə</option>
                  <option value={PayType.Cash}>Nağd</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Çatdırılma
                </label>
                <Field as={Select} name="delivering" sizing="sm">
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
                <Field as={Select} name="deliveringType" sizing="sm">
                  <option value="simplified">Sadələşmiş</option>
                  <option value="standart">Standart</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  İlkin ödəniş
                </label>
                <Field as={Select} name="initialPayment" sizing="sm">
                  <option value="0">0%</option>
                  <option value="65">65%</option>
                </Field>
                <span className="text-red-700 ml-4 text-lg">*</span>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Şərh
                </label>
                <Field as={Textarea} rows={5} name="comment" className="w-96" sizing="sm"/>
              </div>

              <div className="flex  items-center mt-5">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Yağ
                </label>
                <Field as={Checkbox} name="oil" sizing="sm"/>
              </div>

              <div className="mt-10 ">
                <FieldArray name="parts">
                  {({ push }) => (
                    <div className="border text-sm  w-3/4 p-5 rounded-md ">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              №
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Detalın nömrəsi
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Sayı
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Anbarda varmı
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Detalın adı
                            </th>
                            <th scope="col" className="px-6 py-3">
                              #
                            </th>
                          </tr>
                        </thead>
                        {values.parts.map((_, index) => (
                          <OrderPartsComponent
                            name={`parts[${index}]`}
                            key={index}
                            index={index}
                            deletePart={() => deletePart(index)}
                            value={values.parts[index]}
                          />
                        ))}
                      </table>

                      <div className="flex gap-5">
                        <Button
                          color="blue"
                          size="xs"
                          className="mt-5"
                          onClick={() =>
                            push({
                              partNumber: "",
                              count: 1,
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
                        <option value="">Aqil Huseyniv</option>
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
                <Button type="submit" size={"sm"} color={"blue"}>
                  Yadda Saxla
                </Button>
                <Button size={"sm"} color={"blue"}>
                  Təsdiqlə
                </Button>
              </div>
              {!error && success && (
                <p className="my-10 text-sm text-green-700">{success}</p>
              )}
              {error && !success && (
                <p className="my-10 text-sm text-red-700">{error}</p>
              )}
            </Form>
          );
        }}
      </Formik>

      <OrderHistory />
    </div>
  );
};

export default CreateOrders;
