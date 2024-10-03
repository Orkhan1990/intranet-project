import { Table,TextInput } from "flowbite-react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import NewCardWorkersName from "./NewCardWorkersName";
import { Field, FieldArray } from "formik";
import {  NewCardJobsInterface, UserInterface } from "../types";



interface CardWorkersInterface{
    workers:UserInterface[],
    values:NewCardJobsInterface,
    name:string
}


const NewCardWorkers = ({ workers, values, name }:CardWorkersInterface) => {
  return (
    <Table.Body>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          <Field
            as={TextInput}
            type="text"
            className="w-[200px]"
            name={`${name}.code`}
          />
        </Table.Cell>
        <Table.Cell>
          <div className="flex gap-2 items-center">
            <Field
              as={TextInput}
              type="text"
              className="w-[300px]"
              name={`${name}.name`}
            />
            <Link to="">
              <FaArrowAltCircleUp className="text-2xl text-green-600" />
            </Link>
          </div>
        </Table.Cell>
        <Table.Cell>
          <Field
            as={TextInput}
            type="text"
            className="w-[60px]"
            name={`${name}.av`}
          />
        </Table.Cell>
        <Table.Cell>
          <Field
            as={TextInput}
            type="text"
            className="w-[100px]"
          />
        </Table.Cell>
        <Table.Cell>
          <Field
            as={TextInput}
            type="text"
            className="w-[70px]"
            name={`${name}.discount`}
          />
        </Table.Cell>
        <Table.Cell>
          <Field
            as={TextInput}
            type="text"
            className="w-[70px]"
            name={`${name}.oil`}
          />
        </Table.Cell>
        <Table.Cell>
          <FieldArray name={`${name}.jobWorkers`}>
            {({ push, remove }) => (
              <div className="flex flex-col gap-2">
                {values.jobWorkers.map((_, index:number) => (
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
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};

export default NewCardWorkers;
