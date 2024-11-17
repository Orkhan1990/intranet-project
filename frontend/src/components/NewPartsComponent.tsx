import { Button, Select,TextInput } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Field } from "formik";
import { Liquidity } from "../enums/projectEnums";
import { BrandInterface } from "../types";




interface NewPartInterface {
  name: string;
  index: number;
  deletePart:(index:number)=>void
  brands:BrandInterface[]
}
const NewPartsComponent = ({ name, index,deletePart,brands }: NewPartInterface) => {
  return (
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4">
          <span>{index + 1}</span>
        </td>

        <td className="px-1 py-4">
            <Field
              as={TextInput}
              type="text"
              name={`${name}.kod`}
              sizing="sm"
            />
        </td>

        <td className="px-1 py-4">
          <Field
            as={TextInput}
            type="text"
            name={`${name}.origKod`}
            sizing="sm"
          />
        </td>

        <td className="px-1 py-4">
          <Field as={TextInput} type="text" name={`${name}.nameParts`} sizing="sm" />
        </td>

        <td className="px-1 py-4">
          <Field as={Select} type="text" name={`${name}.brand`} sizing="sm">
            {
              brands.length>0&&brands.map((item:BrandInterface,index:number)=>(
                <option value={item.id} key={index}>{item.name}</option>
              ))
            }
          </Field>
        </td>

        <td >
          <Field as={Select} type="text" name={`${name}.liquidity`} sizing="sm">
            <option value={Liquidity.Fast}>Təcili</option>
            <option value={Liquidity.Normal}>Normal</option>
            <option value={Liquidity.Slow}>Gec</option>
          </Field>
        </td>

        <td className="px-3 py-4">
          <Field
            as={TextInput}
            type="text"
            name={`${name}.count`}
            sizing="sm"
            className="w-14"
          />
        </td>

        <td className="px-3 py-4">
          <Field
            as={TextInput}
            type="text"
            name={`${name}.price`}
            sizing="sm"
            className="w-20"
          />
        </td>

        <td className="px-3 py-4">
          <Field
            as={TextInput}
            type="text"
            name={`${name}.salesPrice`}
            sizing="sm"
            className="w-20"
          />
        </td>
        <td className="px-3 py-4">
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

export default NewPartsComponent;
