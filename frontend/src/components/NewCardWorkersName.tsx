import { TextInput, Select, Button } from "flowbite-react";
import { Field } from "formik";
import { UserInterface } from "../types";

interface WorkersNameInterface {
  workers: UserInterface[];
  name: string;
  index: number;
  push: ({}) => void;
  remove: (index: number) => void;
}

const NewCardWorkersName = ({
  workers,
  name,
  index,
  push,
  remove,
}: WorkersNameInterface) => {
  return (
    <div className=" flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <Button color={"blue"} size={"xs"} onClick={() => index > 0 && remove(index)}>
          -
        </Button>
        <div className="flex gap-2 w-[200px]">
          <Field
            as={TextInput}
            type="text"
            className="w-[70px]"
            name={`${name}.workerAv`}
            sizing="sm"
          />
          <Field
            as={Select}
            className="w-[250px]"
            name={`${name}.workerId`}
            sizing="sm"
          >
            <option value="">İşçilər</option>
            {workers &&
              workers.map((worker, index) => (
                <option value={worker.id} key={index}>
                  {worker.firstName + " " + worker.lastName}
                </option>
              ))}
          </Field>
        </div>

        <Button
          color={"blue"}
          onClick={() => push({ workerAv: "", workerId: "" })}
          size={"xs"}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default NewCardWorkersName;
