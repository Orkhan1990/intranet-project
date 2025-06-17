import React, { useEffect, useState } from "react";
import { EditOrderInterface } from "../types";
import { TextInput } from "flowbite-react";

interface AfterCalculationOrderPartsInterface {
  orderInitialValue: EditOrderInterface;
}

export const AfterCalculationOrderPartsComponent = ({
  orderInitialValue,
}: AfterCalculationOrderPartsInterface) => {
  const [orderPartsIds, setOrderPartsIds] = useState<any[]>([]);
  const [supplierOrderParts, setSupplierOrderParts] = useState<any[]>([]);
  const [error, setError] = useState("");

  // console.clear();
  
  // console.log({supplierOrderParts});
  

  useEffect(() => {
    if (orderInitialValue.orderParts) {
      const ids = orderInitialValue.orderParts.map((item) => item.id);
      setOrderPartsIds(ids);
    }
  }, [orderInitialValue]);

  useEffect(() => {
    if (orderPartsIds.length > 0) {
      const fetchSupplierOrderParts = async () => {
        try {
          const queryParams = new URLSearchParams({
            orderPartIds: orderPartsIds.join(","),
          });

          const res = await fetch(
            `http://localhost:3013/api/v1/orderPart/getSupplierOrderPartsData?${queryParams}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          console.clear();
          console.log({data});
          
          if (!res.ok || data.success === false) {
            setError(data.message || "Error fetching supplier order parts");
            return;
          }
          setSupplierOrderParts(data);
        } catch (err: any) {
          setError(err.message || "Network error");
        }
      };

      fetchSupplierOrderParts();
    }
  }, [orderPartsIds]);

  const defineDeliverType = (delivering: string) => {
    switch (delivering) {
      case "təcili":
        return <span> (7-15 gün)</span>;
      case "normal":
        return <span> (15-30 gün)</span>;
      case "planlaşdırılmış":
        return <span> (40-60 gün)</span>;
      default:
        return null;
    }
  };

  // Group supplierOrderParts by supplier
  const supplierGroups = supplierOrderParts.reduce((acc: any, part: any) => {
    const supplierId = part.supplier.id;
    if (!acc[supplierId]) {
      acc[supplierId] = {
        supplier: part.supplier,
        delivering: part.delivering,
        isTheBestSupplier: part.isTheBestSupplier,
        parts: [],
      };
    }
    acc[supplierId].parts.push(part);
    return acc;
  }, {});

  // Get unique parts (by orderPart)
  const uniqueParts = orderInitialValue.orderParts.map((part) => ({
    id: part.id,
    origCode: part.origCode,
    count: part.count,
    partName: part.partName,
  }));

  return (
    <table className="w-full border p-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      {/* Headers */}
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="px-6 py-3">№</th>
          <th className="px-6 py-3">DETALIN NÖMRƏSİ</th>
          <th className="px-6 py-3">SAYI</th>
          <th className="px-6 py-3">ANBARDA VARMI</th>
          <th className="px-6 py-3">DETALIN ADI</th>
          {Object.values(supplierGroups).map((group: any, index: number) => (
            <th key={index} colSpan={3} className="  text-white border border-black ">
              <div>
                <div className={`${group.isTheBestSupplier?"bg-green-700":"bg-red-700"} h-14 text-center flex items-center justify-center`}>{group.supplier.supplier}
                {defineDeliverType(group.delivering)}
                </div>
                
              </div>
            </th>
          ))}
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          {Object.values(supplierGroups).map((_, index: number) => (
            <React.Fragment key={index}>
              <th className="border-l border-black px-6 py-3">MAYA DƏYƏRİ</th>
              <th className="px-6 py-3">SATIŞ DƏYƏRİ</th>
              <th className="border-r-2 border-black px-6 py-3">ÜMUMİ SATIŞ DƏYƏRİ</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>

      {/* Body */}
      <tbody>
        {uniqueParts.map((part, rowIndex) => (
          <tr key={rowIndex}>
            <td className="px-6 py-3">{rowIndex + 1}</td>
            <td className="px-6 py-3">
              <TextInput value={part.origCode} readOnly sizing="sm" className="w-32" />
            </td>
            <td className="px-6 py-3">
              <TextInput value={part.count} readOnly sizing="sm" className="w-20" />
            </td>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3">
              <TextInput value={part.partName} readOnly sizing="sm" className="w-32" />
            </td>

            {Object.values(supplierGroups).map((group: any, index: number) => {
              const supplierPart = group.parts.find(
                (p: any) => p.orderPart.id === part.id
              );

              return (
                <React.Fragment key={index}>
                  <td className="px-6 py-3">
                    <TextInput
                      value={supplierPart ? supplierPart.price : ""}
                      readOnly
                      sizing="sm"
                      className="w-20"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <TextInput
                      value={supplierPart ? supplierPart.unitSellPrice : ""}
                      readOnly
                      sizing="sm"
                      className="w-20"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <TextInput
                      value={supplierPart ? supplierPart.sellPrice : ""}
                      readOnly
                      sizing="sm"
                      className="w-20"
                    />
                  </td>
                </React.Fragment>
              );
            })}
          </tr>
        ))}

        {/* Footer sums */}
        <tr>
          <td colSpan={5}></td>
          {Object.values(supplierGroups).map((group: any, index: number) => {
            const total = group.parts.reduce(
              (sum: number, part: any) => sum + (Number(part.sellPrice) || 0),
              0
            );
            return (
              <React.Fragment key={index}>
                <td></td>
                <td className="px-6 py-3 font-bold text-black">{total.toFixed(2)}</td>
                <td></td>
              </React.Fragment>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};
