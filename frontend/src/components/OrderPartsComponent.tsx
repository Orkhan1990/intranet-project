import { Button,TextInput } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Field } from "formik";
import { OrderPartsInterface } from "../types";
import { FaUnlock } from "react-icons/fa";


interface OrderPartsComponentInterface {
  name: string;
  index: number;
  value: OrderPartsInterface;
  deletePart: (id: number) => void;
}

const OrderPartsComponent = ({
  index,
  name,
  deletePart,
  value,

}: OrderPartsComponentInterface) => {
 
  const isStockAvailable = value.checkOnWarehouse;
  console.log(isStockAvailable,"isStockAvailable");
  console.log(value,"value");
  
  

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
              name={`${name}.origCode`}
              value={value.origCode}
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
        <td className="px-6 py-4">
          {
            isStockAvailable ? (<div className="flex gap-2"><FaUnlock className="text-green-500 cursor-pointer"/><span className="text-black">{value.stockQuantity}</span></div>):("")
          }
        </td>

        <td className="px-6 py-4">
          <Field
            as={TextInput}
            type="text"
            name={`${name}.partName`}
            sizing="sm"
            className="w-60"
            value={value.partName}

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
