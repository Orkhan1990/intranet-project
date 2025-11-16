import { TextInput, Select, Button } from "flowbite-react";
import { Field, useFormikContext } from "formik";
import { UserInterface } from "../types";

interface WorkersNameInterface {
  workers: UserInterface[];
  name: string;
  index: number;
  push: (v: any) => void;
  remove: (index: number) => void;
  values: any;
}

const NewCardWorkersName = ({
  workers,
  name,
  index,
  push,
  remove,
  values
}: WorkersNameInterface) => {

  const { setFieldValue } = useFormikContext();

  const jobWorkersAvSum = values.jobWorkers.reduce((sum: any, worker: any) => {
    return sum + (Number(worker.workerAv) || 0);
  }, 0);

  // Worker AV dəyişiləndə limit yoxlaması
  const handleAvChange = (e: any) => {
    const newAv = Number(e.target.value);
    const currentAv = Number(values.jobWorkers[index].workerAv);

    const newSum = jobWorkersAvSum - currentAv + newAv;

    if (newSum > values.av) {
      alert("İşçilərin AV cəmi əsas AV-dan çox ola bilməz!");
      return; // dəyişməsin
    }

    setFieldValue(`${name}.workerAv`, newAv);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <Button
          color="blue"
          size="xs"
          onClick={() => index > 0 && remove(index)}
        >
          -
        </Button>

        <div className="flex gap-2 w-[200px]">
          <TextInput
            min={0}
            className="w-[70px]"
            value={values.jobWorkers[index].workerAv}
            onChange={handleAvChange}
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
              workers.map((worker, i) => (
                <option value={worker.id} key={i}>
                  {worker.firstName} {worker.lastName}
                </option>
              ))}
          </Field>
        </div>

        <Button
          color="blue"
          size="xs"
          onClick={() => push({ workerAv: "", workerId: "" })}
          disabled={jobWorkersAvSum >= values.av}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default NewCardWorkersName;
