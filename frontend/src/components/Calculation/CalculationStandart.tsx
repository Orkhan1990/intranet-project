import { Button } from "flowbite-react";
import { OrderInterface } from "../../types";
import { LuEuro } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  calculateStandartOrderPrice,
  findOrigKodFromPriceList,
} from "../../api/uploadExcel";

interface CalculationStandartInterface {
  order: OrderInterface;
  supplierId: number;
  delivering: string;
  setRefreshPage: (value: boolean) => void;
}

interface EditableOrderPart {
   id: number;
  // origCode: string;
  // count: number;
  // checkOnWarehouse: boolean;
  // stockQuantity: number;
  // partName: string;
  // price: number;
  // totalPrice: number;
  // sipPrice: number;
  // unitSipPrice: number;
  // percent: number;
  // profit: number;
  // sellPrice: number;
  // unitSellPrice: number;
  // delivering: string;
  // nettoByUnit: string;
  // totalNetto: string;
  // transportMan: string;
  // cipPrice: string;
  // tax: string;
  // accessoryCost: string;
  // declaration: string;
  // ddpPrice: string;
  // unitDdpPrice: string;
  // sellPriceClientStock: string;
  // rabatgrupInd: number;
  // totalSellPriceClientOrdered: string;
  // sellPriceUnitWhichInStock: string;
  // reserved: string;
  // totalSellPriceWhichInStock: string;
  // totalSellPriceOrderedWhichInStock: string;
  priceExw:string;
  taxValue: string;
  percentageValue: string;
  accessoryCostValue: string;
  declarationValue: string;
  transport: number;
  transportManValue: string;
  totalPriceManValue: string;
  percentage: string;
  priceExwNoDiscount: string;
}



const CalculationStandart = ({
  order,
  supplierId,
  delivering,
  setRefreshPage,
}: CalculationStandartInterface) => {
  const [orderPartsId, setOrderPartsId] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
const [editableOrderParts, setEditableOrderParts] = useState<EditableOrderPart[]>([]);

console.log(editableOrderParts);

 
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number
) => {
  const { name, value } = e.target;
  const updated = [...editableOrderParts];
  updated[index] = {
    ...updated[index],
    [name]: parseFloat(value) || 0,
  };
  setEditableOrderParts(updated);
};


  useEffect(() => {

      if (order?.orderParts) {
    const initialized = order.orderParts.map((part) => ({
      id: part.id,
      priceExw: part.priceExw ?? 0,
      taxValue: part.taxValue ?? 0,
      percentageValue: part.percentageValue ?? 0,
      accessoryCostValue: part.accessoryCostValue ?? 0,
      declarationValue: part.declarationValue ?? 0,
      transport: part.transport ?? 0,
      transportManValue: part.transportManValue ?? 0,
      totalPriceManValue: part.totalPriceManValue ?? 0,
      percentage: part.percentage ?? 0,
      priceExwNoDiscount: part.priceExwNoDiscount ?? 0,
    }));
    setEditableOrderParts(initialized);
  }

    // if (order?.orderParts) {
    //   setEditableOrderParts(order.orderParts);
    // }
    const getOrderPartsInfo = () => {
      if (!order?.orderParts?.length) return;

      const origKodObjects = order.orderParts.map((part: any) => part.id);
      setOrderPartsId(origKodObjects);
    };
    getOrderPartsInfo();
  }, [order]);

  const countViaPriceList = async (orderPartsId: any, delivering: any) => {
    try {
      const data = await findOrigKodFromPriceList(
        orderPartsId,
        setError,
        delivering
      );
      console.log(data);
      setRefreshPage(true);
    } catch (error: any) {
      setError(error);
    }
  };

  const calculateStandartOrder = async () => {
  try {
    const data = await calculateStandartOrderPrice(editableOrderParts, orderPartsId);

    // Optional: if backend returns updated order
    // update local state (or re-fetch full order)
    // if (data?.updatedOrderParts) {
    //   setEditableOrderParts(data.updatedOrderParts);
    // }

    console.log(data);
    

    setRefreshPage(true); // trigger parent refresh if needed
  } catch (err: any) {
    console.error(err);
    setError(err.message || "An error occurred during calculation.");
  }
};

  return (
    <div>
      <table className="table-auto w-full ">
        <thead>
          <tr>
            <th className="px-1 text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-gray">
              №
            </th>
            <th className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              OE number
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              ALT
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Description
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Brend
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              QTY
            </th>

            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              QTY in stock
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              QTY for stock
            </th>

            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Pricelist ExW"
            </th>

            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Price ExW
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Price ExW NoDisc
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Price without packing
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Packing
            </th>

            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Total price
            </th>

            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Total price man
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              NETTO by Unit
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Total NETTO
            </th>

            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Transport
            </th>

            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Transport man
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              CIP price
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Tax
            </th>

            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Accessory cost
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Decleration
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              DDP price
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Unit DDP price
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              %
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Profit
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Sell price(client+stock)
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Unit Sell price
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Total Sell price client (ordered)
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Sell price unit (which in stock)
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Reserved
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Total Sell price (which in stock)
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Total Sell price (ordered+which in stock)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-7">
            <td className="px-1  text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-yellow"></td>
            <td className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-yellow"></td>
            <td className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200">
              <input
                className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                name="accessoryCostValue"
                onChange={(e) => handleChange(e, 0)}
                value={editableOrderParts[0]?.accessoryCostValue || ""}
              />
            </td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200">
              <input
                className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                name="declarationValue"
                onChange={(e) => handleChange(e, 0)}
                value={editableOrderParts[0]?.declarationValue || ""}
              />
            </td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
          </tr>

          <tr>
            <td className="px-1 text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input
                className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                name="totalPriceManValue"
                onChange={(e) => handleChange(e, 0)}
                value={editableOrderParts[0]?.totalPriceManValue || ""}
              />
            </td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input
                className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                name="transport"
                onChange={(e) => handleChange(e, 0)}
                value={editableOrderParts[0]?.transport || ""}
              />
            </td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input
                className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                name="transportManValue"
                onChange={(e) => handleChange(e, 0)}
                value={editableOrderParts[0]?.transportManValue || ""}
              />
            </td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input
                className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                name="taxValue"
                onChange={(e) => handleChange(e, 0)}
                value={editableOrderParts[0]?.taxValue || ""}
              />
              <span className="text-sm">%</span>
            </td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input
                className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                name="percentageValue"
                onChange={(e) => handleChange(e, 0)}
                value={editableOrderParts[0]?.percentageValue || ""}
              />
            </td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
          </tr>

          <tr className="h-7">
            <td className="px-1  text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-yellow"></td>
            <td className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-yellow"></td>
            <td className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
          </tr>

          {editableOrderParts &&
          editableOrderParts.map((orderPart: any, index: number) => (
              <tr className="h-7" key={index}>
                <td className="px-1  text-xs w-[15px] font-[400] border border-dashed border-black p-2 ">
                  {index + 1}
                </td>
                <td className="px-1 font-[400] text-xs border border-dashed border-black p-2 ">
                  {orderPart.origCode}
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 ">
                  <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 ">
                  <input
                    className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                    value={orderPart.partName}
                  />
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <select className="w-44 text-xs h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]">
                    <option value=""></option>
                    <option value="">MetroMan (IN-TECH)</option>
                    <option value="">3F</option>
                    <option value="">3M</option>
                    <option value="">4CR</option>
                  </select>
                </td>
                <td className="px-1  font-[400] text-xs border border-dashed border-black p-2">
                  {orderPart.count}
                </td>
                <td className="px-1  font-[400]  text-xs border border-dashed border-black p-2">
                  0
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2"></td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                    value={Number(orderPart.priceExw || 0)}
                      onChange={(e) => handleChange(e, index)}
                      name="priceExw"
                    />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={Number(orderPart.priceExwNoDiscount || 0)}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                    value={Number(orderPart.priceWithoutPacking || 0)}


                    />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                    value={Number(orderPart.tax || 0)}
                    />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.totalPrice).toString()}
                    />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.totalPriceMan).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.nettoByUnit).toString()}
                    />
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.totalNetto).toString()}
                    />
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.transport).toString()}
                    />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.transportMan).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.sipPrice).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.tax).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.accessoryCost).toString()}
                    />
                    <span className="text-black font-[400] text-sm">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.declaration).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.ddpPrice).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.unitDdpPrice).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      name="percentage"
                      value={editableOrderParts[index]?.percentage || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <span className="text-black font-[400]">%</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.profit).toString()}
                    />
                    <span className="text-black font-[400] text-sm">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(
                        orderPart.sellPriceClientStock
                      ).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.unitSellPrice).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(
                        orderPart.totalSellPriceClientOrdered
                      ).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(
                        orderPart.sellPriceUnitWhichInStock
                      ).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(orderPart.reserved).toString()}
                    />
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(
                        orderPart.totalSellPriceWhichInStock
                      ).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      value={parseFloat(
                        orderPart.totalSellPriceOrderedWhichInStock
                      ).toString()}
                    />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
              </tr>
            ))}

          <tr className="h-7">
            <td className="px-1  text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-yellow"></td>
            <td className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200">
              <div className="flex gap-1 items-end w-24">
                <div className="flex gap-1 items-center font-[400]">
                  <input type="radio" className="w-3 h-3" />
                  <span>Man</span>
                </div>
                <div className="flex gap-1 items-center font-[400]">
                  <input type="radio" className="w-3 h-3" />
                  <span>Min</span>
                </div>
              </div>
            </td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-yellow"></td>
            <td className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
          </tr>
        </tbody>
      </table>
      <div className="flex gap-2 mt-5 ml-2 items-end">
        <Button
          color={"blue"}
          size={"xs"}
          onClick={() => countViaPriceList(orderPartsId, delivering)}
        >
          Price ExW əldə etmək
        </Button>
        <Button
          color={"blue"}
          size={"xs"}
          onClick={() => calculateStandartOrder()}
        >
          Hesabla
        </Button>
        <Link to={"#"} className="underline text-blue-800">
          Excel-ə çıxart
        </Link>
      </div>
    </div>
  );
};

export default CalculationStandart;
