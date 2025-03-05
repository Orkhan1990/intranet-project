import { Button} from "flowbite-react";
import { useEffect, useState } from "react";
import { OrderInterface } from "../../types";
import { useLocation } from "react-router-dom";
import { DeliverType, OrderType, PayType } from "../../enums/projectEnums";

const Calculation = () => {
  const[error,setError]=useState<string>("");
  const [order, setOrder] = useState<OrderInterface>({
    id: 0,
    project: "project1",
    cardNumber: "1",
    orderType: OrderType.Standart_Client,
    clientId: 1,
    manufacturer: "Man",
    model: "",
    chassisNumber: "",
    engineNumber: "",
    produceYear: "2024",
    km: "",
    vehicleNumber: "",
    paymentType: PayType.Transfer,
    delivering: DeliverType.Fast,
    deliveringType: "simplified",
    initialPayment: 0,
    comment: "",
    oil: false,
    parts: [
      {
        id: 0,
        origCode: "",
        count: 1,
        stockQuantity: 0,
        checkOnWarehouse: false,
        partName: "",
      },
    ],
  });


  const location=useLocation();
  const params=new URLSearchParams(location.search);
  const orderId=parseInt(params.get('orderId') || '');
  const supplierId=parseInt(params.get('supplierId')||'');
  const liquidity=(params.get('liquidity')||'');
  console.log(orderId,supplierId,liquidity);
  // console.log(orderParts);
  
  

  useEffect(() => {
    const fetchOrderParts = async () => {
      const res = await fetch(`http://localhost:3013/api/v1/order/getOrder/${orderId}`);
      const data = await res.json();

      if(!res.ok||data.success===false){
        setError(data.message);
        return;
      }
      setOrder(data);
    };
    fetchOrderParts();
  }, []);
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
              Price
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Total price
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Transport
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              SIP price
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Unit SIP price
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              %
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Profit
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Sell price
            </th>
            <th className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-custom-gray">
              Unit Sell price
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
            <td className="px-1  text-center  font-[300] text-xs border border-dashed border-black p-2 bg-custom-red">
              <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
            </td>
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
          </tr>

          {
            order&&order.parts.map((orderPart:any,index:number)=>(
                
          <tr className="h-7" key={index}>
          <td className="px-1  text-xs w-[15px] font-[400] border border-dashed border-black p-2 ">{index+1}</td>
          <td className="px-1 font-[400] text-xs border border-dashed border-black p-2 ">{orderPart.origCode}</td>
          <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 ">
            <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
          </td>
          <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 ">
            <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={orderPart.partName} />
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
          <td className="px-1  font-[400] text-xs border border-dashed border-black p-2">{orderPart.count}</td>
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
            <div className="flex gap-2 items-end">
              <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" />
              <span className="text-black font-[400]">man</span>
            </div>
          </td>
          <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
            <div className="flex gap-1 items-end">
              <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={45}/>
              <span className="text-black font-[400] text-sm">%</span>
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
        </tr>
            ))
          }


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
          </tr>
        </tbody>
      </table>
      <div className="flex gap-2 mt-1 ml-2">
        <Button color={"blue"} size={"xs"}>
          Hesabla
        </Button>
        <Button color={"blue"} size={"xs"}>
          Yadda saxlamaq
        </Button>
      </div>
    </div>
  );
};

export default Calculation;
