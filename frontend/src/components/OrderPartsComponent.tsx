import { Button,Table, TextInput } from "flowbite-react"
import { FaRegTrashAlt } from "react-icons/fa";
import { Field } from "formik"
import { OrderPartsInterface } from "../types";



interface OrderPartsComponentInterface{
    name:string,
    index:number,
    value:OrderPartsInterface
    deletePart:(index:number)=>void
}



const OrderPartsComponent = ({index,name,deletePart,value}:OrderPartsComponentInterface) => {
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
          className="w-20"
          value={value.count}

        />
      </Table.Cell>

      <Table.Cell>
        <span></span>
      </Table.Cell>

      <Table.Cell>
        <Field
          as={TextInput}
          type="text"
          name={`${name}.price`}
          sizing="sm"
          className="w-60"
        />
      </Table.Cell>

      <Table.Cell>
       <Button className="text-white bg-red-600 hover:!bg-red-800 "  size={"xs"} onClick={()=>deletePart(index)}><FaRegTrashAlt /></Button>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
  )
}

export default OrderPartsComponent