import { Button, Table } from "flowbite-react";
import { Field, FieldArray } from "formik";
import { useEffect } from "react";
import { FaMinus } from "react-icons/fa";
import { returnPart } from "../api/allApi";

interface NewCardAddPartsProps {
  values?: any;
  cardPartsPrice?: (price: any) => void;
  cardId?: string;
  setRefreshPage?: React.Dispatch<React.SetStateAction<boolean>>;
  cardData: any;
  paymentType?:string;
}

const NewCardAddParts = ({
  values,
  cardPartsPrice,
  cardId,
  setRefreshPage,
  cardData,
  paymentType
}: NewCardAddPartsProps) => {
  const price =
    values.cardParts?.reduce(
      (acc: any, part: any) =>
        acc +
        (part.usedPrice * part.count -
          part.usedPrice * part.count * (part.discount / 100 || 0)),
      0,
    ) || 0;

  useEffect(() => {
    cardPartsPrice?.(price);
  }, [price, values?.cardParts,cardData?.paymentType]);

  const returnPartToWareHouse = async (partId: any, cardId: any) => {
    try {
      const response = await returnPart(partId, cardId);
      if (response.success) {
        console.log("Part returned to warehouse successfully");
      }
      if (setRefreshPage) {
        setRefreshPage((prev: any) => !prev);
      }
    } catch (error) {
      console.error("Error returning part to warehouse:", error);
    }
  };

  const formatPrice = (value: number) => {
    const truncated = Math.floor(value * 100) / 100; // 2 onluqla kəs
    return Number.isInteger(truncated)
      ? truncated.toString()
      : truncated.toFixed(2);
  };

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

        <FieldArray
          name="cardParts"
          render={() =>
            values?.cardParts?.length > 0
              ? values?.cardParts?.map((part: any, index: number) => (
                  <Table.Body className="divide-y" key={index}>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <Table.Cell className="px-2 py-1">{index + 1}</Table.Cell>

                      <Table.Cell className="px-2 py-1">
                        <Field
                          name={`cardParts.${index}.code`}
                          className="w-full border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          disabled={!cardData?.isOpen}
                          readOnly
                        />
                      </Table.Cell>

                      <Table.Cell className="px-2 py-1">
                        <Field
                          name={`cardParts.${index}.partName`}
                          className="w-full border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          disabled={!cardData?.isOpen}
                          readOnly
                        />
                      </Table.Cell>

                      <Table.Cell className="px-2 py-1 w-20">
                        <Field
                          name={`cardParts.${index}.count`}
                          className="w-full border rounded px-2 py-1 text-sm text-center dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          disabled={!cardData?.isOpen}
                          readOnly
                        />
                      </Table.Cell>

                      <Table.Cell className="px-2 py-1 w-28">
                        <Field
                          name={`cardParts.${index}.usedPrice`}
                          className="w-full border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          disabled={!cardData?.isOpen}
                        />
                      </Table.Cell>

                      <Table.Cell className="px-2 py-1 w-28">
                        <Field
                          name={`cardParts.${index}.discount`}
                          value={part.discount || 0}
                          className="w-full border rounded px-2 py-1 text-sm text-center dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          disabled={!cardData?.isOpen|| paymentType === "internal"}
                        />
                      </Table.Cell>

                      <Table.Cell className="px-2 py-1 w-28">
                        <input
                          type="text"
                          readOnly
                          value={
                            part.usedPrice && part.count
                              ? formatPrice(
                                  part.usedPrice *
                                    part.count *
                                    (1 - (part.discount ?? 0) / 100),
                                )
                              : "0"
                          }
                          className="w-full border rounded px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 dark:text-white text-center"
                        />
                      </Table.Cell>

                      <Table.Cell className="px-2 py-1">
                        {part.date
                          ? new Date(part.date).toLocaleDateString()
                          : ""}
                      </Table.Cell>
                      <Table.Cell className="px-2 py-1">
                        <Button
                          color={"warning"}
                          size={"xs"}
                          onClick={() => returnPartToWareHouse(part.id, cardId)}
                          disabled={!cardData?.isOpen}
                        >
                          <FaMinus />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))
              : null
          }
        />
      </Table>
    </div>
  );
};

export default NewCardAddParts;
