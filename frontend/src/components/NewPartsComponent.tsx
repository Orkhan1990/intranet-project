import { Button, Select, TextInput } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Field } from "formik";
import { Liquidity } from "../enums/projectEnums";
import { BrandInterface } from "../types";

interface NewPartInterface {
  name: string;
  index: number;
  deletePart: (index: number) => void;
  brands: BrandInterface[];
}

const NewPartsComponent = ({ name, index, deletePart, brands }: NewPartInterface) => {
  return (
    <tbody className="w-full">
      <tr
        className="bg-white border-b hover:bg-gray-50 transition-colors 
        text-center text-sm text-gray-700"
      >
        {/* Index */}
        <td className="px-3 py-2 font-medium text-gray-600">{index + 1}</td>

        {/* Kod */}
        <td className="px-2 py-2 min-w-[100px]">
          <Field
            as={TextInput}
            type="text"
            name={`${name}.kod`}
            sizing="sm"
            placeholder="Kod"
            className="w-full"
          />
        </td>

        {/* Original Kod */}
        <td className="px-2 py-2 min-w-[120px]">
          <Field
            as={TextInput}
            type="text"
            name={`${name}.origKod`}
            sizing="sm"
            placeholder="Original Kod"
            className="w-full"
          />
        </td>

        {/* Part Name */}
        <td className="px-2 py-2 min-w-[180px]">
          <Field
            as={TextInput}
            type="text"
            name={`${name}.nameParts`}
            sizing="sm"
            placeholder="Ehtiyat hissə adı"
            className="w-full"
          />
        </td>

        {/* Brand */}
        <td className="px-2 py-2 min-w-[140px]">
          <Field
            as={Select}
            name={`${name}.brand`}
            sizing="sm"
            className="w-full"
          >
            {brands.length > 0 ? (
              brands.map((item: BrandInterface, index: number) => (
                <option value={item.id} key={index}>
                  {item.name}
                </option>
              ))
            ) : (
              <option value="">Brend yoxdur</option>
            )}
          </Field>
        </td>

        {/* Liquidity */}
        <td className="px-2 py-2 min-w-[120px]">
          <Field as={Select} name={`${name}.liquidity`} sizing="sm" className="w-full">
            <option value={Liquidity.Fast}>Təcili</option>
            <option value={Liquidity.Normal}>Normal</option>
            <option value={Liquidity.Slow}>Gec</option>
          </Field>
        </td>

        {/* Count */}
        <td className="px-2 py-2 min-w-[80px]">
          <Field
            as={TextInput}
            type="number"
            name={`${name}.count`}
            sizing="sm"
            placeholder="Say"
            className="w-full text-center"
          />
        </td>

        {/* Price */}
        <td className="px-2 py-2 min-w-[100px]">
          <Field
            as={TextInput}
            type="number"
            name={`${name}.price`}
            sizing="sm"
            placeholder="Qiymət"
            className="w-full text-center"
          />
        </td>

        {/* Sales Price */}
        <td className="px-2 py-2 min-w-[110px]">
          <Field
            as={TextInput}
            type="number"
            name={`${name}.salesPrice`}
            sizing="sm"
            placeholder="Satış"
            className="w-full text-center"
          />
        </td>

        {/* Delete Button */}
        <td className="px-3 py-2 text-center">
          <Button
            color="failure"
            size="xs"
            className="!p-1.5 rounded-md hover:scale-105 transition-transform"
            onClick={() => deletePart(index)}
            aria-label="Sil"
          >
            <FaRegTrashAlt />
          </Button>
        </td>
      </tr>
    </tbody>
  );
};

export default NewPartsComponent;
