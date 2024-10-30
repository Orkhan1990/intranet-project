import { Button, Checkbox, Table } from "flowbite-react"

const Suppliers = () => {
  return (
    <div className="min-h-screen mt-[100px] mb-[100px]">
        <h2 className='text-center font-semibold'>Təchizatçılar</h2>
        
        <Table hoverable className="mt-40 h-full">
        <Table.Head>
          <Table.HeadCell className="p-4">
            Təchizatçı
          </Table.HeadCell>
          <Table.HeadCell>Ölkə</Table.HeadCell>
          <Table.HeadCell>Əlaqədar şəxs</Table.HeadCell>
          <Table.HeadCell>Telefon</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Ödəniş üsulu</Table.HeadCell>
          <Table.HeadCell>Çatdırılma növü</Table.HeadCell>
          <Table.HeadCell>Çatdırılma vaxtı</Table.HeadCell>
          <Table.HeadCell>Kredit xətti</Table.HeadCell>
          <Table.HeadCell>Borc</Table.HeadCell>
          <Table.HeadCell>Kredit qeydiyyatı</Table.HeadCell>
          <Table.HeadCell>Kredit müddəti</Table.HeadCell>
          <Table.HeadCell>#</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Bax
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
       <Button color={"blue"} className="mt-10">Yeni təchizatçı əlavə et</Button>
        </div>
  )
}

export default Suppliers