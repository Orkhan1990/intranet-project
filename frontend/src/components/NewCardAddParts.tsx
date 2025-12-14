import { Button, Table } from "flowbite-react";
import { Field, FieldArray } from "formik";
import { useEffect } from "react";
import { FaMinus } from "react-icons/fa";

interface NewCardAddPartsProps {
  values?: any;
  cardPartsPrice: (price: any) => void;
}

const NewCardAddParts = ({ values,cardPartsPrice }: NewCardAddPartsProps) => {

    const price= values.cardParts?.reduce((acc:any, part:any) => 
        acc + (part.soldPrice * part.count - part.soldPrice * part.count * (part.discount / 100 || 0))
    , 0) || 0;  

    useEffect(() => {
        cardPartsPrice(price);
    }, [price, values.cardParts]);

  return (
    <div className="border p-4 md:p-6 rounded-xl shadow-sm bg-white dark:bg-gray-900 overflow-x-auto">
      <Table className="min-w-[700px] md:min-w-full">
        <Table.Head className="bg-gray-100 dark:bg-gray-800 sticky top-0">
          <Table.HeadCell className="px-2 py-1">#</Table.HeadCell>
          <Table.HeadCell>E/h Kod</Table.HeadCell>
          <Table.HeadCell>Ehtiyyat hissə</Table.HeadCell>
          <Table.HeadCell>Say</Table.HeadCell>
          <Table.HeadCell>Qiymət</Table.HeadCell>
          <Table.HeadCell>Endirim %</Table.HeadCell>
          <Table.HeadCell>Toplam</Table.HeadCell>
          <Table.HeadCell>Tarix</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          <FieldArray
            name="cardParts"
            render={() =>
              values?.cardParts?.map((part: any, index: number) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <Table.Cell className="px-2 py-1">{index + 1}</Table.Cell>

                  <Table.Cell className="px-2 py-1">
                    <Field
                      name={`cardParts.${index}.code`}
                      className="w-full border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </Table.Cell>

                  <Table.Cell className="px-2 py-1">
                    <Field
                      name={`cardParts.${index}.partName`}
                      className="w-full border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </Table.Cell>

                  <Table.Cell className="px-2 py-1 w-20">
                    <Field
                      name={`cardParts.${index}.count`}
                      className="w-full border rounded px-2 py-1 text-sm text-center dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </Table.Cell>

                  <Table.Cell className="px-2 py-1 w-28">
                    <Field
                      name={`cardParts.${index}.soldPrice`}
                      className="w-full border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </Table.Cell>

                  <Table.Cell className="px-2 py-1 w-28">
                    <Field
                      name={`cardParts.${index}.discount`}
                      value={part.discount || 0}
                      className="w-full border rounded px-2 py-1 text-sm text-center dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </Table.Cell>

                  <Table.Cell className="px-2 py-1 w-28">
                    <input
                      type="text"
                      readOnly
                      value={(
                        part.soldPrice * part.count -
                        part.soldPrice * part.count * (part.discount / 100 || 0)
                      )}  
                      className="w-full border rounded px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 dark:text-white text-center"
                    />
                  </Table.Cell>

                  <Table.Cell className="px-2 py-1">
                    {new Date(part.date).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="px-2 py-1">
                    <Button color={"warning"} size={"xs"}>
                      <FaMinus />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          />
        </Table.Body>
      </Table>
    </div>
  );
};

export default NewCardAddParts;
