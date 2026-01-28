import { TextInput } from "flowbite-react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import NewCardWorkersName from "./NewCardWorkersName";
import { Field, FieldArray } from "formik";
import { UserInterface } from "../types";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../redux-toolkit/store/store";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";

interface CardWorkersInterface {
  workers: UserInterface[];
  values: any;
  name: string;
  cardData?: any;
  paymentType: any;
  jobsList?: any;
}

const NewCardWorkers = ({
  workers,
  values,
  name,
  cardData,
  paymentType,
  jobsList,
}: CardWorkersInterface) => {
  const [showJobs, setShowJobs] = useState(false);
  const { setFieldValue, handleChange } = useFormikContext<any>();
  const [search, setSearch] = useState("");

  const { users } = useSelector((state: RootState) => state.user);

  // console.log({jobsList});

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowJobs(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const av = Number(values.av || 0);

    let calculatedTotal = 0;

    if (paymentType === "internal") {
      values.workers.forEach((w: any) => {
        const workerAv = Number(w.workerAv || 0);
        const workerPercent =
          Number(users.find((u) => u.id === Number(w.workerId))?.percent || 0) /
          100;
        calculatedTotal += workerAv * 50 * workerPercent;
      });
    } else {
      calculatedTotal = av * 50;
    }

    // Discount tətbiq et
    // calculatedTotal = calculatedTotal * (1 - discount / 100);
    const newPrice = Number(calculatedTotal.toFixed(2));

    if (values.price !== newPrice) {
      setFieldValue(`${name}.price`, newPrice);
    }
  }, [values.av, values.discount, values.workers, paymentType, users]);

  useEffect(() => {
    if (!cardData?.client) return;

    const client = cardData.client;
    const isWorker = client.type === "worker";
    const isInternal = paymentType === "internal";

    if (isWorker && isInternal) {
      setFieldValue(`${name}.discount`, 0);
    } else if (paymentType === "transfer" || paymentType === "cash") {
      setFieldValue(`${name}.discount`, client.av || 0);
    }
  }, [cardData?.client, paymentType]);

  const handleWorkerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    handleChange(e);
    //  setFieldValue(`${name}.code`, value);
    if (value === "Y1") {
      // auto fill
      setFieldValue(`${name}.name`, "Yağın dəyişilməsi");
      setFieldValue(`${name}.av`, 0.4);
    }
  };

  const handleFilterWork = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value.toLowerCase();
    setSearch(filterValue);
  };

  const filteredJobs = jobsList.filter(
    (job: any) =>
      job.code.toLowerCase().includes(search.toLowerCase()) ||
      job.name.toLowerCase().includes(search.toLowerCase()) ||
      job.av.includes(search.toLowerCase()),
  );

  return (
    <tbody>
      <tr className="border-b hover:bg-gray-50">
        <td className="px-1 ">
          {/* Job code input field */}
          <Field
            as={TextInput}
            type="text"
            className="w-[150px] text-xs"
            sizing="sm"
            name={`${name}.code`}
            disabled={cardData && !cardData?.isOpen}
            onChange={handleWorkerNameChange}
          />
        </td>
        <td className="px-1 ">
          <div className="flex gap-2 items-center">
            <Field
              as={TextInput}
              type="text"
              className="w-[250px]"
              name={`${name}.name`}
              sizing="sm"
              disabled={cardData && !cardData?.isOpen}
            />
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setShowJobs(true);
              }}
            >
              <FaArrowAltCircleUp className="text-2xl text-green-600" />
            </button>

            {showJobs && (
              <div
                className="fixed inset-0 bg-black/30 z-50 flex justify-center items-start pt-20 scroll-py-0.5"
                onClick={() => setShowJobs(false)}
              >
                <div
                  ref={popupRef}
                  className="bg-white border p-4 shadow-lg 
             max-h-[70vh] overflow-y-auto 
             w-[800px] rounded-lg"
                  onClick={(e) => e.stopPropagation()} // popup içində klikləyəndə bağlanmasın
                >
                  <div>
                    <TextInput
                      type="text"
                      sizing={"sm"}
                      className="w-1/2 mb-2"
                      placeholder="Axtar..."
                      onChange={handleFilterWork}
                    />
                  </div>
                  <table className="table-auto text-sm w-full">
                    <thead>
                      <tr className="bg-gray-100 sticky top-0">
                        <th className="px-2 py-1 text-left">Kod</th>
                        <th className="px-2 py-1 text-left">Ad</th>
                        <th className="px-2 py-1 text-left">AV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJobs.map((job: any) => (
                        <tr
                          key={job.id}
                          className="cursor-pointer hover:bg-gray-200"
                          onClick={() => {
                            setFieldValue(`${name}.code`, job.code);
                            setFieldValue(`${name}.name`, job.name);
                            setFieldValue(`${name}.av`, parseFloat(job.av));
                            setShowJobs(false);
                          }}
                        >
                          <td className="px-2 py-1">{job.code}</td>
                          <td className="px-2 py-1">{job.name}</td>
                          <td className="px-2 py-1">{parseFloat(job.av)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </td>
        <td className="px-1">
          <Field
            as={TextInput}
            type="text"
            className="w-[60px]"
            name={`${name}.av`}
            sizing="sm"
            disabled={cardData && !cardData?.isOpen}
          />
        </td>
        <td className="px-1">
          <Field
            as={TextInput}
            type="text"
            className="w-[100px]"
            readOnly
            name={`${name}.price`}
            sizing="sm"
            disabled={cardData && !cardData?.isOpen}
          />
        </td>
        <td className="px-6">
          <Field
            as={TextInput}
            type="text"
            className="w-[70px]"
            name={`${name}.discount`}
            sizing="sm"
            disabled={cardData && !cardData?.isOpen}
          />
        </td>
        <td className="px-1">
          <Field
            as={TextInput}
            type="text"
            className="w-[70px]"
            name={`${name}.oil`}
            sizing="sm"
            disabled={cardData && !cardData?.isOpen}
          />
        </td>
        <td className="px-6 py-4">
          <FieldArray name={`${name}.workers`}>
            {({ push, remove }) => (
              <div className="flex flex-col gap-2">
                {values.workers.map((_: any, index: number) => (
                  <NewCardWorkersName
                    key={index}
                    workers={workers} // backend-dən gələn user list
                    name={`${name}.workers[${index}]`}
                    index={index}
                    push={push}
                    remove={remove}
                    values={values} // indi tək worker obyektidir
                    cardData={cardData}
                  />
                ))}
              </div>
            )}
          </FieldArray>
        </td>
      </tr>
    </tbody>
  );
};

export default NewCardWorkers;
