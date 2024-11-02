import { TextInput } from "flowbite-react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import NewCardWorkersName from "./NewCardWorkersName";
import { Field, FieldArray } from "formik";
import { NewCardJobsInterface, UserInterface } from "../types";
import { useEffect } from "react";

interface CardWorkersInterface {
  workers: UserInterface[];
  values: NewCardJobsInterface;
  name: string;
  jobWorkerPrice: (price: any) => void;
}

const NewCardWorkers = ({
  workers,
  values,
  name,
  jobWorkerPrice,
}: CardWorkersInterface) => {
  const price = (values.av || 0) * 50 * (1 - (values.discount || 0) / 100);
  useEffect(() => {
    jobWorkerPrice(price);
  }, [price]);

  return (
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-1">
          <Field
            as={TextInput}
            type="text"
            className="w-[150px] text-xs"
            sizing="sm"
            name={`${name}.code`}
          />
        </td>
        <td className="px-1">
          <div className="flex gap-2 items-center">
            <Field
              as={TextInput}
              type="text"
              className="w-[250px]"
              name={`${name}.name`}
              sizing="sm"

            />
            <Link to="">
              <FaArrowAltCircleUp className="text-2xl text-green-600" />
            </Link>
          </div>
        </td>
        <td className="px-1">
          <Field
            as={TextInput}
            type="text"
            className="w-[60px]"
            name={`${name}.av`}
            sizing="sm"

          />
        </td>
        <td className="px-1">
          <TextInput
            type="text"
            className="w-[100px]"
            readOnly
            value={price}
            sizing="sm"
            // value={}
          />
        </td>
        <td className="px-6">
          <Field
            as={TextInput}
            type="text"
            className="w-[70px]"
            name={`${name}.discount`}
            sizing="sm"
          />
        </td>
        <td className="px-1">
          <Field
            as={TextInput}
            type="text"
            className="w-[70px]"
            name={`${name}.oil`}
            sizing="sm"
          />
        </td>
        <td className="px-6 py-4">
          <FieldArray name={`${name}.jobWorkers`}>
            {({ push, remove }) => (
              <div className="flex flex-col gap-2">
                {values.jobWorkers.map((_, index: number) => (
                  <NewCardWorkersName
                    workers={workers}
                    name={`${name}.jobWorkers[${index}]`}
                    index={index}
                    push={push}
                    remove={remove}
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
