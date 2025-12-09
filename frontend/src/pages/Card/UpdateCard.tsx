import {
  Label,
  Select,
  TextInput,
  Button,
  Textarea,
  Spinner,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import { Formik, Form, Field, FieldArray } from "formik";
import NewCardProblems from "../../components/NewCardProblems";
import NewCardWorkers from "../../components/NewCardWorkers";
import NewCardAddParts from "../../components/NewCardAddParts";
import AddCharges from "../../components/AddCharges";
import {  NewCardInterface } from "../../types";
import { createCardApi, fetchCardDetails } from "../../api/allApi";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store";
import { fetchUsers } from "../../redux-toolkit/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchClients } from "../../redux-toolkit/features/client/clientSlice";

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
  produceDate: "2024",
  km: "",
  qostNumber: "",
  paymentType: "transfer",
  nds: false,
  repairAgain: false,
  servisInfo: false,
  comments: "",
  recommendation: "",
  problems: [{ description: "", serviceWorkers: [""] }],
  jobs: [
    {
      code: "",
      name: "",
      av: 0,
      price: 0,
      discount: 0,
      oil: "",
      jobWorkers: [{ workerAv: "", workerId: 0 }],
    },
  ],
  expences: [{ description: "", price: "" }],
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

const UpdateCard = () => {
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(true);
//   const [clients, setClients] = useState<ClientInterface[]>([]);
//   const [workers, setWorkers] = useState<any[]>([]);
  const [openGedis, setOpenGedis] = useState(false);
  const [openBobcatWarranty, setOpenBobcatWarranty] = useState(false);
  const [openAmmannWarranty, setOpenAmmannWarranty] = useState(false);
  const [jobPrices, setJobPrices] = useState<number[]>([0]);
  const [expencePrices, setExpencePrices] = useState<number>(0);
  const [cardData, setCardData] = useState<NewCardInterface>({});


  const { users } = useSelector((state: RootState) => state.user);
  const {clients} = useSelector((state: RootState) => state.client);
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
  
    const workers = users.filter((p:any) => p.isWorker === true|| p.userRole === "ServiceUser");
  
    useEffect(() => {
      dispatch(fetchUsers());
      dispatch(fetchClients());
    }, [dispatch]);

  console.log(openAmmannWarranty, openBobcatWarranty);

useEffect(() => {
  const loadData = async () => {
    try {
      const data = await fetchCardDetails(id);
      console.log({data});
      
setCardData({
  ...newCardInitialValues,
  ...data,
});    } catch (err) {
      console.log("Card load error:", err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [id]);

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
  const width = window.innerWidth * 0.9;  // ekranın 90%-i
  const height = window.innerHeight * 0.9; // 90% hündürlük
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  const url = `${window.location.origin}/warehouseSelected`;

  window.open(
    url,
    "warehousePopup",
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );
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
          Kart Məlumatları
        </h2>
        {/* <p className="text-gray-500 text-sm">
          Texnikanın məlumatlarını və iş detallarını daxil edin.
        </p> */}
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md text-center">
          {error}
        </div>
      )}

      <Formik
        initialValues={cardData || newCardInitialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          const totalExpencesPrice = values?.expences?.reduce(
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
                    >
                      <option value="">Müştərini seç</option>
                      {clients&&clients.map((item:any) => (
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {[
                      "Hara",
                      "Maşınla",
                      "Məsafə (Km)",
                      "İşçilər getdi (sürücü ilə birlikdə)",
                      "İş saatları (səyahət daxil olmaqla)",
                    ].map((label, i) => (
                      <div key={i}>
                        <Label value={label} />
                        <TextInput className="mt-1" />
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>

              {/* Machine Info */}
              <SectionCard title="Texniki Məlumat">
                <div className="p-5 border rounded-xl bg-white shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Texnikanın növü */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Texnikanın növü
                      </label>
                      <Field as={Select} name="type" className="w-full">
                        {types.map((t, i) => (
                          <option key={i}>{t}</option>
                        ))}
                      </Field>
                    </div>

                    {/* İstehsalçı */}
                    <div>
                      <label className="block mb-1 font-medium">
                        İstehsalçı
                      </label>
                      <Field as={Select} name="manufactured" className="w-full">
                        <option value="man">MAN</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="daf">DAF</option>
                        <option value="ford">Ford</option>
                        <option value="volvo">Volvo</option>
                      </Field>
                    </div>

                    {/* Model */}
                    <div>
                      <label className="block mb-1 font-medium">Model</label>
                      <Field as={TextInput} name="model" placeholder="Model" />
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
                      />
                    </div>

                    {/* Buraxılış ili */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Buraxılış ili
                      </label>
                      <Field as={Select} name="produceDate">
                        {[2024, 2023, 2022, 2021, 2020, 2019].map((y) => (
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
                      />
                    </div>

                    {/* Payment */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Ödəniş tipi
                      </label>
                      <Field as={Select} name="paymentType">
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
                      <Field type="checkbox" name="nds" /> ƏDV (18%)
                    </label>

                    <label className="flex items-center gap-2">
                      <Field type="checkbox" name="repairAgain" /> Təkrar təmir
                    </label>

                    <label className="flex items-center gap-2">
                      <Field type="checkbox" name="servisInfo" /> Servis
                      məlumatı
                    </label>
                  </div>
                </div>
              </SectionCard>

              {/* Problems */}
              <FieldArray name="problems">
                {({ push, remove }) => (
                  <SectionCard title="Problemlər">
                    {values.problems.map((_, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-md bg-gray-50"
                      >
                        <NewCardProblems
                          workers={workers}
                          name={`problems[${index}]`}
                          values={values.problems[index]}
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
                        onClick={() => remove(values.problems.length - 1)}
                        color="gray"
                        size="xs"
                        type="button"
                        disabled={values.problems.length <= 1}
                      >
                        Azalt -
                      </Button>
                    </div>
                  </SectionCard>
                )}
              </FieldArray>

              {/* Jobs */}
              <FieldArray name="jobs">
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
                        {values.jobs.map((_, index) => (
                          <NewCardWorkers
                            key={index}
                            workers={workers}
                            name={`jobs[${index}]`}
                            values={values.jobs[index]}
                            jobWorkerPrice={(price) =>
                              handlePriceUpdate(index, price)
                            }
                          />
                        ))}
                      </table>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm font-semibold">
                        Cəmi:
                        <span className="text-blue-700">
                          {displayPrice(totalPriceWorker)} AZN
                        </span>
                      </div>
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
                              jobWorkers: [{ workerAv: "", workerId: "" }],
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
                          disabled={values.jobs.length <= 1}
                          onClick={() => {
                            const index = values.jobs.length - 1;
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
                <NewCardAddParts />
                <div className="flex gap-3 font-semibold mt-5 items-center justify-center">
                  <span>Cəmi:</span>
                  <span>0 AZN</span>
                </div>
                <div className="flex flex-col gap-1 mt-5 text-blue-700  w-[100px]">
                  <div className="hover:underline cursor-pointer" onClick={openWarehousePopup}>
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
                <Button color="gray" size="xs">
                  Kartı Bağla
                </Button>
                <Button color="purple" size="xs">
                  <FiPrinter className="mr-2" /> Çap et
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateCard;
