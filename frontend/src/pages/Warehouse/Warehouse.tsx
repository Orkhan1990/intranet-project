import { useEffect, useState } from "react";
import { Liquidity } from "../../enums/projectEnums";
import { BrandInterface } from "../../types";
import { FcOk } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";

interface SparePartInterafce {
  code: string;
  origCode: string;
  name: string;
  brand: BrandInterface;
  liquidity: Liquidity;
  count: number;
  price: number;
  sellPrice: number;
  barcode: string;
  createdAt: Date;
}

const Warehouse = () => {
  const [error, setError] = useState("");
  const [sparePartData, setSparePartData] = useState<SparePartInterafce[]>([]);
  useEffect(() => {
    const getAllInvoice = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/sparePart/getAllSpareParts",
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log(data);

        if (!res.ok || data.success === false) {
          setError(data.message);
        } else {
          setSparePartData(data);
        }
      } catch (error: any) {
        setError(error);
      }
    };

    getAllInvoice();
  }, []);

  const getCreatedDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB");
  };
  return (
    <div className="min-h-screen relative overflow-x-auto">
      <form>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Orijinal kod
              </th>
              <th scope="col" className="px-6 py-3">
                Kod
              </th>
              <th scope="col" className="px-6 py-3">
                Brend
              </th>
              <th scope="col" className="px-6 py-3">
                Adı
              </th>
              <th scope="col" className="px-6 py-3">
                Say
              </th>
              <th scope="col" className="px-6 py-3">
                Rezerv
              </th>
              <th scope="col" className="px-6 py-3">
                Likvidlik
              </th>
              <th scope="col" className="px-6 py-3">
                Qiymət
              </th>
              <th scope="col" className="px-6 py-3">
                Satış qiyməti
              </th>
              <th scope="col" className="px-6 py-3">
                Barkod
              </th>
              <th scope="col" className="px-6 py-3">
                Yerləşmə yeri
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Yaradılma tarixi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <input className="border w-24" />
              </td>
              <td className="px-6 py-4">
                <input className="border w-24" />
              </td>
              <td className="px-6 py-4">
                <input className="border w-24" />
              </td>
              <td className="px-6 py-4">
                <input className="border w-24" />
              </td>
              <td className="px-6 py-4">
                <input className="border w-20" />
              </td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">
                <input className="border w-24" />
              </td>
              <td className="px-6 py-4">
                <input className="border w-24" />
              </td>
              <td className="px-6 py-4">
                <input className="border w-24" />
              </td>
              <td className="px-6 py-4">
                <input className="border w-24" />
              </td>
            </tr>
            {sparePartData.length > 0 &&
              sparePartData.map((data: SparePartInterafce, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{data.code}</td>
                  <td className="px-6 py-4">{data.origCode}</td>
                  <td className="px-6 py-4">{data.brand.name}</td>
                  <td className="px-6 py-4">{data.name}</td>
                  <td className="px-6 py-4">{data.count}</td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4">{data.liquidity}</td>
                  <td className="px-6 py-4">{data.price}</td>
                  <td className="px-6 py-4">{data.sellPrice}</td>
                  <td className="px-6 py-4">{data.barcode}</td>
                  <td className="px-6 py-4">{data.barcode}</td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span>{data.barcode ? <FcOk /> : <FaXmark />}</span>
                      <span>{getCreatedDate(data.createdAt)}</span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Warehouse;
