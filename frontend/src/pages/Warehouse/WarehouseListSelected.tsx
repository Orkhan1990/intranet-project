import { useEffect, useState } from "react";
import { Liquidity } from "../../enums/projectEnums";
import { BrandInterface } from "../../types";
import { FcOk } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { Button } from "flowbite-react";
import { addToCard } from "../../api/allApi";
import { useParams } from "react-router-dom";

interface SparePartInterface {
  id: string;
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

const WarehouseListSelected = () => {
  const [error, setError] = useState("");
  const [sparePartData, setSparePartData] = useState<SparePartInterface[]>([]);
  const [selectedPartId, setSelectedPartId] = useState<string>("");
  const [selectedCount, setSelectedCount] = useState<number>(1);

  const { id } = useParams();

  console.log(selectedPartId, error);
  console.log(selectedCount);

  const [queryData, setQueryData] = useState({
    code: "",
    origCode: "",
    brand: "",
    name: "",
    liquidity: "",
    barcode: "",
  });

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

  const handleChangeFilter = (e: any) => {
    const { id, value } = e.target;
    setQueryData((prev) => ({ ...prev, [id]: value }));
  };

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

  const getCreatedDate = (date: Date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleAddToCart = async (cardId: any) => {
    try {
      if (!selectedPartId) {
        alert("Zəhmət olmasa məhsulu seçin!");
        return;
      }

      if (!selectedCount || selectedCount < 1) {
        alert("Say minimum 1 olmalıdır!");
        return;
      }

      const selectedItem = sparePartData.find(
        (item) => item.id === selectedPartId
      );
      if (!selectedItem) {
        alert("Seçilmiş məhsul tapılmadı!");
        return;
      }

      if (selectedCount > selectedItem.count) {
        alert(`Anbarda yalnız ${selectedItem.count} ədəd mövcuddur!`);
        return;
      }

      // Backend-ə istək göndəririk
      const res = await addToCard(selectedPartId, selectedCount, cardId);

      if (res.success) {
        if (window.opener) {
          window.opener.postMessage(
            {
              type: "CARD_PART_ADDED",
              cardId: cardId,
            },
            window.location.origin
          );
        }

        window.close();
      } else {
        alert(`Xəta: ${res.message || "Əlavə etmək mümkün olmadı"}`);
      }
    } catch (err: any) {
      console.error("Add to card error:", err);
      alert("Əlavə edərkən xəta baş verdi!");
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Anbar
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
            <tr>
              {[
                "Seç",
                "Say",
                "Orijinal kod",
                "Kod",
                "Brend",
                "Adı",
                "Mövcud say",
                "Likvidlik",
                "Qiymət",
                "Satış qiyməti",
                "Barkod",
                "Rəf",
                "Yer",
                "Çap",
                "Yaradılma tarixi",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 text-xs sm:text-sm font-medium text-center"
                >
                  {header}
                </th>
              ))}
            </tr>

            {/* Filter Row */}
            <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
              {[
                "", // Seç
                "", // Say
                "origCode",
                "code",
                "brand",
                "name",
                "", // Mövcud say
                "liquidity",
                "price",
                "sellPrice",
                "barcode",
              ].map((field, i) => (
                <td key={i} className="px-2 py-2">
                  {field && (
                    <input
                      id={field}
                      onChange={handleChangeFilter}
                      placeholder="Axtar..."
                      className="w-full border rounded-md px-2 py-1 text-xs sm:text-sm dark:bg-gray-800 dark:border-gray-700"
                    />
                  )}
                </td>
              ))}
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white dark:bg-gray-900 border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-3 text-center">
                    <input
                      type="radio"
                      name="selectedProduct"
                      className="w-4 h-4"
                      checked={selectedPartId === item.id}
                      onChange={() => {
                        setSelectedPartId(item.id);
                        setSelectedCount(1);
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      min={1}
                      max={item.count}
                      value={selectedPartId === item.id ? selectedCount : 1}
                      onChange={(e) =>
                        setSelectedCount(
                          Math.min(item.count, Number(e.target.value))
                        )
                      }
                      className="w-12 text-center border rounded-md px-1 py-1 text-xs"
                      disabled={selectedPartId !== item.id}
                    />
                  </td>
                  <td className="px-4 py-3">{item.origCode}</td>
                  <td className="px-4 py-3">{item.code}</td>
                  <td className="px-4 py-3">{item.brand.name}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-center">{item.count}</td>
                  <td className="px-4 py-3 text-center">{item.liquidity}</td>
                  <td className="px-4 py-3 text-center">{item.price}</td>
                  <td className="px-4 py-3 text-center">{item.sellPrice}</td>
                  <td className="px-4 py-3 text-center">
                    {item.barcode ? (
                      <FcOk className="mx-auto" />
                    ) : (
                      <FaXmark className="text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <select className="text-xs rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                      <option value="">Rəf</option>
                      {numbers.map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select className="text-xs rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                      <option value="">Yer</option>
                      {numbers.map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="xs" color="blue">
                      Çap et
                    </Button>
                  </td>
                  <td className="px-4 py-3">
                    {getCreatedDate(item.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={15} className="text-center py-6 text-gray-500">
                  Məlumat tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <Button color="green" onClick={() => handleAddToCart(id)}>
          Seçilmiş məhsulu əlavə et
        </Button>
      </div>
    </div>
  );
};

export default WarehouseListSelected;
