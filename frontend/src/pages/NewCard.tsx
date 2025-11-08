import {
  Label,
  Select,
  TextInput,
  Button,
  Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import { Formik, Form, Field, FieldArray } from "formik";
import NewCardProblems from "../components/NewCardProblems";
import NewCardWorkers from "../components/NewCardWorkers";
import NewCardAddParts from "../components/NewCardAddParts";
import AddCharges from "../components/AddCharges";
import { ClientInterface, NewCardInterface } from "../types";

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
  problems: [
    {
      description: "",
      serviceWorkers: [""],
    },
  ],
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
  expences: [
    {
      description: "",
      price: 0,
    },
  ],
};

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
    <h3 className="text-lg font-semibold text-blue-700 border-b pb-2">{title}</h3>
    {children}
  </div>
);

const NewCard = () => {
  const [error, setError] = useState<string | boolean>(false);
  const [clients, setClients] = useState<ClientInterface[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [openGedis, setOpenGedis] = useState(false);
  const [openBobcatWarranty, setOpenBobcatWarranty] = useState(false);
  const [openAmmannWarranty, setOpenAmmannWarranty] = useState(false);
  const [jobPrices, setJobPrices] = useState<number[]>([0]);
  const [expencePrice, setExpencePrice] = useState<number[]>([0]);

   console.log(error,openBobcatWarranty,openAmmannWarranty);
   


  const handlePriceUpdate = (index: number, price: number) => {
    const newPrice = [...jobPrices];
    newPrice[index] = price;
    setJobPrices(newPrice);
  };

  const handleExpencesPrice = (index: number, price: number) => {
    const newExpencesPrice = [...expencePrice];
    newExpencesPrice[index] = price;
    setExpencePrice(newExpencesPrice);
  };

  const totalPrice = jobPrices.reduce((a, b) => a + b, 0);
  const totalExpencesPrice = expencePrice.reduce((a, b) => a + b, 0);
  const totalPriceWithoutNds = totalPrice + totalExpencesPrice;
  const totalPriceNds = totalPriceWithoutNds * 0.18;
  const totalPriceWithNds = totalPriceWithoutNds + totalPriceNds;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workersRes, clientsRes] = await Promise.all([
          fetch("http://localhost:3013/api/v1/user/getWorkers", {
            credentials: "include",
          }),
          fetch("http://localhost:3013/api/v1/client/getClients", {
            credentials: "include",
          }),
        ]);

        const workersData = await workersRes.json();
        const clientsData = await clientsRes.json();

        if (!workersRes.ok || workersData.success === false)
          throw new Error(workersData.message);
        if (!clientsRes.ok || clientsData.success === false)
          throw new Error(clientsData.message);

        setWorkers(workersData);
        setClients(clientsData);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (values: NewCardInterface) => {
    console.log(values);
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-8">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
        Yeni Kart Yarat
      </h2>

      <Formik initialValues={newCardInitialValues} onSubmit={onSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="space-y-8">
            {/* CLIENT SECTION */}
            <SectionCard title="Müştəri Məlumatları">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="flex-1 w-full">
                  <Label htmlFor="clientId" value="Müştəri adı" />
                  <Field as={Select} id="clientId" name="clientId" className="w-full mt-1">
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
                  className="text-blue-600 flex items-center gap-2 whitespace-nowrap"
                >
                  <FaPlus /> Yeni müştəri yarat
                </Link>
              </div>
            </SectionCard>

            {/* WARRANTY/TRIP SECTION */}
            <SectionCard title="Gediş və Zəmanət">
              <div className="flex flex-wrap gap-5">
                <label className="flex items-center gap-2">
                  <input type="checkbox" onChange={(e) => setOpenGedis(e.target.checked)} />
                  Gediş
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" onChange={(e) => setOpenBobcatWarranty(e.target.checked)} />
                  Bobcat zəmanət
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" onChange={(e) => setOpenAmmannWarranty(e.target.checked)} />
                  AMMANN zəmanət
                </label>
              </div>

              {openGedis && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  <div>
                    <Label value="Hara" />
                    <TextInput />
                  </div>
                  <div>
                    <Label value="Maşınla" />
                    <Select>
                      <option>Mitsubishi L200</option>
                      <option>Man TGL 12.240</option>
                    </Select>
                  </div>
                  <div>
                    <Label value="Məsafə (Km)" />
                    <TextInput />
                  </div>
                  <div>
                    <Label value="İşçilər getdi (sürücü ilə birlikdə)" />
                    <TextInput />
                  </div>
                  <div>
                    <Label value="İş saatları (səyahət daxil olmaqla)" />
                    <TextInput />
                  </div>
                </div>
              )}
            </SectionCard>

            {/* MACHINE INFO */}
            <SectionCard title="Texniki Məlumat">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label value="Texnikanın növü" />
                  <Field as={Select} name="type" className="w-full mt-1">
                    {types.map((t, i) => (
                      <option key={i}>{t}</option>
                    ))}
                  </Field>
                </div>

                <div>
                  <Label value="İstehsalçı" />
                  <Field as={Select} name="manufactured" className="w-full mt-1">
                    <option value="man">MAN</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="daf">DAF</option>
                    <option value="ford">Ford</option>
                    <option value="volvo">Volvo</option>
                  </Field>
                </div>

                <div>
                  <Label value="Model" />
                  <Field as={TextInput} name="model" className="w-full mt-1" />
                </div>
                <div>
                  <Label value="Şassi nömrəsi" />
                  <Field as={TextInput} name="sassi" className="w-full mt-1" />
                </div>

                <div>
                  <Label value="Maşın nömrəsi" />
                  <Field as={TextInput} name="carNumber" className="w-full mt-1" />
                </div>
                <div>
                  <Label value="İstehsal tarixi" />
                  <Field as={Select} name="produceDate" className="w-full mt-1">
                    {[2024, 2023, 2022, 2021, 2020, 2019].map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </Field>
                </div>

                <div>
                  <Label value="Km/Motosaat" />
                  <Field as={TextInput} name="km" className="w-full mt-1" />
                </div>
                <div>
                  <Label value="Dövlət nömrəsi" />
                  <Field as={TextInput} name="qostNumber" className="w-full mt-1" />
                </div>

                <div>
                  <Label value="Ödəniş üsulu" />
                  <Field as={Select} name="paymentType" className="w-full mt-1">
                    <option value="transfer">Köçürülmə</option>
                    <option value="cash">Nağd</option>
                    <option value="warranty">Qarantiya</option>
                    <option value="internal">Daxili iş</option>
                    <option value="pos">POS</option>
                  </Field>
                </div>

                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="nds" />
                  <Label value="ƏDV (18%)" />
                </div>

                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="repairAgain" />
                  <Label value="Təkrar təmir" />
                </div>

                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="servisInfo" />
                  <Label value="Servis məlumatı" />
                </div>
              </div>
            </SectionCard>

            {/* PROBLEMS */}
            <FieldArray name="problems">
              {({ push, remove }) => (
                <SectionCard title="Problemlər">
                  {values.problems.map((_, index) => (
                    <div key={index} className="border p-4 rounded-md bg-gray-50">
                      <NewCardProblems
                        workers={workers}
                        name={`problems[${index}]`}
                        values={values.problems[index]}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  ))}
                  <div className="flex gap-3 justify-end">
                    <Button
                      onClick={() => push({ description: "", serviceWorkers: [""] })}
                      color="blue"
                      type="button"
                      size={"xs"}
                    >
                      Əlavə et +
                    </Button>
                    <Button
                      onClick={() => values.problems.length > 1 && remove(values.problems.length - 1)}
                      color="gray"
                      type="button"
                      size={"xs"}
                    >
                      Azalt -
                    </Button>
                  </div>
                </SectionCard>
              )}
            </FieldArray>

            {/* JOBS */}
            <FieldArray name="jobs">
              {({ push, remove }) => (
                <SectionCard title="İşçilik">
                  <div className="overflow-x-auto">
                    {values.jobs.map((_, index) => (
                      <NewCardWorkers
                        key={index}
                        workers={workers}
                        name={`jobs[${index}]`}
                        values={values.jobs[index]}
                        jobWorkerPrice={(price) => handlePriceUpdate(index, price)}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="font-semibold text-gray-700">
                      Cəmi: {totalPrice.toFixed(2)} AZN
                    </div>
                    <div className="flex gap-3">
                      <Button
                        color="blue"
                        type="button"
                        size={"xs"}
                        onClick={() =>
                          push({
                            code: "",
                            name: "",
                            av: 0,
                            price: 0,
                            discount: 0,
                            oil: "",
                            jobWorkers: [{ workerAv: "", workerId: 0 }],
                          })
                        }
                      >
                        Əlavə et +
                      </Button>
                      <Button
                        color="gray"
                        size={"xs"}
                        type="button"
                        onClick={() => {
                          if (values.jobs.length > 1) {
                            remove(values.jobs.length - 1);
                            setJobPrices(jobPrices.slice(0, -1));
                          }
                        }}
                      >
                        Azalt -
                      </Button>
                    </div>
                  </div>
                </SectionCard>
              )}
            </FieldArray>

            {/* EXPENSES */}
            <FieldArray name="expences">
              {({ push, remove }) => (
                <SectionCard title="Xərclər">
                  {values.expences.map((_, index) => (
                    <AddCharges
                      key={index}
                      name={`expences[${index}]`}
                      expenceUpdatePrice={(price) => handleExpencesPrice(index, price)}
                      values={values.expences[index]}
                    />
                  ))}
                  <div className="text-right font-semibold">
                    Cəmi: {totalExpencesPrice.toFixed(2)} AZN
                  </div>
                  <div className="flex justify-end gap-3 mt-3">
                    <Button color="blue" size={"xs"} onClick={() => push({ description: "", price: 0 })}>
                      Əlavə et +
                    </Button>
                    <Button
                      color="gray"
                      size={"xs"}
                      onClick={() => {
                        if (values.expences.length > 1) {
                          remove(values.expences.length - 1);
                          setExpencePrice(expencePrice.slice(0, -1));
                        }
                      }}
                    >
                      Azalt -
                    </Button>
                  </div>
                </SectionCard>
              )}
            </FieldArray>

            {/* PARTS SECTION */}
            <NewCardAddParts />

            {/* COMMENTS */}
            <SectionCard title="İş haqqında şərhlər">
              <Field as={Textarea} rows={4} name="comments" placeholder="Şərh yazın..." />
            </SectionCard>

            {/* RECOMMENDATION */}
            <SectionCard title="Məsləhətlər">
              <Field as={Textarea} rows={4} name="recommendation" placeholder="Məsləhət yazın..." />
            </SectionCard>

            {/* TOTALS */}
            <div className="bg-gray-100 rounded-md p-4 text-right space-y-1 font-medium">
              <div>Cəm: {totalPriceWithoutNds.toFixed(2)} AZN</div>
              {values.nds && (
                <>
                  <div>ƏDV (18%): {totalPriceNds.toFixed(2)} AZN</div>
                  <div className="text-blue-700 font-bold text-lg">
                    Cəmi ƏDV ilə: {totalPriceWithNds.toFixed(2)} AZN
                  </div>
                </>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="sticky bottom-0 bg-white border-t shadow-inner flex flex-wrap justify-end gap-3 p-4">
              <Button type="submit" color="blue" size={"xs"}>
                Yadda Saxla
              </Button>
              <Button color="gray" size={"xs"}>Kartı Bağla</Button>
              <Button color="purple" size={"xs"}>
                <FiPrinter className="mr-2" /> Çap et
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewCard;
