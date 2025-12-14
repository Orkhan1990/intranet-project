import { useEffect, useState } from "react";
import { Liquidity } from "../../enums/projectEnums";
import { BrandInterface } from "../../types";
import { FcOk } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

interface SparePartInterface {
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

const numbers = Array.from({ length: 18 }, (_, i) => i + 1);

const Warehouse = () => {
  const [error, setError] = useState("");
  const [sparePartData, setSparePartData] = useState<SparePartInterface[]>([]);
  const [queryData, setQueryData] = useState({
    code: "",
    origCode: "",
    brand: "",
    name: "",
    count: 0,
    liquidity: "",
    price: 0,
    sellPrice: 0,
    barcode: "",
  });

  console.log(error);

  const zeroCountParts = sparePartData.filter((part) => part.count > 0);

  const filteredData = zeroCountParts.filter((data) => {
    return (
      (queryData.code
        ? data.code.toLowerCase().includes(queryData.code.toLowerCase())
        : true) &&
      (queryData.origCode
        ? data.origCode.toLowerCase().includes(queryData.origCode.toLowerCase())
        : true) &&
      (queryData.brand
        ? data.brand.name.toLowerCase().includes(queryData.brand.toLowerCase())
        : true) &&
      (queryData.name
        ? data.name.toLowerCase().includes(queryData.name.toLowerCase())
        : true) &&
      (queryData.liquidity
        ? data.liquidity
            .toLowerCase()
            .includes(queryData.liquidity.toLowerCase())
        : true) &&
      (queryData.barcode ? data.barcode.includes(queryData.barcode) : true)
    );
  });

  const countAllParts = filteredData.reduce((acc, item) => acc + item.price, 0);
  const countAllSellPrice = filteredData.reduce(
    (acc, item) => acc + item.sellPrice,
    0
  );

  useEffect(() => {
    const getAllSpareParts = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/sparePart/getAllSpareParts",
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        if (!res.ok || data.success === false) {
          setError(data.message);
        } else {
          setSparePartData(data);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    getAllSpareParts();
  }, []);

  const getCreatedDate = (date: Date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setQueryData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Anbar
        </h1>
        <Link to="/importWarehouse">
          <Button color="blue" size="xs">
            Əlavə et +
          </Button>
        </Link>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 sticky top-0">
            <tr>
              {[
                "Orijinal kod",
                "Kod",
                "Brend",
                "Adı",
                "Say",
                "Rezerv",
                "Likvidlik",
                "Qiymət",
                "Satış qiyməti",
                "Barkod",
                "Yerləşmə yeri",
                "Çap",
                "Yaradılma tarixi",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 text-xs sm:text-sm font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
            {/* Filter Row */}
            <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
              {[
                "origCode",
                "code",
                "brand",
                "name",
                "count",
                "",
                "liquidity",
                "price",
                "sellPrice",
                "barcode",
              ].map((field, i) => (
                <td key={i} className="px-4 py-2">
                  {field && (
                    <input
                      id={field}
                      onChange={handleChange}
                      placeholder="Axtar..."
                      className="w-full border rounded-md px-2 py-1 text-xs sm:text-sm dark:bg-gray-800 dark:border-gray-700"
                    />
                  )}
                </td>
              ))}
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr
                  key={index}
                  className="bg-white dark:bg-gray-900 border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-3">{data.origCode}</td>
                  <td className="px-4 py-3">{data.code}</td>
                  <td className="px-4 py-3">{data.brand.name}</td>
                  <td className="px-4 py-3">{data.name}</td>
                  <td className="px-4 py-3 text-center">{data.count}</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">{data.liquidity}</td>
                  <td className="px-4 py-3 text-center">{data.price}</td>
                  <td className="px-4 py-3 text-center">{data.sellPrice}</td>
                  <td className="px-4 py-3">{data.barcode}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <select className="text-xs rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                        <option value="">Rəf</option>
                        {numbers.map((n) => (
                          <option key={n}>{n}</option>
                        ))}
                      </select>
                      <select className="text-xs rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                        <option value="">Yer</option>
                        {numbers.map((n) => (
                          <option key={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="xs" color="blue">
                      Çap et
                    </Button>
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    {data.barcode ? (
                      <FcOk className="w-5 h-5" />
                    ) : (
                      <FaXmark className="text-red-500 w-4 h-4" />
                    )}
                    <span>{getCreatedDate(data.createdAt)}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13} className="text-center py-6 text-gray-500">
                  Məlumat tapılmadı.
                </td>
              </tr>
            )}
            {/* Totals */}
            <tr className="bg-gray-100 dark:bg-gray-800 font-medium">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3 text-center">{countAllParts}</td>
              <td className="px-4 py-3 text-center">{countAllSellPrice}</td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Warehouse;
