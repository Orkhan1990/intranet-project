import { Button,TextInput } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Field } from "formik";
import { OrderPartsInterface } from "../types";

interface OrderPartsComponentInterface {
  name: string;
  index: number;
  value: OrderPartsInterface;
  deletePart: (index: number) => void;
}

const OrderPartsComponent = ({
  index,
  name,
  deletePart,
  value,
}: OrderPartsComponentInterface) => {
  return (
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4">
          <span>{index + 1}</span>
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-2 items-center">
            <Field
              as={TextInput}
              type="text"
              name={`${name}.partNumber`}
              sizing="sm"
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <Field
            as={TextInput}
            type="text"
            name={`${name}.count`}
            sizing="sm"
            className="w-20"
            value={value.count}
          />
        </td>

        <td className="px-6 py-4"></td>

        <td className="px-6 py-4">
          <Field
            as={TextInput}
            type="text"
            name={`${name}.partName`}
            sizing="sm"
            className="w-60"
          />
        </td>
        <td>
          <Button
            className="text-white bg-red-600 hover:!bg-red-800 "
            size={"xs"}
            onClick={() => deletePart(index)}
          >
            <FaRegTrashAlt />
          </Button>
        </td>
      </tr>
    </tbody>
  );
};

export default OrderPartsComponent;
