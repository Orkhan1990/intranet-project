import { Button } from "flowbite-react";
import { OrderInterface } from "../../types";
import { LuEuro } from "react-icons/lu";
import { Link } from "react-router-dom";

interface CalculationStandartInterface {
  order: OrderInterface;
  supplierId: number;
}

const CalculationStandart = ({ order,supplierId }: CalculationStandartInterface) => {
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
              <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
            </td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200">
              <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
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
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
            </td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
            </td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
            </td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
              <span className="text-sm">%</span>
            </td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
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

          {order &&
            order.orderParts.map((orderPart: any, index: number) => (
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
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-center">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">
                      <LuEuro className="text-sm" />
                    </span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400] text-sm">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">%</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400] text-sm">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
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
                    <input type="radio" className="w-3 h-3"/>
                    <span>Man</span>
                   </div>
                   <div className="flex gap-1 items-center font-[400]">
                    <input type="radio" className="w-3 h-3"/>
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
      <div className="flex gap-2 mt-1 ml-2 items-end">
        <Button color={"blue"} size={"xs"}>
          Price ExW əldə etmək
        </Button>
        <Button color={"blue"} size={"xs"}>
        Hesabla
        </Button>
        <Link to={"#"} className="underline text-blue-800">Excel-ə çıxart</Link>
      </div>
    </div>
  );
};

export default CalculationStandart;
