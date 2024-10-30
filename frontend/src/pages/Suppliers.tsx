import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Suppliers = () => {
  return (
    <div className="min-h-screen mt-[100px] mb-[100px]">
      <h2 className="text-center text-lg font-semibold">Təchizatçılar</h2>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-20">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Təchizatçı
            </th>
            <th scope="col" className="px-6 py-3">
              Ölkə
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Əlaqədar şəxs
            </th>
            <th scope="col" className="px-6 py-3">
              Telefon
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Ödəniş üsulu
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Çatdırılma növü
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Çatdırılma vaxtı
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Kredit xətti
            </th>
            <th scope="col" className="px-6 py-3">
              Borc
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Kredit qeydiyyatı
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Kredit müddəti
            </th>
            <th scope="col" className="py-4 px-2">
              #
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <Link to="">
            <td className="py-4 px-2 text-blue-700">Bax</td>
            </Link>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4">$1999</td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">$99</td>
          </tr>
        </tbody>
      </table>

      <Link to="/newSuppliers">
      <Button color={"blue"} className="mt-10 flex gap-5 ml-5">
        Əlavə et
        <span className="ml-2">
          +
        </span>
      </Button>
      </Link>
    </div>
  );
};

export default Suppliers;
