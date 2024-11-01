import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SupplierInterface } from "../types";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const Suppliers = () => {
  const [error, setError] = useState("");
  const [suppliersList, setSupplierList] = useState([]);

  console.log(suppliersList);
  

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/supplier/getSuppliers",
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (!res.ok || data.success === false) {
          setError(data.message);
        }
        setSupplierList(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    getSuppliers();
  }, []);

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
            <th scope="col" className="px-6 py-3 text-center">
              Telefon
            </th>
            <th scope="col" className="px-6 py-3 text-center">
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
            <th scope="col" className="py-4 px-2">
              #
            </th>
          </tr>
        </thead>
        <tbody>
          {suppliersList.map((item: SupplierInterface, index: number) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4 text-center">{item.supplier}</td>
              <td className="px-6 py-4 text-center">{item.country}</td>
              <td className="px-6 py-4 text-center">{item.contactPerson}</td>
              <td className="px-6 py-4 text-center">{item.phone}</td>
              <td className="px-6 py-4 text-center">{item.email}</td>
              <td className="px-6 py-4 text-center">{item.paymentType}</td>
              <td className="px-6 py-4 text-center">{item.deliverType}</td>
              <td className="px-6 py-4 text-center">{item.deliverPeriod}</td>
              <td className="px-6 py-4 text-center">{item.creditLine}</td>
              <td className="px-6 py-4 text-center">0</td>
              <td className="px-6 py-4 text-center">{item.creditNote}</td>
              <td className="px-6 py-4 text-center">{item.creditDuration}</td>
              <Link to="">
              <td className="py-4 px-2 text-blue-700 pt-5"><FaRegEdit /></td>
            </Link>
              <td className="py-4 px-2 text-red-700"><FaRegTrashAlt /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/newSuppliers">
        <Button color={"blue"} className="mt-10 flex gap-5 ml-5">
          Əlavə et
          <span className="ml-2">+</span>
        </Button>
      </Link>
    </div>
  );
};

export default Suppliers;
