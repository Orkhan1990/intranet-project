import {
  Label,
  Select,
  TextInput,
  Button,
  Table,
  Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import NewCardProblems from "../components/NewCardProblems";
import NewCardWorkers from "../components/NewCardWorkers";
import NewCardAddParts from "../components/NewCardAddParts";
import AddCharges from "../components/AddCharges";
import { FiPrinter } from "react-icons/fi";
import { Formik, Form, Field, FieldArray } from "formik";
import { ClientInterface, NewCardInterface } from "../types";

const types = [
  "Tiqac",
  "Yari pricep",
  "pricep",
  "Avtobus",
  "Neoplan",
  "Diger Texnika",
];


let price:number=0;
let count:number=0;

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

const NewCard = () => {
  const [error, setError] = useState(false);
  const [clients, setClients] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [openGedis, setOpenGedis] = useState(false);
  const [openBobcatWarranty, setOpenBobcatWarranty] = useState(false);
  const [openAmmannWarranty, setOpenAmmannWarranty] = useState(false);

  useEffect(() => {
    const getWorkers = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/user/getWorkers",
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
          return;
        }

        setWorkers(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    getWorkers();
    const getClients = async () => {
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
          return;
        }
        setClients(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    getClients();
  }, []);

  const onSubmit = (values: NewCardInterface) => {
    console.log(values);
  };
  return (
    <div className="min-h-screen m-10 ">
      <h2 className="text-center text-lg font-semibold">Yeni kart yarat</h2>
      <Formik initialValues={newCardInitialValues} onSubmit={onSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="mt-10 flex flex-col gap-5 text-sm">
            <div className="border rounded-md p-5">
              <div className="flex items-center gap-10">
                <Label htmlFor="client" value="Müştəri adı" />

                <Field
                  as={Select}
                  className="flex-1"
                  id="clientId"
                  name="clientId"
                >
                  <option value="">Müştərini seç</option>
                  {clients.map((item: ClientInterface, index: number) => (
                    <option value={item.id} key={index}>
                      {item.companyName}
                    </option>
                  ))}
                </Field>

                <Link
                  to={"/newClient"}
                  className="text-blue-600 flex items-center gap-2"
                >
                  <span>Yeni müştəri yarat</span>
                  <FaPlus />
                </Link>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------------------------ */}
            {/* WARRANTY SECTION */}
            <div className="border p-5 rounded-md">
              <h2>Gediş</h2>
              <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => setOpenGedis(e.target.checked)}
                  />
                  <span>Gediş</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    value="bobcatWaranty"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => setOpenBobcatWarranty(e.target.checked)}
                  />
                  <span>Bobcat zəmanət</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    value="hamannWaranty"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => setOpenAmmannWarranty(e.target.checked)}
                  />
                  <span>AMMANN zəmanət</span>
                </div>
              </div>
              {openGedis && (
                <div className="mt-10 flex flex-col gap-5">
                  <div className="flex gap-5 items-center">
                    <span>Hara</span>
                    <TextInput />
                  </div>
                  <div className="flex gap-5 items-center">
                    <span>Maşınla</span>
                    <Select>
                      <option value=""></option>
                      <option value="">Mitsubishi L200</option>
                      <option value="">Man TGL 12.240</option>
                    </Select>
                  </div>
                  <div className="flex gap-5 items-center">
                    <span>Məsafə</span>
                    <TextInput />
                    <span>Km</span>
                  </div>
                  <div className="flex gap-5 items-center">
                    <span>İşçilər getdi</span>
                    <TextInput />
                    <span>(sürücü ilə birlikdə)</span>
                  </div>
                  <div className="flex gap-5 items-center">
                    <span>İş saatları (səyahət daxil olmaqla)</span>
                    <TextInput />
                    <span>(saat)</span>
                  </div>
                </div>
              )}

              {openBobcatWarranty && (
                <div className="flex items-center justify-between">
                  <div className="mt-10 flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                      <span>Hara</span>
                      <TextInput />
                    </div>
                    <div className="flex gap-5 items-center">
                      <span>Məsafə</span>
                      <TextInput />
                      <span>Km(0 km)</span>
                    </div>
                    <div className="flex gap-5 items-center">
                      <span>Orada</span>
                      <TextInput />
                      <TextInput />
                    </div>
                    <div className="flex gap-5 items-center">
                      <span>Oradan</span>
                      <TextInput />
                      <TextInput />
                    </div>
                    <div className="flex gap-5 items-center">
                      <span>Səyahət vaxtı</span>
                      <TextInput />
                      <span>(0 saat 0 dəqiqə)</span>
                    </div>
                    <div className="flex gap-5 items-center">
                      <span>Kurs $</span>
                      <TextInput />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[100px]">
                    <div className="flex gap-3 items-center">
                      <TextInput type="radio" />
                      <span>Məsafə</span>
                    </div>
                    <div className="flex  gap-3 items-center">
                      <TextInput type="radio" />
                      <span>Vaxt</span>
                    </div>
                  </div>
                </div>
              )}

              {openAmmannWarranty && (
                <div className="mt-10 flex flex-col gap-5">
                  <div className="flex gap-5 items-center">
                    <span>Hara</span>
                    <TextInput />
                  </div>
                  <div className="flex gap-5 items-center">
                    <span>Məsafə</span>
                    <TextInput />
                    <span>Km(0 km)</span>
                  </div>
                  <div className="flex gap-5 items-center">
                    <span>Səyahət vaxtı</span>
                    <TextInput />
                    <span>(0 saat 0 dəqiqə)</span>
                  </div>
                  <div className="flex gap-5 items-center">
                    <span>Kurs $</span>
                    <TextInput />
                  </div>
                </div>
              )}
            </div>

            <div className="border p-5 rounded-md flex flex-col gap-5">
              <div className="flex items-center">
                <span className="w-[300px]">Texnikanın növü</span>
                <Field as={Select} name="type" id="type">
                  {types.map((type, index) => (
                    <option value={type} key={index}>
                      {type}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="flex  items-center">
                <span className="w-[300px]">Istehsalçı</span>
                <Field as={Select} name="manufactured" id="manufactured">
                  <option value="man">MAN</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="daf">DAF</option>
                  <option value="ford">Ford</option>
                  <option value="volvo">Volvo</option>
                </Field>
              </div>
              <div className="flex  items-center">
                <span className="w-[300px]">Model</span>
                <Field
                  as={TextInput}
                  type="text"
                  className="w-[500px]"
                  id="model"
                  name="model"
                />
              </div>
              <div className="flex  items-center">
                <span className="w-[300px]">Şassi nömrəsi</span>
                <Field
                  as={TextInput}
                  type="text"
                  className="w-[500px]"
                  id="sassi"
                  name="sassi"
                />
              </div>
              <div className="flex  items-center">
                <span className="w-[300px]">Maşın nömrəsi</span>
                <Field
                  as={TextInput}
                  type="text"
                  className="w-[500px]"
                  id="carNumber"
                  name="carNumber"
                />
              </div>
              <div className="flex  items-center">
                <span className="w-[300px]">İstehsal tarixi</span>
                <Field as={Select} name="produceDate" id="produceDate">
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                </Field>
              </div>
              <div className="flex  items-center">
                <span className="text-sm w-[300px]">Km/Motosaat</span>
                <Field
                  as={TextInput}
                  type="text"
                  className="w-[500px]"
                  id="km"
                  name="km"
                />
              </div>
              <div className="flex  items-center">
                <span className="text-sm w-[300px]">Dövlət nömrəsi</span>
                <Field
                  as={TextInput}
                  type="text"
                  className="w-[500px]"
                  id="qostNumber"
                  name="qostNumber"
                />
              </div>
              <div className="flex  items-center">
                <span className="text-sm w-[300px]">Ödəniş üsulu</span>
                <Field as={Select} name="paymentType" id="paymentType">
                  <option value="transfer">Köçürülmə</option>
                  <option value="cash">Nağd</option>
                  <option value="warranty">Qarantiya</option>
                  <option value="internal">Daxili iş</option>
                  <option value="pos">POS</option>
                </Field>
              </div>
              <div className="flex  items-center">
                <span className="text-sm w-[300px]">ƏDV</span>
                <Field
                  id="nds"
                  type="checkbox"
                  name="nds"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex  items-center">
                <span className="text-sm w-[300px]">Təkrar təmir</span>
                <Field
                  type="checkbox"
                  name="repairAgain"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex  items-center">
                <span className="text-sm w-[300px]">Servis məlumatı</span>
                <Field
                  id="servisInfo"
                  type="checkbox"
                  name="servisInfo"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            {/* -------------------------------------------------------------------------------------------- */}
            {/* PROBLEM SECTION */}
            <FieldArray name="problems">
              {({ push, remove }) => (
                <>
                  {values.problems.map((_, index) => (
                    <div key={index}>
                      <div className="border p-5 rounded-md">
                        <h2>Problemlər</h2>
                        <NewCardProblems
                          workers={workers}
                          name={`problems[${index}]`}
                          values={values.problems[index]}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-5">
                    <Button
                      color="blue"
                      type="button"
                      className="mt-5"
                      onClick={() =>
                        push({ description: "", serviceWorkers: [""] })
                      }
                    >
                      Əlavə et <span className="ml-2 ">+</span>
                    </Button>
                    <Button
                      color="blue"
                      type="button"
                      className="mt-5"
                      onClick={() =>
                        values.problems.length > 1 &&
                        remove(values.problems.length - 1)
                      }
                    >
                      Azalt <span className="ml-2 ">+</span>
                    </Button>
                  </div>
                </>
              )}
            </FieldArray>

            {/* -----------------------------------------------------------------------------------------          */}
            {/* JOBS SECTION */}
            <FieldArray name="jobs">
              {({ push, remove }) => (
                <div className="border p-5 rounded-md  overflow-x-scroll">
                  <h2 className="mb-4">İşçilik</h2>
                  <Table>
                    <Table.Head>
                      <Table.HeadCell>İşin kodu (MAN)</Table.HeadCell>
                      <Table.HeadCell>İşin adı</Table.HeadCell>
                      <Table.HeadCell>AV</Table.HeadCell>
                      <Table.HeadCell>Qiymət</Table.HeadCell>
                      <Table.HeadCell>Endirim(%)</Table.HeadCell>
                      <Table.HeadCell>Yağ</Table.HeadCell>
                      <Table.HeadCell>Görüldü</Table.HeadCell>
                    </Table.Head>
                    {values.jobs.map((_, index) => (
                      <NewCardWorkers
                        workers={workers}
                        name={`jobs[${index}]`}
                        values={values.jobs[index]}
                      />
                    ))}
                  </Table>
                  <div className="flex  gap-2 mt-5 items-center justify-center">
                    <h2 className="font-bold">Cəmi:</h2>
                    <span className="font-semibold">0 AZN</span>
                  </div>

                  <div className="flex gap-5">
                    <Button
                      color="blue"
                      className="mt-5"
                      onClick={() =>
                        push({
                          code: "",
                          name: "",
                          av: 0,
                          price: 0,
                          discount: 0,
                          oil: "",
                          jobWorkers: [{ workerAv: "", workerId: "" }],
                        })
                      }
                    >
                      Əlavə et <span className="ml-2 ">+</span>
                    </Button>
                    <Button
                      color="blue"
                      className="mt-5"
                      onClick={() =>
                        values.jobs.length > 1 && remove(values.jobs.length - 1)
                      }
                    >
                      Azalt <span className="ml-2 ">-</span>
                    </Button>
                  </div>
                </div>
              )}
            </FieldArray>

            {/* ---------------------------------------------------------------------------------------------- */}
            {/*EXPENCES*/}

            <FieldArray name="expences">
              {({ push }) => (
                <>
                  {values.expences.map((_, index) => (
                    <AddCharges name={`expences[${index}]`} />
                  ))}
                  <div className="flex gap-2 items-center font-semibold justify-end ">
                    <span>Cəmi:</span>
                    <span>0 AZN</span>
                  </div>
                  <div>
                    <Button
                      color="blue"
                      onClick={() => push({ description: "", price: "" })}
                    >
                      Əlavə et <span className="ml-2 ">+</span>
                    </Button>
                  </div>
                </>
              )}
            </FieldArray>

            <NewCardAddParts />

            <div className="border p-5 rounded-md">
              <h2 className="font-semibold mb-5">İş haqqında şərhlər</h2>
              <Field
                as={Textarea}
                rows={4}
                placeholder="Şərh yaz....."
                id="comments"
                name="comments"
              />
            </div>
            <div className="border p-5 rounded-md">
              <h2 className="font-semibold mb-5">Məsləhətlər</h2>
              <Field
                as={Textarea}
                rows={4}
                id="recommendation"
                name="recommendation"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Button type="submit" color={"blue"}>
                Yadda Saxla
              </Button>
              <Button color={"blue"}>Kartı bağla</Button>
              <div className="w-[110px] flex justify-center gap-2 p-3 items-center  bg-blue-700 text-white  rounded-lg cursor-pointer hover:bg-blue-800">
                <span>Çap et</span>
                <FiPrinter />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewCard;
