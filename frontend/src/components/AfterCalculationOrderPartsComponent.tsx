import React, { useEffect, useState } from "react";
import { EditOrderInterface } from "../types";
import { TextInput } from "flowbite-react";

interface AfterCalculationOrderPartsInterface {
  orderInitialValue: EditOrderInterface;
}

export const AfterCalculationOrderPartsComponent = ({
  orderInitialValue,
}: AfterCalculationOrderPartsInterface) => {
  const [orderPartsIds, setOrderPartsId] = useState<any>([]);
  const [supplierOrderParts, setSupplierOrderParts] = useState<any>([]);
  const [error, setError] = useState("");
  console.log(orderPartsIds, error, "orderPartsIds");
  console.log(supplierOrderParts, "supplierOrderParts");

  const uniqueSupplierOrderParts = supplierOrderParts.reduce(
    (acc: any[], item: any) => {
      if (!acc.some((el) => el.orderPart.id === item.orderPart.id)) {
        acc.push(item);
      }
      return acc;
    },
    []
  );

  const groupedSupplierOrderParts = supplierOrderParts.sort(
    (a: any, b: any) => a.supplier.id - b.supplier.id
  );

  const forHeader = groupedSupplierOrderParts.reduce(
    (acc: any[], item: any) => {
      if (!acc.some((el) => el.supplier.id === item.supplier.id)) {
        acc.push(item);
      }
      return acc;
    },
    []
  );

  const newArrayGroupedSupplierOrderParts = [
    groupedSupplierOrderParts.slice(0, 2),
    groupedSupplierOrderParts.slice(((groupedSupplierOrderParts.length)/2), (((groupedSupplierOrderParts.length)/2)*2))
  ];
  console.log(groupedSupplierOrderParts, "groupedSupplierOrderParts");
  console.log(forHeader, "forHeader");
  console.log(
    newArrayGroupedSupplierOrderParts,
    "newArrayGroupedSupplierOrderParts"
  );



  useEffect(() => {
    if (orderInitialValue.orderParts) {
      const orderPartIds = orderInitialValue.orderParts.map((item) => item.id);
      setOrderPartsId(orderPartIds);
    }
  }, [orderInitialValue]);

  useEffect(() => {
    if (orderPartsIds.length > 0) {
      const getSupplierOrderParts = async () => {
        try {
          const queryParams = new URLSearchParams({
            orderPartIds: orderPartsIds.join(","), // Correctly sending orderPartsIds
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
          if (!res.ok || data.success === false) {
            setError(data.message || "Error fetching supplier order parts");
            return;
          }

          setSupplierOrderParts(data);
        } catch (error: any) {
          setError(error.message || "Network error");
        }
      };

      getSupplierOrderParts();
    }
  }, [orderPartsIds]);

  const defineDeliverType = (delivering: string) => {
    switch (delivering) {
      case "təcili":
        return <span>Təcili (15 gün)</span>;
      case "normal":
        return <span>Orta (15-30 gün)</span>;
      case "planlaşdırılmış":
        return <span>Planlaşdırılmış (40-60 gün)</span>;
      default:
        return false;
    }
  };

  return (
    <table className="w-24 border p-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3"></th>
          <th scope="col" className="px-6 py-3"></th>
          <th scope="col" className="px-6 py-3"></th>
          <th scope="col" className="px-6 py-3"></th>
          <th scope="col" className="px-6 py-3"></th>
          {forHeader &&
            forHeader.map((item: any, index: number) => (
              <th
                scope="col"
                key={index}
                colSpan={3}
                className="w-full  py-6 border border-black text-white text-center bg-red-700"
              >
                <div className="">
                  <span className="px-1 py-3">{item.supplier.supplier}</span>
                  {defineDeliverType(item.delivering)}
                </div>
              </th>
            ))}
        </tr>
      </thead>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            №
          </th>
          <th scope="col" className="px-6 py-3">
            Detalın nömrəsi
          </th>
          <th scope="col" className="px-6 py-3">
            Sayı
          </th>
          <th scope="col" className="px-6 py-3">
            Anbarda varmı
          </th>
          <th scope="col" className="px-6 py-3">
            Detalın adı
          </th>

          {newArrayGroupedSupplierOrderParts &&
            newArrayGroupedSupplierOrderParts.map((index: number) => (
              <>
                <th scope="col" className="px-6 py-3 border-l border-black" key={index}>
                  Maya dəyəri
                </th>
                <th scope="col" className="px-6 py-3">
                  Satış dəyəri
                </th>
                <th scope="col" className="px-6 py-3 border-r-2 border-black">
                  Ümumi satış dəyəri
                </th>
              </>
            ))}
        </tr>
      </thead>
      <tbody>
        {uniqueSupplierOrderParts &&
          uniqueSupplierOrderParts.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <tr>
                <td scope="col" className="px-6 py-3 ">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 items-center">
                    <TextInput
                      type="text"
                      sizing="sm"
                      className="w-40"
                      value={item.origCode}
                      readOnly
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <TextInput
                    type="text"
                    sizing="sm"
                    className="w-20"
                    value={item.count}
                    readOnly
                  />
                </td>
                <td scope="col" className="px-6 py-3"></td>
                <td className="px-6 py-4">
                  <TextInput
                    type="text"
                    sizing="sm"
                    className="w-40"
                    value={item.partName}
                    readOnly
                  />
                </td>

                {newArrayGroupedSupplierOrderParts &&
                  newArrayGroupedSupplierOrderParts.map(
                    (item: any, supplierIndex: number) => (
                      <React.Fragment key={supplierIndex}>
                        <td className="px-6 py-4">
                          <TextInput
                            type="text"
                            sizing="sm"
                            className="w-20"
                            value={parseFloat(item[index]?.price).toString()}
                            readOnly
                          />
                        </td>
                        <td className="px-6 py-4">
                          <TextInput
                            type="text"
                            sizing="sm"
                            className="w-20"
                            value={parseFloat(
                              item[index]?.unitSellPrice
                            ).toString()}
                            readOnly
                          />
                        </td>
                        <td className="px-6 py-4">
                          <TextInput
                            type="text"
                            sizing="sm"
                            className="w-20"
                            value={parseFloat(item[index]?.sellPrice).toString()}
                            readOnly
                          />
                        </td>
                      </React.Fragment>
                    )
                  )}
              </tr>
            </React.Fragment>
          ))}
        <tr>
          <td scope="col" className="px-6 py-3 "></td>
          <td scope="col" className="px-6 py-3 "></td>
          <td scope="col" className="px-6 py-3 "></td>
          <td scope="col" className="px-6 py-3 "></td>
          <td scope="col" className="px-6 py-3 "></td>
          {newArrayGroupedSupplierOrderParts &&
            newArrayGroupedSupplierOrderParts.map(
              (item: any, supplierIndex: number) => (
                <React.Fragment key={supplierIndex}>
                  <td className="px-6 py-4"></td>
                  <td className="px-9 py-4 text-black text-xs">
                    {(item.reduce(
                      (total: number, obj: any) =>
                        total + Number(obj?.sellPrice),
                      0
                    )).toFixed(2)
                    }
                  </td>
                  <td className="px-6 py-4"></td>
                </React.Fragment>
              )
            )}
        </tr>
      </tbody>
    </table>
  );
};
