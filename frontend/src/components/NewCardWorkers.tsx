import { TextInput } from "flowbite-react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import NewCardWorkersName from "./NewCardWorkersName";
import { Field, FieldArray } from "formik";
import { UserInterface } from "../types";
import { useEffect } from "react";

interface CardWorkersInterface {
  workers: UserInterface[];
  values: any;
  name: string;
  jobWorkerPrice: (price: any) => void;
  cardData?:any
}

const NewCardWorkers = ({
  workers,
  values,
  name,
  jobWorkerPrice,
  cardData
}: CardWorkersInterface) => {
  const discountPrice = (values.av || 0) * 50 * (1 - (values.discount || 0) / 100);
  useEffect(() => {
    jobWorkerPrice(discountPrice);
  }, [discountPrice, values.av, values.discount]);


  const price =(values.av || 0) * 50 ;

  console.log({values});
  

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
            disabled={cardData&&!cardData?.isOpen}
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
              disabled={cardData&&!cardData?.isOpen}
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
            disabled={cardData&&!cardData?.isOpen}
          />
        </td>
        <td className="px-1">
          <TextInput
            type="text"
            className="w-[100px]"
            readOnly
            value={price}
            sizing="sm"
            disabled={cardData&&!cardData?.isOpen}
          />
        </td>
        <td className="px-6">
          <Field
            as={TextInput}
            type="text"
            className="w-[70px]"
            name={`${name}.discount`}
            sizing="sm"
            disabled={cardData&&!cardData?.isOpen}
          />
        </td>
        <td className="px-1">
          <Field
            as={TextInput}
            type="text"
            className="w-[70px]"
            name={`${name}.oil`}
            sizing="sm"
            disabled={cardData&&!cardData?.isOpen}
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
