import { Select, Table, TextInput } from "flowbite-react";
import { Field } from "formik";
import { Liquidity } from "../enums/projectEnums";

interface NewPartInterface {
  name: string;
  index: number;
}
const NewPartsComponent = ({ name,index }: NewPartInterface) => {
  return (
    <Table.Body>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          <span>{index + 1}</span>
        </Table.Cell>

        <Table.Cell>
          <div className="flex gap-2 items-center">
            <Field
              as={TextInput}
              type="text"
              name={`${name}.kod`}
              sizing="sm"
            />
          </div>
        </Table.Cell>

        <Table.Cell>
          <Field
            as={TextInput}
            type="text"
            name={`${name}.origKod`}
            sizing="sm"
          />
        </Table.Cell>

        <Table.Cell>
          <TextInput type="text" name={`${name}.nameParts`} sizing="sm" />
        </Table.Cell>

        <Table.Cell>
          <Field
            as={Select}
            type="text"
            name={`${name}.brand`}
            sizing="sm"
          >
            <option value="man">Man</option>
            <option value="bobcat">Bobcat</option>
            <option value="sumitomo">Sumitomo</option>
          </Field>
        </Table.Cell>

        <Table.Cell>
          <Field
            as={Select}
            type="text"
            name={`${name}.liquidity`}
            sizing="sm"
          >
            <option value={Liquidity.Fast}>Təcili</option>
            <option value={Liquidity.Normal}>Normal</option>
            <option value={Liquidity.Slow}>Gec</option>

          </Field>
        </Table.Cell>

        <Table.Cell>
          <Field
            as={TextInput}
            type="text"
            name={`${name}.count`}
            sizing="sm"
            className="w-14"
          />
        </Table.Cell>

        <Table.Cell>
          <Field
            as={TextInput}
            type="text"
            name={`${name}.price`}
            sizing="sm"
            className="w-20"
          />
        </Table.Cell>

        <Table.Cell>
          <Field
            as={TextInput}
            type="text"
            name={`${name}.salesPrice`}
            sizing="sm"
            className="w-20"

          />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};

export default NewPartsComponent;
