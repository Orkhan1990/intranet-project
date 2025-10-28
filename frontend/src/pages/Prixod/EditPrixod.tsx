import { Field, FieldArray, Form, Formik } from "formik";
import { OrderInterface, SupplierInterface } from "../../types";
import { Liquidity, Market, PayType } from "../../enums/projectEnums";
import { Button, Select, Textarea, TextInput } from "flowbite-react";
import NewPartsComponent from "../../components/NewPartsComponent";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../redux-toolkit/features/brand/brandSlice";
import { fetchSuppliers } from "../../redux-toolkit/features/supplier/supplierSlice";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store";
import { fetchOrders } from "../../redux-toolkit/features/order/orderSlice";
import { fetchPrixodById } from "../../redux-toolkit/features/prixod/prixodSlice";
import {
  confirmLastPrixodApi,
  confirmPrixodApi,
  rejectPrixodApi,
  updatePrixod,
  writeMessageApi,
} from "../../api/allApi";

const EditPrixod = () => {
  // const[brands,setBrands]=useState<BrandInterface[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [addingValue, setAddingValue] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const [refreshPage, setRefreshPage] = useState<boolean>(false);

  const { id } = useParams();
  console.log({ message });

  const dispatch = useDispatch<AppDispatch>();
  const { brands } = useSelector((state: RootState) => state.brand);
  const { suppliers } = useSelector((state: RootState) => state.supplier);
  const { orders } = useSelector((state: RootState) => state.order);
  const { prixod } = useSelector((state: RootState) => state.prixod);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchSuppliers());
    dispatch(fetchOrders());
    if (id) dispatch(fetchPrixodById(+id));
    if (refreshPage){
      setRefreshPage(false)
    };
  }, [dispatch, id,refreshPage]);

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Xəta baş verdi: {error}</p>
    );
  if (!prixod)
    return <p className="text-center mt-10 text-gray-500">Prixod tapılmadı.</p>;

  const prixodInitialValues = {
    order: prixod.order?.id || 0,
    supplier: prixod.supplier?.id || 0,
    invoice: prixod.invoice || "",
    market: prixod.market || Market.Local,
    paymentType: prixod.paymentType || PayType.Cash,
    comment: prixod.comment || "",
    message: "",
    prixodHist: [],
    parts: prixod.spareParts?.length
      ? prixod.spareParts.map((part) => ({
          kod: part.code || "",
          origKod: part.origCode || "",
          nameParts: part.name || "",
          brand: Number(part.brand?.id || 0),
          liquidity: part.liquidity || Liquidity.Fast,
          count: part.count || 0,
          price: part.price || 0,
          salesPrice: part.sellPrice || 0,
          barcode: part.barcode || "",
        }))
      : [
          {
            kod: "",
            origKod: "",
            nameParts: "",
            brand: Number(brands[0]?.id || 0),
            liquidity: Liquidity.Fast,
            count: 0,
            price: 0,
            salesPrice: 0,
            barcode: "",
          },
        ],
  };

  console.log({ prixodInitialValues });

  const handleAddingValue = (e: any) => {
    setAddingValue(Number(e.target.value));
  };

  const writeMessage = async (value: string, id: any) => {
    if (!value.trim()) {
      setError("Mesaj boş ola bilməz!");
      return;
    }

    try {
      const res = await writeMessageApi(id, value); // call API
      console.log(res);
      setSuccess("Mesaj uğurla yazıldı");
      setError("");
      setMessage(""); // clear textarea
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Xəta baş verdi");
      setSuccess("");
    }
  };

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

  const confirmPrixodFunction = async (id: any) => {
    const res = confirmPrixodApi(+id);
    res
      .then((data) => {
        console.log(data);
        setSuccess("Prixod uğurla təsdiqləndi");
        setError("");
        navigate("/prixodList");
        window.scrollTo(0, 0);
        setRefreshPage(true);
      })
      .catch((err) => {
        setError(err.message);
        setSuccess("");
      });
  };

  const onsubmit = async (values: any) => {
    console.log({ values });

    const res = updatePrixod(+id!, values);
    res
      .then((data) => {
        console.log(data);
        setSuccess("Prixod uğurla yeniləndi");
        setError("");
        navigate("/prixodList");
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setError(err.message);
        setSuccess("");
      });
  };

  // const renderStatus = (status: string) => {
  //   switch (status) {
  //     case "Confirmed":
  //       return <p className="text-green-600">Prixod təsdiqlənib.</p>;
  //     case "Pending":
  //       return <p className="text-yellow-600">Prixod gözləmədədir.</p>;
  //     case "Cancelled":
  //       return <p className="text-red-600">Prixod ləğv edilib.</p>;
  //     default:
  //       return <p className="text-gray-600">Naməlum status.</p>;
  //   }
  // };

  const confirmLastPrixod = async (id: any,message:string) => {
    const res = confirmLastPrixodApi(+id,message);
    res
      .then((data) => {
        console.log(data);
        setSuccess("Prixod uğurla təsdiqləndi");  
        setError("");
        navigate("/prixodList");
        setRefreshPage(true);
      })
      .catch((err) => {
        setError(err.message);
        setSuccess("");
      });
    }

    const rejectPrixod = async (id: any,message:string) => {
      const res = rejectPrixodApi(+id,message);
      res
        .then((data) => {
          console.log(data);
          setSuccess("Prixod uğurla rədd edildi");  
          setError("");
          setRefreshPage(true);
        })
        .catch((err) => {
          setError(err.message);
          setSuccess("");
        });
      }
  return (
    <div className="min-h-screen mt-[100px] mb-[100px]">
      <h2 className="font-semibold text-xl text-center  mb-[50px]">
        Prixod yoxlanışı və təsdiqi
      </h2>

      <Formik
        initialValues={prixodInitialValues}
        onSubmit={onsubmit}
        enableReinitialize
      >
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
                <Field as={Select} name="order" className="w-20" sizing="sm">
                  {orders.length > 0 &&
                    orders.map((item: OrderInterface, index: number) => (
                      <option value={item.id} key={index}>
                        {item.id}
                      </option>
                    ))}
                </Field>
              </div>

              <div className="flex  items-center mt-5 ">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Təchizatçı
                </label>
                <Field as={Select} name="supplier" className="w-96" sizing="sm">
                  {suppliers.length > 0 &&
                    suppliers.map((item: SupplierInterface, index: number) => (
                      <option value={item.id} key={index}>
                        {item.supplier}
                      </option>
                    ))}
                </Field>
              </div>

              <div className="flex  items-center mt-5 ">
                <label htmlFor="" className="text-sm  w-[200px]">
                  Hesab
                </label>
                <Field as={TextInput} name="invoice" sizing="sm" />
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
                <Field
                  as={Select}
                  name="paymentType"
                  className="w-32"
                  sizing="sm"
                >
                  <option value={PayType.Cash}>Nağd</option>
                  <option value={PayType.Transfer}>Köçürmə</option>
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
                        <TextInput
                          sizing={"sm"}
                          className="w-20"
                          onChange={handleAddingValue}
                        />

                        <Button
                          color="blue"
                          size="xs"
                          onClick={() => {
                            const countToAdd =
                              addingValue > 0 ? addingValue : 1;
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
                    <Textarea
                      rows={5}
                      onChange={(e: any) => setMessage(e.target.value)}
                      value={message}
                    />
                    <Button
                      color={"blue"}
                      className="w-20"
                      size={"xs"}
                      onClick={() => writeMessage(message, id)}
                    >
                      Mesaj Yaz
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-20">
                <Button size={"xs"} color={"blue"} type="submit">
                  Yadda Saxla
                </Button>
                <Button
                  size={"xs"}
                  color={"blue"}
                  onClick={() => confirmPrixodFunction(id)}
                >
                  Təsdiqlə
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      {/* {!error && success && (
        <p className="mt-10 ml-10 text-sm text-green-700">{success}</p>
      )} */}
      {error && !success && (
        <p className="mt-10 ml-10 text-sm text-red-700">{error}</p>
      )}

      <div className="w-full bg-orange-200 h-[1px] mt-20"></div>

      {prixod && (
        <div className="mt-10  ">
          <div className="">
            <h2 className="text-lg font-semibold ml-16">
              Prixod üzrə hərəkətlər
            </h2>
            <table className="mt-5 w-full h-20">
              <thead></thead>
              <tbody>
                <tr className="flex gap-52 bg-gray-100 ">
                  <td className="pl-16">Prixodun yaradılması</td>
                  <td className="">
                    {new Date(prixod.createdAt).toLocaleString("az-AZ", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="pl-16"></td>
                  <td className="pl-16"></td>
                  <td className="pl-16"></td>
                </tr>
                {prixod.confirm && (
                  <tr className="w-full flex gap-20 mt-5">
                    <td className="pl-16">
                      Ehtiyat hissələri və Zəmanət
                      <br /> Departament rəhbərinin yoxlanışı
                    </td>
                    <td className="">
                      <div className="flex gap-5">
                        <div className="flex flex-col gap-2">
                          <h1 className="text-sm">Mesaj</h1>
                          <Textarea  rows={6} onChange={(e:any)=>setMessage(e.target.value)}/>
                          <Button color={"blue"} size={"xs"} className="w-16" onClick={()=>confirmLastPrixod(id,message)}>Təsdiqlə</Button>
                        </div>

                         <div className="flex flex-col gap-2">
                          <h1 className="text-sm">İmtina səbəbi</h1>
                          <Textarea rows={6} onChange={(e:any)=>setMessage(e.target.value)}/>
                          <Button color={"blue"} size={"xs"} className="w-16" onClick={()=>rejectPrixod(id,message)}>İmtina</Button>
                        </div>
                      </div>
                    </td>
                    <td className="pl-16"></td>
                    <td className="pl-16"></td>
                    <td className="pl-16"></td>
                  </tr>
                )}

                {
                  prixod.accept && (
                  <tr className="w-full flex gap-36 mt-5 bg-gray-100">
                    <td className="pl-16">
                       Ehtiyat hissələri və Zəmanət
                      <br /> Departament rəhbərinin təsdiqi
                    </td>
                    <td className="">
                      {new Date(prixod.acceptDate).toLocaleString("az-AZ", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="pl-16"></td>
                    <td className="pl-16"></td>
                    <td className="pl-16"></td>
                  </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-20 bg-[#ccf] h-16 pt-2">
        <div className="bg-orange-300 h-1 "></div>
        <div className="bg-orange-200">
          <div className=" ml-20">
            <h2 className="text-xl font-semibold">Tarix</h2>
            <table>
              <thead>
                {/* <tr>
              <th className="px-6 py-3 text-left"></th>
              <th className="px-6 py-3 text-left"></th>
              <th className="px-6 py-3 text-left"></th>
            </tr> */}
              </thead>
              <tbody>
                <tr className="">
                  {/* <td className="">Prixodun Tarixi</td>
                  <td className="px-6 py-3">Salam</td>
                  <td className="px-6 py-3">Salam</td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPrixod;
