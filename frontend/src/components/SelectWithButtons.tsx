import { Button, Select } from "flowbite-react";
import { Field } from "formik";
import { UserInterface } from "../types";

interface SelectWithButtonsInterface {
  serviceWorkers: UserInterface[];
  name: string;
  value: string;
  onChange: (event: any) => void;
  index: number;
  push: (value: string) => void;
  remove: (index: number) => void;
  cardData: any;
}

const SelectWithButtons = ({
  serviceWorkers,
  name,
  value,
  onChange,
  push,
  remove,
  index,
  cardData,
}: SelectWithButtonsInterface) => {
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  console.log({ serviceWorkers });

  return (
    <div className="flex gap-2">
      {index > 0 && (
        <Button
          color={"blue"}
          onClick={() => remove(index)}
          size={"xs"}
          disabled={cardData&&cardData?.isOpen}
        >
          -
        </Button>
      )}

      <Field
        as={Select}
        name={name}
        value={value}
        className="w-[250px]"
        onChange={handleChange}
        sizing="sm"
        disabled={cardData&&cardData?.isOpen}
      >
        <option value="">İsciler</option>
        {serviceWorkers?.map((worker, i) => (
          <option value={worker.id} key={i}>
            {worker.firstName} {worker.lastName}
          </option>
        ))}
      </Field>

      <Button
        color={"blue"}
        onClick={() => push("")}
        size={"xs"}
        disabled={cardData&&cardData?.isOpen}
      >
        +
      </Button>
    </div>
  );
};

export default SelectWithButtons;
