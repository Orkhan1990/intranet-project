import {
  Label,
  Select,
  TextInput,
  Button,
  Textarea,
  Spinner,
} from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import { Formik, Form, Field, FieldArray } from "formik";
import NewCardProblems from "../../components/NewCardProblems";
import NewCardWorkers from "../../components/NewCardWorkers";
import NewCardAddParts from "../../components/NewCardAddParts";
import AddCharges from "../../components/AddCharges";
import {
  closeCardApi,
  createAccountForCardApi,
  createRepairForCardApi,
  fetchCardDetails,
  fetchClientCars,
  getJobListAPI,
  updateCardApi,
} from "../../api/allApi";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store";
import { fetchUsers } from "../../redux-toolkit/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchClients } from "../../redux-toolkit/features/client/clientSlice";
import { ClientCar, JobListInterface, UpdateCardInterface } from "../../types";
import { fetchCards } from "../../redux-toolkit/features/filters/filterSlice";
import WayOutAutoLogic from "../../components/Card/WayOutAutoLogic";
import SpecialPricingOverride from "../../components/Card/SpecialPricingOverride";

const types = [
  "Tiqac",
  "Yarı pricep",
  "Pricep",
  "Avtobus",
  "Neoplan",
  "Digər Texnika",
];

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
  const [loading, setLoading] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [openBobcatWarranty, setOpenBobcatWarranty] = useState(false);
  const [openAmmannWarranty, setOpenAmmannWarranty] = useState(false);
  // const [jobPrices, setJobPrices] = useState<number[]>([0]);
  // const [expencePrices, setExpencePrices] = useState<number>(0);
  const [cardPartsPrice, setCardPartsPrice] = useState<number>(0);
  const [cardData, setCardData] = useState<UpdateCardInterface | null>(null);
  const [clientCars, setClientCars] = useState<ClientCar[] | null>(null);
  const [jobsList, setJobsList] = useState<JobListInterface[]>([]);
  

  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
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
    openDate: "",
    closeDate: "",
    recommendation: "",
    isWayOut: false,
    wayOutDirection: "",
    wayOutWorkers: 0,
    wayOutCar: 0,
    wayOutDistance: 0,
    wayOutWorkTime: 0,
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
  });

  const { users } = useSelector((state: RootState) => state.user);
  const { clients } = useSelector((state: RootState) => state.client);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const workers = useMemo(() => {
  return users.filter(
    p => p.isWorker === true || p.userRole === "ServiceUser"
  );
}, [users]);

  useEffect(() => {
    // Component mount olanda scroll yuxarı qalxsın
    window.scrollTo(0, 0);
  }, []);

    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await getJobListAPI();
          setJobsList(response); 
        } catch (error) {
          console.error("Job list yüklənərkən xəta baş verdi:", error);
        }
      };
  
      fetchJobs();
    }, []);

    console.log({jobsList});
    

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchClients());
  }, [dispatch]);

  console.log(openAmmannWarranty, openBobcatWarranty, setInitialValues);

  console.log({ cardData });

  const reloadCard = async () => {
    try {
      setLoading(true);
      const data = await fetchCardDetails(id);

      setCardData({
        ...initialValues,
        ...data,
        // PROBLEMLER
        cardProblems: data.cardProblems?.length
          ? data.cardProblems.map((p: any) => ({
              description: p.description || "",
              serviceWorkers: p.serviceWorkers?.length
                ? p.serviceWorkers.map((w: any) => w.id) // <-- ID-lərə çevir
                : [""],
            }))
          : [{ description: "", serviceWorkers: [""] }],

        // JOBS (backend cardJobs → jobs)
        cardJobs: data.cardJobs?.length
          ? data.cardJobs.map((j: any) => ({
              code: j.code || "",
              name: j.name || "",
              av: parseFloat(j.av) || 0,
              price: parseFloat(j.price) || 0,
              discount: parseFloat(j.discount) || 0,
              oil: j.oil || "",

              workers: j.workers?.length
                ? j.workers.map((w: any) => ({
                    workerAv: Number(w.workerAv) || "",
                    workerId: w.user?.id || "", // <-- DÜZGÜN YER
                  }))
                : [{ workerAv: "", workerId: "" }],
            }))
          : initialValues.cardJobs,

        // EXPENCES (backend expenses/expences qarışıqlığı)
        expences: data.expences?.length
          ? data.expences
          : data.expenses?.length
            ? data.expenses
            : [{ description: "", price: 0 }],

        cardParts: data.cardParts?.length
          ? data.cardParts
          : [
              // {
              //   code: "",
              //   partName: "",
              //   count: 0,
              //   soldPrice: 0,
              //   discount: 0,
              //   totalPrice: 0,
              // },
            ],
      });
    } catch (err) {
      console.log("Card reload error:", err);
    } finally {
      setLoading(false);
    }
  };

  console.log({ cardData },"1111111111111111111111");
  const hasRepairAct = cardData?.repair?.repairId > 349;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "CARD_PART_ADDED") {
        // KARTI YENİDƏN YÜKLƏ
        reloadCard();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    reloadCard();
  }, [id, refreshPage]);

  const createAccountForCard = async (cardId: any) => {
    const data = await createAccountForCardApi(cardId);

    // console.log({ data });
    if (data.isExist) {
      navigate(`/account/${cardId}`);
      window.scrollTo(0, 0);
    } else {
      alert("Hesab aktı uğurla yaradıldı");
      reloadCard();
    }
  };

  const createRepair = async (cardId: any) => {
    const data = await createRepairForCardApi(cardId);
    // console.log({ data });
    if (data.isExist) {
      navigate(`/repair/${cardId}`);
      window.scrollTo(0, 0);
    } else {
      alert("Təmir aktı uğurla yaradıldı");
      reloadCard();
    }
  };

  // İşçilik qiymətini yeniləyən funksiya
  // const handlePriceUpdate = (index: number, price: number) => {
  //   setJobPrices((prev) => {
  //     const updated = [...prev];
  //     updated[index] = price;
  //     return updated;
  //   });
  // };

  const handlecardPartsPriceUpdate = (price: number) => {
    setCardPartsPrice(price);
  };

  const openWarehousePopup = (id: any) => {
    const width = window.innerWidth * 0.9; // ekranın 90%-i
    const height = window.innerHeight * 0.9; // 90% hündürlük
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const url = `${window.location.origin}/warehouseSelected/${id}`;

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
  // const handleAddJob = () => {
  //   setJobPrices((prev) => [...prev, 0]);
  // };

  // İşçilik silinəndə qiyməti də silinir
  // const handleRemoveJob = (index: number) => {
  //   setJobPrices((prev) => prev.filter((_, i) => i !== index));
  // };

  // const totalPriceWorker = jobPrices.reduce((a, b) => a + b, 0);
  // const totalExpencesPrice = expencePrices;
  // const totalPriceWithoutNds =
  //   totalPriceWorker + totalExpencesPrice + cardPartsPrice;
  // const totalPriceNds = totalPriceWithoutNds * 0.18;
  // const totalPriceWithNds = totalPriceWithoutNds + totalPriceNds;

  const onSubmit = async (values: any, totalPriceWorker: any) => {
    try {
      setLoading(true);
      setError(false);

      const response = await updateCardApi(id, values, totalPriceWorker);

      if (response.success === false) {
        setError(response.message);
      } else {
        // 🔥 STATISTIC DATA YENİDƏN GƏLSİN
        await dispatch(fetchCards({} as any));

        navigate("/statistics");
      }
    } catch (err: any) {
      setError(err.message || "Kart yenilənərkən xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );

  const closeCard = async (cardId: any) => {
    try {
      const data = await closeCardApi(cardId);

      if (data.success) {
        navigate("/statistics");
      }
      // console.log(data);
    } catch (error: any) {
      setError(error.message || "Kart bağlanarkən xəta baş verdi");
    }
  };

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
        initialValues={cardData || initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          // const totalExpencesPrice = values?.expences?.reduce(
          //   (sum: any, item: any) => sum + Number(item.price || 0),
          //   0
          // );
          // setExpencePrices(totalExpencesPrice);

             const totalPriceWorker = values.cardJobs.reduce((sum, job) => {
            const price = Number(job.price || 0);
            const discount = Number(job.discount || 0);
            return sum + price * (1 - discount / 100);
          }, 0);


          const totalExpencesPrice = values.expences.reduce(
            (sum, item) => sum + Number(item.price || 0),
            0
          );

          const totalPartsPrice = values.cardParts.reduce((sum, part) => {
            const usedPrice = Number(part.usedPrice || 0);
            const count = Number(part.count || 0);
            const discount = Number(part.discount || 0);
            const totalPrice = usedPrice * count * (1 - discount / 100);
            return sum + totalPrice;
          }, 0);

          const totalPriceWithoutNds = (Number(totalPriceWorker)) + (Number(totalExpencesPrice))+(Number(totalPartsPrice));
          const totalPriceNds = values.nds ? totalPriceWithoutNds * 0.18 : 0;
          const totalPriceWithNds = totalPriceWithoutNds + totalPriceNds;


          console.log({totalPriceWorker});
          console.log({totalPartsPrice})
          console.log({totalExpencesPrice})


          return (
            <>
            <SpecialPricingOverride />
            <WayOutAutoLogic />
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
                      disabled={!cardData?.isOpen}
                      onChange={async (e: any) => {
                        const clientId = e.target.value;
                        setFieldValue("clientId", clientId);

                        // 1. Müştərinin maşınlarını gətir
                        const clientCars: any = await fetchClientCars(clientId);
                        setClientCars(clientCars); // useState ilə saxlayırıq

                        // 2. Əvvəlki maşın seçimi sıfırlansın
                        setFieldValue("sassi", "");
                      }}
                    >
                      <option value="">Müştərini seç</option>
                      {clients &&
                        clients.map((item: any) => (
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
                    <Field
                      name="isWayOut"
                      as="input"
                      type="checkbox"
                      disabled={!cardData?.isOpen}
                    />
                    Gediş
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => setOpenBobcatWarranty(e.target.checked)}
                      disabled={!cardData?.isOpen}
                    />
                    Bobcat zəmanət
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => setOpenAmmannWarranty(e.target.checked)}
                      disabled={!cardData?.isOpen}
                    />
                    AMMANN zəmanət
                  </label>
                </div>

                {values.isWayOut && (
                  <div className="flex flex-col gap-5 mt-4">
                    <div className="flex gap-2 items-center w-full">
                      <label htmlFor="">Hara</label>
                      <Field as={TextInput} name="wayOutDirection" sizing="sm" disabled={!cardData?.isOpen}/>
                    </div>

                    <div className="flex gap-2 items-center">
                      <label htmlFor="">Maşın</label>
                      <Field as={Select} name="wayOutCar" sizing="sm" disabled={!cardData?.isOpen}>
                        <option value="">Maşını seçin</option>
                        <option value="1">Mitsubishi L200</option>
                        <option value="2">Man TGL 12.240</option>
                      </Field>
                    </div>

                    <div className="flex gap-2 items-center">
                      <label htmlFor="">Məsafə</label>
                      <Field as={TextInput} name="wayOutDistance" sizing="sm" disabled={!cardData?.isOpen} />
                      <span>km</span>
                    </div>

                    <div className="flex gap-2 items-center">
                      <label htmlFor="">İşçi sayı</label>
                      <Field as={TextInput} name="wayOutWorkers" sizing="sm" disabled={!cardData?.isOpen} />
                      <span>(sürücü ilə birlikdə)</span>
                    </div>

                    <div className="flex gap-2 items-center">
                      <label htmlFor="">İş saatları</label>
                      <Field as={TextInput} name="wayOutWorkTime" sizing="sm" disabled={!cardData?.isOpen} />
                      <span>(səyahət daxil olmaqla)</span>
                    </div>
                  </div>
                )}
              </SectionCard>

              {/* Machine Info */}
              <SectionCard title="Texniki Məlumat">
                <div className="p-5 border rounded-xl bg-white shadow-sm">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block mb-1 font-medium">
                        Katın nömrəsi
                      </label>
                      <Field
                        as={TextInput}
                        name="id"
                        placeholder="Şassi nömrəsi"
                        sizing="sm"
                        disabled={!cardData?.isOpen}
                        className="w-1/3"
                      />
                    </div>

                    {/* Texnikanın növü */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Texnikanın növü
                      </label>
                      <Field
                        as={Select}
                        name="type"
                        className="w-1/3"
                        sizing="sm"
                        disabled={!cardData?.isOpen}
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
                              setFieldValue("model", carData.model ?? "");
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
                          {clientCars?.map((car, index) => (
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
                        disabled={!cardData?.isOpen}
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
                        disabled={!cardData?.isOpen}
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
                        disabled={!cardData?.isOpen}
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
                        disabled={!cardData?.isOpen}
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
                        disabled={!cardData?.isOpen}
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
                        disabled={!cardData?.isOpen}
                        className="w-1/3"
                      />
                    </div>

                    {/* Payment */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Ödəniş tipi
                      </label>
                      <Field
                        as={Select}
                        name="paymentType"
                        sizing="sm"
                        disabled={!cardData?.isOpen}
                        className="w-1/3"
                      >
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
                      <Field
                        type="checkbox"
                        name="nds"
                        sizing="sm"
                        disabled={!cardData?.isOpen}
                      />{" "}
                      ƏDV (18%)
                    </label>

                    <label className="flex items-center gap-2">
                      <Field
                        type="checkbox"
                        name="repairAgain"
                        sizing="sm"
                        disabled={!cardData?.isOpen}
                      />{" "}
                      Təkrar təmir
                    </label>

                    <label className="flex items-center gap-2">
                      <Field
                        type="checkbox"
                        name="servisInfo"
                        sizing="sm"
                        disabled={!cardData?.isOpen}
                      />{" "}
                      Servis məlumatı
                    </label>
                  </div>
                </div>
              </SectionCard>

              {/* Problems */}
              <FieldArray name="cardProblems">
                {({ push, remove }) => (
                  <SectionCard title="Problemlər">
                    {values?.cardProblems.map((_, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-md bg-gray-50"
                      >
                        <NewCardProblems
                          serviceWorkers={workers}
                          name={`cardProblems[${index}]`}
                          values={values.cardProblems[index]}
                          setFieldValue={setFieldValue}
                          cardData={cardData}
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
                        disabled={!cardData?.isOpen}
                      >
                        Əlavə et +
                      </Button>
                      <Button
                        onClick={() => remove(values.cardProblems.length - 1)}
                        color="gray"
                        size="xs"
                        type="button"
                        disabled={
                          values.cardProblems.length <= 1 || !cardData?.isOpen
                        }
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
                      <table className="w-full text-xs text-gray-600 ">
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

                        {values.cardJobs.map((job, index) => (
                          <NewCardWorkers
                            key={index}
                            workers={workers}
                            name={`cardJobs[${index}]`}
                            values={job}
                            cardData={cardData}
                            paymentType={values.paymentType}
                            jobsList={jobsList}
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
                      <div className="flex gap-2">
                        <Button
                          color="blue"
                          size="xs"
                          type="button"
                          disabled={!cardData?.isOpen}
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

                            // handleAddJob();
                          }}
                        >
                          Əlavə et +
                        </Button>

                        <Button
                          color="gray"
                          size="xs"
                          type="button"
                          disabled={
                            values.cardJobs.length <= 1 || !cardData?.isOpen
                          }
                          onClick={() => {
                            const index = values.cardJobs.length - 1;
                            remove(index);
                            // handleRemoveJob(index);
                          }}
                        >
                          Azalt -
                        </Button>
                      </div>
                    </div>

                    <Link
                      to={`/printPageOne/${id}`}
                      className="flex justify-end mt-4"
                    >
                      <Button color="warning" size="xs">
                        <FiPrinter className="mr-2" /> Çap et
                      </Button>
                    </Link>
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
                        cardData={cardData}
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
                          disabled={!cardData?.isOpen}
                          onClick={() => push({ description: "", price: 0 })}
                        >
                          Əlavə et +
                        </Button>

                        {/* AZALT → sonuncu expense-i silir */}
                        <Button
                          color="gray"
                          size="xs"
                          disabled={
                            values.expences.length <= 1 || !cardData?.isOpen
                          }
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
                <NewCardAddParts
                  values={values}
                  cardPartsPrice={(price: any) =>
                    handlecardPartsPriceUpdate(price)
                  }
                  cardId={id}
                  setRefreshPage={setRefreshPage}
                  cardData={cardData}
                  paymentType={values.paymentType}
                />
                <div className="flex gap-3 font-semibold mt-5 items-center justify-center">
                  <span>Cəmi:</span>
                  <span>{cardPartsPrice} AZN</span>
                </div>

                {cardData?.isOpen && (
                  <div className="flex flex-col gap-1 mt-5 text-blue-700  w-[100px]">
                    <div
                      className="hover:underline cursor-pointer"
                      // onClick={openWarehousePopup}
                    >
                      E/h əlavə et (barkod ilə)
                    </div>
                    <div
                      className="hover:underline cursor-pointer"
                      onClick={() => openWarehousePopup(id)}
                      color={"blue"}
                    >
                      E/h əlavə et{" "}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {!cardData?.isOpen ? (
                    <div className="flex gap-2">
                      <Button
                        color={"blue"}
                        size={"xs"}
                        onClick={() => createAccountForCard(id)}
                        disabled={!hasRepairAct}
                      >
                        Hesab Aktı Yarat
                      </Button>
                      <Button
                        color={"blue"}
                        size={"xs"}
                        onClick={() => createRepair(id)}
                      >
                        Təmir Aktı Yarat
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2"></div>
                  )}

                  <div className="flex gap-2">
                    <Link to={`/printPageSecond/${id}`}>
                      <Button color="warning" size="xs">
                        <FiPrinter className="mr-2" /> Çap et
                      </Button>
                    </Link>
                    <Link to={`/agreement/${id}`}>
                      <Button color="blue" size="xs">
                        Razılaşma aktı
                      </Button>
                    </Link>
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
                  disabled={!cardData?.isOpen}
                />
              </SectionCard>

              {/* Recommendation */}
              <SectionCard title="Məsləhətlər">
                <Field
                  as={Textarea}
                  rows={4}
                  name="recommendation"
                  placeholder="Məsləhət yazın..."
                  disabled={!cardData?.isOpen}
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
              <div className="bottom-0 bg-white border-t shadow-inner flex flex-wrap justify-end gap-3 p-4">
                <Button
                  type="submit"
                  color="blue"
                  size="xs"
                  disabled={!cardData?.isOpen}
                >
                  Yadda Saxla
                </Button>
                <Button
                  color="purple"
                  size="xs"
                  onClick={() => closeCard(id)}
                  disabled={!cardData?.isOpen}
                >
                  Kartı Bağla
                </Button>
              </div>
            </Form>
            </>
          );
        }}
      </Formik>
    </div>
  
  );
};

export default UpdateCard;
