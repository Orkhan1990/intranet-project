import { Button } from "flowbite-react";
import { OrderInterface} from "../../types";
import { useEffect, useState } from "react";



interface Part {
  id: number;
  price: number;
  count: number;
  totalPrice: number;
  profit: number;
  sellPrice: number;
  transport: number;
  sipPrice: number;
  percent: number;
  unitSipPrice: number;
  unitSellPrice: number;
}
interface CalculationLocalInterface {
  order: OrderInterface;
  supplierId?: number;
}

const CalculationLocal = ({order,supplierId}: CalculationLocalInterface) => {

  const [parts, setParts] = useState<Part[]>([]);
  const [handleTotalPriceSum,setTotalPriceSum]=useState<number>(0); 
  const [orderId, setOrderId] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [delivering, setDelivering] = useState<string>("");

 
  useEffect(() => {
    if (order && order.orderParts) {
      // Map over the orderParts array and prepare your data for useState
      const partsData:Part[] = order.orderParts.map((part) => ({
        id: part.id,
        partName:part.partName,
        origCode:part.origCode,
        price: part?.price || 0, // Default to 0 if price is undefined
        count: part?.count || 1, // Default to 1 if count is undefined
        totalPrice:part?.totalPrice||0, // Calculate initial totalPrice
        profit:part?.profit||0, // You can set the initial value as needed
        sellPrice:part?.sellPrice||0, // Likewise for sellPrice
        transport:part?.transport||0, // And transport
        sipPrice:part?.sipPrice||0, // And sipPrice
        percent:part?.percent||0, // Example percent
        unitSipPrice:part?.unitSipPrice||0, // Initial sip price per unit
        unitSellPrice:part?.unitSellPrice||0, // Initial sell price per unit
      }));
      setParts(partsData); // Set the state with the mapped parts data
      setOrderId(order.id);
      setDelivering(order.delivering);

      // Set the state with the mapped parts data
    }
  }, [order]);

  console.log(parts,"parts");


  const handleChange = (e: any, id: number) => {
    const {name,value} = e.target;
    setParts((prev: Part[]) => {
      return [...prev].map((part) =>
        part.id === id ? { ...part, [name]: value } : part
      );
    });
  }
  const[transport,setTransport]=useState<number>(0);

  const handleChangeTransport=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setTransport(Number(e.target.value));
  }

  console.log(parts);
  console.log(transport);

  
  const calculationLocal=()=>{
    const totalPriceSum=parts.reduce((acc,part)=>acc+(Number(part.price)*part.count),0);
    setTotalPriceSum(totalPriceSum);
  let result=parts.map((part)=>{
     const totalPriceResult=Number(part.price)*part.count;
     const trasnportResult=totalPriceSum>0?Math.ceil((totalPriceResult*transport/totalPriceSum)*100)/100:0;
     const sipPriceResult=totalPriceResult+trasnportResult;
     const profitResult=part.percent>0?sipPriceResult*(Number(part.percent)/100):0;
     const unitSipPriceResult=Math.ceil((sipPriceResult/part.count)*100)/100;
     const sellPriceResult=Math.ceil((sipPriceResult+profitResult)*100)/100;
      const unitSellPriceResult=Math.ceil((sellPriceResult/part.count)*100)/100;
    return{
       ...part,
      id:part.id,
      price:part.price,
      percent:Number(part.percent),
      count:part.count,
      totalPrice:totalPriceResult,
      profit:profitResult,
      transport:trasnportResult,
      sipPrice:sipPriceResult,
      unitSipPrice:unitSipPriceResult,
      sellPrice:sellPriceResult,
      unitSellPrice:unitSellPriceResult
    }
     
  });
  
   setParts(result);
  }

  const saveData=async()=>{
    console.log(parts);
    try {

      const res = await fetch(
        `http://localhost:3013/api/v1/order/updateOrderParts/${orderId}`,
        {
          method: "POST",
          credentials: "include", // added this part
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderParts: parts,delivering:delivering,supplierId:supplierId }),
        }
      );

      const data = await res.json();
      if(!res.ok||data.success===false){
        setError(data.message);
        return;
      }
      console.log(data);      
    } catch (error) {
      console.log(error);
      
    }
  }
 
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
              <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" onChange={handleChangeTransport} />
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

          {parts.length>0 &&
            parts.map((orderPart: any, index: number) => (
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
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" name="price" value={parseFloat(orderPart.price).toString()} onChange={(e) => handleChange(e,orderPart.id)}/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat(orderPart.totalPrice).toString()} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat(orderPart.transport).toString()} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat(orderPart.sipPrice).toString()} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat(orderPart.unitSipPrice).toString()} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      name="percent"
                      value={parseFloat(orderPart.percent).toString()}
                      onChange={(e) => handleChange(e, orderPart.id)}
                    />
                    <span className="text-black font-[400] text-sm">%</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat(orderPart.profit).toString()} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat(orderPart.sellPrice).toString()} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat(orderPart.unitSellPrice).toString()} readOnly/>
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
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200">{handleTotalPriceSum===0?"":handleTotalPriceSum}</td>
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
        <Button color={"blue"} size={"xs"} onClick={calculationLocal}>
          Hesabla
        </Button>
        <Button color={"blue"} size={"xs"} onClick={saveData}>
          Yadda saxlamaq
        </Button>
      </div>
    </div>
  );
};

export default CalculationLocal;
