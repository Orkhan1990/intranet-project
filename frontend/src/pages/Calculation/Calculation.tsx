import { TextInput } from "flowbite-react";

const Calculation = () => {
  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-1 text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-gray">
              №
            </th>
            <th className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              OE number
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">ALT</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">Description</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">Brend</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">QTY</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">Price</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">Total price</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">Transport</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">SIP price</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">Unit SIP price</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">%</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">Profit</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">Sell price</th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">Unit Sell price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-7">
          <td className="px-1  text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-yellow">
            </td>
            <td className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200">
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
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
          </tr>

          <tr>
          <td className="px-1 text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-red">
            </td>
            <td className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
            </td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input className="w-24 h-6 border rounded-md outline-none p-1" />
            </td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red"></td>
          </tr>

          <tr className="h-7">
          <td className="px-1  text-xs w-[15px] font-[300] border border-dashed border-black p-2 bg-custom-yellow">
            </td>
            <td className="px-1 font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200">
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
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Calculation;
