import { Button, Checkbox, Select, Textarea, TextInput } from "flowbite-react";
import { Field, Form, Formik } from "formik";
import { DeliverType, OrderType, PayType } from "../../enums/projectEnums";
import {
  ClientInterface,
  EditOrderInterface,
  UserInterface,
} from "../../types";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActionsOnOrder from "../../components/ActionsOnOrder";
import { FiUpload } from "react-icons/fi";
import * as XLSX from "xlsx"; // Import the library
import { BeforeCalculationOrderPartsComponent } from "../../components/BeforeCalculationOrderPartsComponent";
import { AfterCalculationOrderPartsComponent } from "../../components/AfterCalculationOrderPartsComponent";

const EditOrder = () => {
  const [clients, setClients] = useState([]);
  const [officeUsers, setOfficeUsers] = useState<UserInterface[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const [excellOrderParts, setExcellOrderParts] = useState<any[]>([]);
  const [orderParts, setOrderParts] = useState<any[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);


  const [orderInitialValue, setOrdersInitialValue] =
    useState<EditOrderInterface>({
      id: 0,
      project: "project1",
      cardNumber: "1",
      orderType: OrderType.Local_Market,
      client: {
        id: 0,
        companyName: "",
        companyRepresentative: "",
        phoneNumber: "",
        email: "",
        address: "",
        requisite: "",
        voen: "",
        contractNumber: "",
        contractDate: "",
        approver: "",
        oneCCode: "",
        type: "",
        typeOfStatus: "",
        av: 0,
        partsDiscount: 0,
      },
      manufacturer: "Man",
      model: "",
      chassisNumber: "",
      engineNumber: "",
      produceYear: "2024",
      km: "",
      confirm: false,
      accept: false,
      acceptMessage: "",
      rejectMessage: "",
      confirmDate: new Date(),
      vehicleNumber: "",
      paymentType: PayType.Transfer,
      delivering: DeliverType.Fast,
      deliveringType: "simplified",
      initialPayment: 0,
      isExcellFile: false,
      isResponsible: false,
      responsibleDate: new Date(),
      isFinishCalculation:false,
      responsibleUser: {
        id: 0,
        userName: "",
        email: "",
        password: "",
        lastName: "",
        firstName: "",
      },
      comment: "",
      oil: false,
      orderParts: [
        {
          id: 0,
          origCode: "",
          count: 1,
          stockQuantity: 0,
          checkOnWarehouse: false,
          partName: "",
          price: 0,
          totalPrice: 0,
          transport: 0,
          sipPrice: 0,
          unitSipPrice: 0,
          percent: 0,
          profit: 0,
          sellPrice: 0,
          unitSellPrice: 0,
          delivering: ""
        },
      ],
      orderHistory: [
        {
          id: 0,
          step: "",
          confirm: false,
          message: "",
          reject: "",
          file: "",
          showHide: false,
          showResult:false,
          date: new Date(),
          user: {
            id: 0,
            userName: "",
            email: "",
            lastName: "",
            firstName: "",
          },
          supplierOrderHistories: [
            {
              id: 0,
              date: new Date(),
              file: "",
              supplier: {
                id: 0,
                contactPerson: "",
                country: "",
                supplier: "",
                email: "",
              },
            },
          ],
        },
      ],
    });

  const produceDateData: string[] = [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
  ];

  // console.log(orderInitialValue,"qaqa");

  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  //EXCELL DEPLOYMENT

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      // console.log(fileExtension);

      if (fileExtension !== "xlsx") {
        setFileError(".xlsx faylı seçin!");
      }
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event: any) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        // Assuming the data is in the first sheet

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);

        // Convert data into the format of `orderParts`
        const parsedOrderParts = data.map((item: any) => ({
          partNumber: item["Orig Code"] || "",
          count: item["Count"] || 1,
          partName: item["Part Name"] || "",
        }));
        // console.log(parsedOrderParts);

        setExcellOrderParts(parsedOrderParts);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const uploadExcelFile = async (id: number) => {
    if (!fileInputRef.current?.files?.[0]) {
      setFileError("Excel faylı seç!");
      return;
    }
    setFileError("");
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/updateOrderParts/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ excellOrderParts }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setRefreshData(true);
        setFileName("");
        console.log(data);
      }
    } catch (error: any) {
      
      setFileError(error.message);
    }
  };

  //GET ORDER

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost:3013/api/v1/order/getOrder/${id}`,
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log(data, "orderInfo.......");

        if (!res.ok || data.success === false) {
          setError(data.message);
        } else {
          setOrdersInitialValue(data);
        }
      } catch (error: any) {
        setError(error);
      }
    };

    const getAllOrderParts = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/order/getAllOrderParts",
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (!res.ok || data.success === false) {
          setError(data.message);
        } else {
          setOrderParts(data);
        }
      } catch (error: any) {
        setError(error);
      }
    };

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

        if (!res.ok || data.success === false) {
          setError(data.message);
        } else {
          setClients(data);
        }
      } catch (error: any) {
        setError(error);
      }
    };

    const getAllOfficeWorkers = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/user/getOfficeWorkers",
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (!res.ok || data.success === false) {
          setError(data.message);
        } else {
          setOfficeUsers(data);
        }
      } catch (error: any) {
        setError(error);
      }
    };

    getOrder();
    getAllClients();
    getAllOfficeWorkers();
    getAllOrderParts();
  }, [id, refreshData]);

  //SUMBIT FORM TO BACKEND
  const onsubmit = async (values: EditOrderInterface) => {
    // console.log(values,"ala");
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/updateOrder/${id}`,
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

      if (!res.ok || data.success === false) {
        setError(data.message);
        return;
      } else {
        setOrdersInitialValue(data.result);
        setSuccess(data.message);
        navigate("/orders");
        window.scrollTo(0, 0);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  //CHECK IN STOCK

  const checkInstock = async (values: any) => {
    // console.log(values,"checkinStock");

    const newPartsArray = values.orderParts;

    try {
      const res = await fetch(
        "http://localhost:3013/api/v1/order/checkInstock",
        {
          method: "POST",
          credentials: "include", // added this part
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ parts: newPartsArray }),
        }
      );

      const data = await res.json();
      // console.log(data);

      if (!res.ok || data.success === false) {
        setError(data.message);
      } else {
        const updatedPartsArray = data.map(
          (
            part: {
              code: string;
              count: number;
              stockQuantity: number;
              name: string;
              inStock: boolean;
            },
            index: number
          ) => {
            return {
              id: index,
              origCode: part.code,
              count: part.count,
              stockQuantity: part.stockQuantity,
              checkOnWarehouse: part.inStock,
              partName: part.name,
            };
          }
        );

        setOrdersInitialValue({
          ...orderInitialValue,
          orderParts: updatedPartsArray,
        });
      }
    } catch (error: any) {
      console.log(error);
      
    }
  };

  // console.log(stockInfos, "stockInfo");
  console.log(orderParts, "orderParts");

  const handleSubmitButton = async (id: any) => {
    const res = await fetch(
      `http://localhost:3013/api/v1/order/confirmOrder/${id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (!res.ok || data.success === false) {
      setError(data.message);
      return;
    } else {
      setRefreshData((prev) => !prev);
    }
  };







  return (
    <div>
      <div className="min-h-screen mt-[100px] mb-[100px] ml-[90px] ">
        <h2 className="font-semibold text-xl text-center  mb-[50px]">
          Sifariş
        </h2>
        <Formik
          enableReinitialize={true}
          initialValues={orderInitialValue}
          onSubmit={onsubmit}
        >
          {({ values, setFieldValue }) => {
            const deletePart = async (index: number) => {
              setFieldValue(
                "orderParts",
                values.orderParts.filter((_, i) => i !== index)
              );
            };

            let isForeignMarket = false;
            isForeignMarket =
              values.orderType === OrderType.Standart_Client;
            const isStock = values.orderType === OrderType.Stok;

            return (
              <Form>
                {!isStock && (
                  <>
                    <div className="flex  items-center ">
                      <label htmlFor="" className="text-sm  w-[200px]">
                        Proyekt
                      </label>
                      <Field as={Select} name="project" required sizing="sm">
                        <option value="project1">Project 1</option>
                      </Field>
                      <span className="text-red-700 ml-4 text-lg">*</span>
                    </div>
                  </>
                )}

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
                  <Field
                    as={Select}
                    name="client.id"
                    className="w-32"
                    sizing="sm"
                  >
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
                  <Field
                    as={Select}
                    name="manufacturer"
                    className="w-32"
                    sizing="sm"
                  >
                    <option value="Man">Man</option>
                    <option value="Bobcat">Bobcat</option>
                    <option value="Sumitomo">Sumitomo</option>
                  </Field>
                  <span className="text-red-700 ml-4 text-lg">*</span>
                </div>
                {!isStock && (
                  <>
                    <div className="flex  items-start mt-5">
                      <label htmlFor="" className="text-sm  w-[200px]">
                        Model
                      </label>
                      <Field
                        as={TextInput}
                        name="model"
                        className="w-64"
                        sizing="sm"
                      />
                      <span className="text-red-700 ml-4 text-lg">*</span>
                    </div>

                    <div className="flex  items-start mt-5">
                      <label htmlFor="" className="text-sm  w-[200px]">
                        Şassi nömrəsi
                      </label>
                      <Field
                        as={TextInput}
                        name="chassisNumber"
                        className="w-64"
                        sizing="sm"
                      />
                      <span className="text-red-700 ml-4 text-lg">*</span>
                    </div>

                    <div className="flex  items-start mt-5">
                      <label htmlFor="" className="text-sm  w-[200px]">
                        Mühərrik nömrəsi
                      </label>
                      <Field
                        as={TextInput}
                        name="engineNumber"
                        className="w-64"
                        sizing="sm"
                      />
                      <span className="text-red-700 ml-4 text-lg">*</span>
                    </div>

                    <div className="flex  items-center mt-5">
                      <label htmlFor="" className="text-sm  w-[200px]">
                        Buraxılış ili
                      </label>
                      <Field
                        as={Select}
                        name="produceYear"
                        className="w-32"
                        sizing="sm"
                      >
                        {produceDateData?.map((item: string, index: number) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </Field>
                      <span className="text-red-700 ml-4 text-lg">*</span>
                    </div>
                  </>
                )}

                {isForeignMarket && (
                  <div className="flex  items-start mt-5">
                    <label htmlFor="" className="text-sm  w-[200px]">
                      Km/saat
                    </label>
                    <Field
                      as={TextInput}
                      name="km"
                      className="w-64"
                      sizing="sm"
                    />
                    <span className="text-red-700 ml-4 text-lg">*</span>
                  </div>
                )}

                {!isStock && (
                  <div className="flex  items-start mt-5">
                    <label htmlFor="" className="text-sm  w-[200px]">
                      Maşın nömrəsi
                    </label>
                    <Field
                      as={TextInput}
                      name="vehicleNumber"
                      className="w-64"
                      sizing="sm"
                    />
                    <span className="text-red-700 ml-4 text-lg">*</span>
                  </div>
                )}

                <div className="flex  items-center mt-5">
                  <label htmlFor="" className="text-sm  w-[200px]">
                    Ödəniş üsulu
                  </label>
                  <Field
                    as={Select}
                    name="paymentType"
                    className="w-32"
                    sizing="sm"
                  >
                    <option value={PayType.Transfer}>Köçürmə</option>
                    <option value={PayType.Cash}>Nağd</option>
                  </Field>
                  <span className="text-red-700 ml-4 text-lg">*</span>
                </div>
                {(isForeignMarket || isStock) && (
                  <>
                    <div className="flex  items-center mt-5">
                      <label htmlFor="" className="text-sm  w-[200px]">
                        Çatdırılma
                      </label>
                      <Field as={Select} name="delivering" sizing="sm">
                        <option value={DeliverType.Fast}>
                          Təcili (7-15 gün)
                        </option>
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
                  </>
                )}
                {!isStock && (
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
                )}

                <div className="flex  items-center mt-5">
                  <label htmlFor="" className="text-sm  w-[200px]">
                    Şərh
                  </label>
                  <Field
                    as={Textarea}
                    rows={5}
                    name="comment"
                    className="w-96"
                    sizing="sm"
                  />
                </div>

                <div className="flex  items-center mt-5">
                  <label htmlFor="" className="text-sm  w-[200px]">
                    Yağ
                  </label>
                  <Field as={Checkbox} name="oil" sizing="sm" />
                </div>

                <div className="mt-10 ">


                  {
                      !orderInitialValue.isFinishCalculation?(<BeforeCalculationOrderPartsComponent deletePart={deletePart} orderInitialValue={orderInitialValue} checkInstock={checkInstock} values={values}/>):(<AfterCalculationOrderPartsComponent orderInitialValue={orderInitialValue}/>)
                  }
               
{/* 
               <FieldArray name="orderParts">
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
                              {
                                orderInitialValue.orderParts[0].sellPrice && (
                                  <th scope="col" className="px-6 py-3">
                                    Qiymət
                                  </th>
                                )
                              }
                              <th scope="col" className="px-6 py-3">
                                #
                              </th>
                            </tr>
                          </thead>
                          {values.orderParts?.map((_, index) => (
                            <OrderPartsComponent
                              name={`orderParts[${index}]`}
                              key={index}
                              index={index}
                              deletePart={() => deletePart(index)}
                              value={values.orderParts[index]}
                            />
                          ))}
                        </table>

                        <div className="flex gap-2 justify-end w-full">
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
                          <Button
                            color="blue"
                            size="xs"
                            className="mt-5"
                            type="button"
                            onClick={() => checkInstock(values)}
                          >
                            Anbarda yoxla
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                  */}
                </div>
                <div className="flex gap-2 mt-10">
                  
                  {values.isExcellFile && (
                    <>
                    <Button type="submit" size={"xs"} color={"blue"}>
                    Yadda Saxla
                  </Button>
                    <Button
                      size={"xs"}
                      color={"blue"}
                      onClick={() => handleSubmitButton(id)}
                    >
                      Təsdiqlə
                    </Button>
                    </>
                  )}
                </div>
                {values.isExcellFile && (
                  <div className="mt-5 flex flex-col gap-2 ">
                    <p className="text-xs">Faylın formatı .xlsx olamlıdır.</p>
                    <div className="flex gap-36 items-center">
                      <div className="flex gap-2 items-center">
                        <span>Faylı seçin</span>
                        <FiUpload
                          className="text-2xl cursor-pointer hover:text-blue-700"
                          onClick={handleFileUploadClick}
                        />
                        {fileName && (
                          <span className="text-sm text-blue-600">
                            {fileName} faylı seçildi
                          </span>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".xlsx"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                      <Button
                        color="blue"
                        size={"xs"}
                        onClick={() => uploadExcelFile(values.id)}
                      >
                        Yüklə
                      </Button>
                    </div>
                  </div>
                )}
                {fileError && (
                  <p className="text-xs text-red-700">{fileError}</p>
                )}
                <div className="mt-10 flex justify-between mr-[190px] ">
                  <div></div>

                  <div className="flex flex-col gap-5 border p-5 rounded-md">
                    <div className="w-[400px] flex flex-col gap-2">
                      <h2 className="text-sm">Geri qaytarma səbəbi</h2>
                      <Field as={Textarea} rows={5} name="message" />
                      <div className="flex gap-2">
                        <Field as={Select} className="flex-1" sizing="sm">
                          <option value="">Cavabdehliyi dəyişmək</option>
                          <option value="">Sifarişin yerləşdirilməsi</option>
                          <option value="">Təchizatçıya müraciət</option>
                          <option value="">Təchizatçıya cavab verin</option>
                          <option value="">Qiymətləndirmə</option>
                          <option value="">Mühasibatlığın təsdiqi</option>
                          <option value="">Sifarişi bağlamaq</option>
                          <option value="">Çatdırıldı</option>
                        </Field>
                        <Field as={Select} className="flex-1" sizing="sm">
                          {officeUsers.length > 0 &&
                            officeUsers?.map(
                              (officeUser: UserInterface, index: number) => (
                                <option value={officeUser.id} key={index}>
                                  {officeUser.firstName} {officeUser.lastName}
                                </option>
                              )
                            )}
                        </Field>
                      </div>
                    </div>

                    <div className="w-[400px] flex flex-col gap-2">
                      <h2 className="text-sm">Mesaj</h2>
                      <Field as={Textarea} rows={5} name="message" />
                      <Button color={"blue"} className="w-20" size={"xs"}>
                        Mesaj Yaz
                      </Button>
                    </div>
                  </div>
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
      </div>
      <ActionsOnOrder
        order={orderInitialValue}
        setRefreshData={setRefreshData}
        officeUsers={officeUsers}
      />
    </div>
  );
};

export default EditOrder;
