import { Table } from "flowbite-react";

const NewCardAddParts = () => {

  return (
    <div className="border p-5 rounded-md">
      <Table>
        <Table.Head>
          <Table.HeadCell>E/h Kod</Table.HeadCell>
          <Table.HeadCell>Ehtiyyat hissə</Table.HeadCell>
          <Table.HeadCell>Say</Table.HeadCell>
          <Table.HeadCell>Qiymət</Table.HeadCell>
          <Table.HeadCell>Endirim</Table.HeadCell>
          <Table.HeadCell>Toplam</Table.HeadCell>
          <Table.HeadCell>Tarix</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"></Table.Row>
        </Table.Body>
      </Table>

    </div>
  );
};

export default NewCardAddParts;
