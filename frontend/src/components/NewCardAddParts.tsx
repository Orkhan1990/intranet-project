import { Table } from "flowbite-react";

const NewCardAddParts = () => {
  const openWarehousePopup = () => {
    window.scrollTo(0, 0);
     alert("Birinci kart yarat!!")
  };
  return (
    <div className="border p-5 rounded-md">
      <h2 className="font-semibold mb-5">Ehtiyyat hissələri</h2>
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

      <div className="flex gap-3 font-semibold mt-5 items-center justify-center">
        <span>Cəmi:</span>
        <span>0 AZN</span>
      </div>
      <div className="flex flex-col gap-1 mt-5 text-blue-700  w-[100px]">
        <div className="hover:underline" onClick={openWarehousePopup}>
          E/h əlavə et (barkod ilə)
        </div>
        <div
          className="hover:underline cursor-pointer"
          onClick={openWarehousePopup}
          color={"blue"}
        >
          E/h əlavə et{" "}
        </div>
      </div>
    </div>
  );
};

export default NewCardAddParts;
