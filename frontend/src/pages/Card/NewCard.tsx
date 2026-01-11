import {
  Label,
  Select,
  TextInput,
  Button,
  Textarea,
  Spinner,
  Table,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Formik, Form, Field, FieldArray } from "formik";
import NewCardProblems from "../../components/NewCardProblems";
import NewCardWorkers from "../../components/NewCardWorkers";
// import NewCardAddParts from "../../components/NewCardAddParts";
import AddCharges from "../../components/AddCharges";
import { ClientCar, NewCardInterface } from "../../types";
import { createCardApi, fetchClientCars } from "../../api/allApi";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store";
import { fetchUsers } from "../../redux-toolkit/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchClients } from "../../redux-toolkit/features/client/clientSlice";
// import { updateJobPricesByClientType } from "../../utilis/utilis";

const types = [
  "Tiqac",
  "Yarı pricep",
  "Pricep",
  "Avtobus",
  "Neoplan",
  "Digər Texnika",
];

const newCardInitialValues: NewCardInterface = {
  clientId: 0,
  type: "tiqac",
  manufactured: "man",
  model: "",
  sassi: "",
  carNumber: "",
  produceDate: "2025",
  km: "",
  qostNumber: "",
  paymentType: "transfer",
  nds: false,
  repairAgain: false,
  servisInfo: false,
  comments: "",
  recommendation: "",
  cardProblems: [{ description: "", serviceWorkers: [""] }],
  cardJobs: [
    {
      code: "",
      name: "",
      av: 0,
      price: 0,
      discount: 0,
      oil: "",
      workers: [{ workerAv: "", workerId: 0 }],
    },
  ],
  expences: [{ description: "", price: "" }],
  cardParts: [
    {
      code: "",
      partName: "",
      count: 0,
      soldPrice: 0,
      discount: 0,
      totalPrice: 0,
    },
  ],
};

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-5 transition-all hover:shadow-lg">
    <h3 className="text-xl font-semibold text-blue-700 border-b pb-2">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const NewCard = () => {
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);
  const [openGedis, setOpenGedis] = useState(false);
  const [openBobcatWarranty, setOpenBobcatWarranty] = useState(false);
  const [openAmmannWarranty, setOpenAmmannWarranty] = useState(false);
  const [jobPrices, setJobPrices] = useState<number[]>([0]);
  const [expencePrices, setExpencePrices] = useState<number>(0);
  const [clientCars, setClientCars] = useState<ClientCar[] | null>(null);  
   const { users } = useSelector((state: RootState) => state.user);
  const { clients } = useSelector((state: RootState) => state.client);
  const dispatch = useDispatch<AppDispatch>();

  const workers = users.filter(
    (p: any) => p.isWorker === true || p.userRole === "ServiceUser"
  );

  useEffect(() => {
    const load = async () => {
      await dispatch(fetchUsers());
      await dispatch(fetchClients());
      setLoading(false); // <<< BURADA loading dayandırılır
    };

    load();
  }, [dispatch]);

  console.log(openBobcatWarranty, openAmmannWarranty, clientCars);
  // console.log({clientType});

  const navigate = useNavigate();
  // İşçilik qiymətini yeniləyən funksiya
  const handlePriceUpdate = (index: number, price: number) => {
    setJobPrices((prev) => {
      const updated = [...prev];
      updated[index] = price;
      return updated;
    });
  };

  const openWarehousePopup = () => {
    window.scrollTo(0, 0);
    alert("Birinci kart yarat!!");
  };

  const displayPrice = (value: number) => {
    return Number.isInteger(value) ? value : Number(value.toFixed(2));
  };

  // Yeni işçilik əlavə ediləndə sıfır qiymət daxil edilir
  const handleAddJob = () => {
    setJobPrices((prev) => [...prev, 0]);
  };

  // İşçilik silinəndə qiyməti də silinir
  const handleRemoveJob = (index: number) => {
    setJobPrices((prev) => prev.filter((_, i) => i !== index));
  };

  const totalPriceWorker = jobPrices.reduce((a, b) => a + b, 0);
  const totalExpencesPrice = expencePrices;
  const totalPriceWithoutNds = totalPriceWorker + totalExpencesPrice;
  const totalPriceNds = totalPriceWithoutNds * 0.18;
  const totalPriceWithNds = totalPriceWithoutNds + totalPriceNds;

  const onSubmit = async (values: NewCardInterface, totalPriceWorker: any) => {
    try {
      setLoading(true);
      setError(false);
      const response = await createCardApi(values, totalPriceWorker);
      if (response.success === false) {
        setError(response.message);
      } else {
        navigate("/statistics");
        window.scrollTo(0, 0);
      }
      console.log("Card created:", response);
    } catch (err: any) {
      setError(err.message || "Kart yaradılarkən xəta baş verdi");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-3 md:px-8 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
          Yeni Kart Yarat
        </h2>
        <p className="text-gray-500 text-sm">
          Texnikanın məlumatlarını və iş detallarını daxil edin.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md text-center">
          {error}
        </div>
      )}

      <Formik initialValues={newCardInitialValues} onSubmit={onSubmit}>
        {({ values, setFieldValue }) => {
          const totalExpencesPrice = values.expences.reduce(
            (sum, item) => sum + Number(item.price || 0),
            0
          );
          setExpencePrices(totalExpencesPrice);
          return (
            <Form className="space-y-8">
              {/* Client Section */}
              <SectionCard title="Müştəri Məlumatları">
                <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4">
                  <div>
                    <Label htmlFor="clientId" value="Müştəri adı" />
                    <Field
                      as={Select}
                      id="clientId"
                      name="clientId"
                      className="w-full mt-1"
                      sizing="sm"
                      onChange={async (e: any) => {
                        const clientId = e.target.value;
                        setFieldValue("clientId", clientId);

                        // 1. Müştərinin maşınlarını gətir
                        const clientCars:any = await fetchClientCars(clientId);
                        setClientCars(clientCars); // useState ilə saxlayırıq

                        // 2. Əvvəlki maşın seçimi sıfırlansın
                        setFieldValue("sassi", "");
                      }}
                    >
                      <option value="">Müştərini seç</option>
                      {clients.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.companyName}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <Link
                    to="/newClient"
                    className="text-blue-600 text-sm flex items-center gap-2 justify-end md:justify-start"
                  >
                    <FaPlus /> Yeni müştəri yarat
                  </Link>
                </div>
              </SectionCard>

              {/* Warranty / Trip Section */}
              <SectionCard title="Gediş və Zəmanət">
                <div className="flex flex-wrap gap-5 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => setOpenGedis(e.target.checked)}
                    />
                    Gediş
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => setOpenBobcatWarranty(e.target.checked)}
                    />
                    Bobcat zəmanət
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => setOpenAmmannWarranty(e.target.checked)}
                    />
                    AMMANN zəmanət
                  </label>
                </div>

                {openGedis && (
                  <div className="flex flex-col gap-5 mt-4">
                   
                   <div className="flex gap-2 items-center">
                    <label htmlFor="">Hara</label>
                    <TextInput sizing="sm"/>
                   </div>

                     <div className="flex gap-2 items-center">
                    <label htmlFor="">Maşın</label>
                    <Select sizing="sm">
                      <option value="mitsubishi">Mitsubishi L200</option>
                      <option value="man">Man TGL 12.240</option>
                    </Select>
                   </div>

                     <div className="flex gap-2 items-center">
                    <label htmlFor="">Məsafə</label>
                    <TextInput sizing="sm"/>
                    <span>km</span>
                   </div>

                    <div className="flex gap-2 items-center">
                    <label htmlFor="">İşçi sayı</label>
                    <TextInput sizing="sm"/>
                    <span>(sürücü ilə birlikdə)</span>
                   </div>

                   <div className="flex gap-2 items-center">
                    <label htmlFor="">İş saatları</label>
                    <TextInput sizing="sm"/>
                    <span>(səyahət daxil olmaqla)</span>
                   </div>

                  </div>
                )}
              </SectionCard>

              {/* Machine Info */}
              <SectionCard title="Texniki Məlumat">
                <div className="p-5 border rounded-xl bg-white shadow-sm">
                  <div className="flex flex-col gap-3">
                    {/* Texnikanın növü */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Texnikanın növü
                      </label>
                      <Field
                        as={Select}
                        name="type"
                        sizing="sm"
                        className="w-1/3"
                      >
                        {types.map((t, i) => (
                          <option key={i}>{t}</option>
                        ))}
                      </Field>
                    </div>

                    {/* İstehsalçı */}
                    <div className="flex justify-between  items-center">
                      <div className="w-1/3">
                        <label className="block mb-1 font-medium">
                          İstehsalçı
                        </label>
                        <Field as={Select} name="manufactured" sizing="sm">
                          <option value="man">MAN</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="daf">DAF</option>
                          <option value="ford">Ford</option>
                          <option value="volvo">Volvo</option>
                        </Field>
                      </div>
                      <div className="mt-7 w-1/6">
                        <Field
                          as={Select}
                          name="sassi"
                          sizing="sm"
                          onChange={(e: any) => {
                            const selectedSassi = e.target.value;
                            setFieldValue("sassi", selectedSassi);

                            // 1. seçilmiş maşın datalarını tap
                            const carData = clientCars?.find(
                              (c) => c.sassi === selectedSassi
                            );
                            if (carData) {
                              // 2. Formik inputlarını avtomatik doldur
                              setFieldValue("model", carData.model??"");
                              setFieldValue("type", carData.type);
                              setFieldValue(
                                "manufactured",
                                carData.manufactured
                              );
                              setFieldValue("carNumber", carData.carNumber);
                              setFieldValue("produceDate", carData.produceDate);
                              setFieldValue("qostNumber", carData.qostNumber);
                              
                            }
                          }}
                        >
                          <option value=""></option>
                          {clientCars?.map((car,index) => (
                            
                            <option key={index} value={car.sassi}>
                              {car.sassi}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    {/* Model */}
                    <div>
                      <label className="block mb-1 font-medium">Model</label>
                      <Field
                        as={TextInput}
                        name="model"
                        placeholder="Model"
                        sizing="sm"
                        className="w-1/3"
                      />
                    </div>

                    {/* Şassi */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Şassi nömrəsi
                      </label>
                      <Field
                        as={TextInput}
                        name="sassi"
                        placeholder="Şassi nömrəsi"
                        sizing="sm"
                        className="w-1/3"
                      />
                    </div>

                    {/* Maşın nömrəsi */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Maşın nömrəsi
                      </label>
                      <Field
                        as={TextInput}
                        name="carNumber"
                        placeholder="Maşın nömrəsi"
                        sizing="sm"
                        className="w-1/3"
                      />
                    </div>

                    {/* Buraxılış ili */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Buraxılış ili
                      </label>
                      <Field
                        as={Select}
                        name="produceDate"
                        sizing="sm"
                        className="w-1/3"
                      >
                        {[2025, 2024, 2023, 2022, 2021, 2020, 2019].map((y) => (
                          <option key={y}>{y}</option>
                        ))}
                      </Field>
                    </div>

                    {/* KM */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Km/Motosaat
                      </label>
                      <Field
                        as={TextInput}
                        name="km"
                        placeholder="Km/Motosaat"
                        sizing="sm"
                        className="w-1/3"
                      />
                    </div>

                    {/* Dövlət nömrəsi */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Dövlət nömrəsi
                      </label>
                      <Field
                        as={TextInput}
                        name="qostNumber"
                        placeholder="Dövlət nömrəsi"
                        sizing="sm"
                         className="w-1/3"
                      />
                    </div>

                    {/* Payment */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Ödəniş tipi
                      </label>
                      <Field as={Select} name="paymentType" sizing="sm"  className="w-1/3">
                        <option value="transfer">Köçürülmə</option>
                        <option value="cash">Nağd</option>
                        <option value="warranty">Qarantiya</option>
                        <option value="internal">Daxili iş</option>
                        <option value="pos">POS</option>
                      </Field>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="flex flex-wrap gap-6 mt-6">
                    <label className="flex items-center gap-2">
                      <Field type="checkbox" name="nds" sizing="sm" /> ƏDV (18%)
                    </label>

                    <label className="flex items-center gap-2">
                      <Field type="checkbox" name="repairAgain" sizing="sm" />{" "}
                      Təkrar təmir
                    </label>

                    <label className="flex items-center gap-2">
                      <Field type="checkbox" name="servisInfo" sizing="sm" />{" "}
                      Servis məlumatı
                    </label>
                  </div>
                </div>
              </SectionCard>

              {/* Problems */}
              <FieldArray name="cardProblems">
                {({ push, remove }) => (
                  <SectionCard title="Problemlər">
                    {values.cardProblems.map((_, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-md bg-gray-50"
                      >
                        <NewCardProblems
                          serviceWorkers={workers}
                          name={`cardProblems[${index}]`}
                          values={values.cardProblems[index]}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    ))}
                    <div className="flex justify-end gap-3">
                      <Button
                        onClick={() =>
                          push({ description: "", serviceWorkers: [""] })
                        }
                        color="blue"
                        size="xs"
                        type="button"
                      >
                        Əlavə et +
                      </Button>
                      <Button
                        onClick={() => remove(values.cardProblems.length - 1)}
                        color="gray"
                        size="xs"
                        type="button"
                        disabled={values.cardProblems.length <= 1}
                      >
                        Azalt -
                      </Button>
                    </div>
                  </SectionCard>
                )}
              </FieldArray>

              {/* Jobs */}
              <FieldArray name="cardJobs">
                {({ push, remove }) => (
                  <SectionCard title="İşçilik">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-gray-600">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-center p-2">Kod</th>
                            <th className="text-center p-2">Adı</th>
                            <th className="text-center p-2">AV</th>
                            <th className="text-center p-2">Qiymət</th>
                            <th className="text-center p-2">Endirim(%)</th>
                            <th className="text-center p-2">Yağ</th>
                            <th className="text-center p-2">İşçilər</th>
                          </tr>
                        </thead>
                        {values.cardJobs.map((_, index) => (
                          <NewCardWorkers
                            key={index}
                            workers={workers}
                            name={`cardJobs[${index}]`}
                            values={values.cardJobs[index]}
                            jobWorkerPrice={(price) =>
                              handlePriceUpdate(index, price)
                            }
                            paymentType={values.paymentType}
                          />
                        ))}
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>

                            <td>
                              <div className=" flex text-sm font-semibold">
                                Cəmi:
                                <span className="text-blue-700 flex justify-center">
                                  {displayPrice(totalPriceWorker)} AZN
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* <div className="text-sm font-semibold">
                        Cəmi:
                        <span className="text-blue-700">
                          {displayPrice(totalPriceWorker)} AZN
                        </span>
                      </div> */}
                      <div className="flex gap-2">
                        <Button
                          color="blue"
                          size="xs"
                          type="button"
                          onClick={() => {
                            push({
                              code: "",
                              name: "",
                              av: 0,
                              price: 0,
                              discount: 0,
                              oil: "",
                              workers: [{ workerAv: "", workerId: "" }],
                            });

                            // Yeni sıfır qiymət əlavə olunur
                            handleAddJob();
                          }}
                        >
                          Əlavə et +
                        </Button>

                        <Button
                          color="gray"
                          size="xs"
                          type="button"
                          disabled={values.cardJobs.length <= 1}
                          onClick={() => {
                            const index = values.cardJobs.length - 1;
                            remove(index);
                            handleRemoveJob(index); // TOTAL-dan qiyməti silir
                          }}
                        >
                          Azalt -
                        </Button>
                      </div>
                    </div>
                  </SectionCard>
                )}
              </FieldArray>

              {/* Expenses */}
              <FieldArray name="expences">
                {({ push, remove }) => (
                  <SectionCard title="Xərclər">
                    {values.expences.map((item, index) => (
                      <AddCharges
                        key={index}
                        name={`expences[${index}]`}
                        values={item}
                        expenceUpdatePrice={(price) =>
                          setFieldValue(`expences.${index}.price`, price)
                        }
                      />
                    ))}

                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-sm">
                        Cəmi: {displayPrice(totalExpencesPrice)} AZN
                      </div>

                      <div className="flex gap-2">
                        {/* ƏLAVƏ ET */}
                        <Button
                          color="blue"
                          size="xs"
                          onClick={() => push({ description: "", price: 0 })}
                        >
                          Əlavə et +
                        </Button>

                        {/* AZALT → sonuncu expense-i silir */}
                        <Button
                          color="gray"
                          size="xs"
                          disabled={values.expences.length <= 1}
                          onClick={() => remove(values.expences.length - 1)}
                        >
                          Azalt -
                        </Button>
                      </div>
                    </div>
                  </SectionCard>
                )}
              </FieldArray>

              {/* Parts */}
              <SectionCard title="Ehtiyyat hissələri">
                {/* <NewCardAddParts /> */}

                <Table className="min-w-[700px] md:min-w-full">
                  <Table.Head className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                    <Table.HeadCell className="px-2 py-1">#</Table.HeadCell>
                    <Table.HeadCell>E/h Kod</Table.HeadCell>
                    <Table.HeadCell>Ehtiyyat hissə</Table.HeadCell>
                    <Table.HeadCell>Say</Table.HeadCell>
                    <Table.HeadCell>Qiymət</Table.HeadCell>
                    <Table.HeadCell>Endirim %</Table.HeadCell>
                    <Table.HeadCell>Toplam</Table.HeadCell>
                    <Table.HeadCell>Tarix</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                  </Table.Head>
                </Table>
                <div className="flex gap-3 font-semibold mt-5 items-center justify-center">
                  <span>Cəmi:</span>
                  <span>0 AZN</span>
                </div>
                <div className="flex flex-col gap-1 mt-5 text-blue-700  w-[100px]">
                  <div className="hover:underline" onClick={openWarehousePopup}>
                    E/h əlavə et (barkod ilə)
                  </div>
                  <div
                    className="hover:underline cursor-pointer"
                    onClick={openWarehousePopup}
                    color={"blue"}
                  >
                    E/h əlavə et{" "}
                  </div>
                </div>
              </SectionCard>

              {/* Comments */}
              <SectionCard title="İş haqqında şərhlər">
                <Field
                  as={Textarea}
                  rows={4}
                  name="comments"
                  placeholder="Şərh yazın..."
                />
              </SectionCard>

              {/* Recommendation */}
              <SectionCard title="Məsləhətlər">
                <Field
                  as={Textarea}
                  rows={4}
                  name="recommendation"
                  placeholder="Məsləhət yazın..."
                />
              </SectionCard>

              {/* Totals */}
              <div className="bg-gray-100 rounded-md p-4 text-right font-medium space-y-1">
                <div>Cəm: {displayPrice(totalPriceWithoutNds)} AZN</div>
                {values.nds && (
                  <>
                    <div>ƏDV (18%): {displayPrice(totalPriceNds)} AZN</div>
                    <div className="text-blue-700 font-bold text-lg">
                      Cəmi ƏDV ilə: {displayPrice(totalPriceWithNds)} AZN
                    </div>
                  </>
                )}
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 bg-white border-t shadow-inner flex flex-wrap justify-end gap-3 p-4">
                <Button type="submit" color="blue" size="xs">
                  Yadda Saxla
                </Button>
                <Button color="purple" size="xs">
                  Kartı Bağla
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewCard;
