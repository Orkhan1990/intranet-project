import { Button } from "flowbite-react";
import { OrderInterface} from "../../types";
import { useEffect, useState } from "react";



interface Part {
  id: number;
  price: number;
  partName: string;
  origCode: string;
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
  delivering?: string;
}

const CalculationLocal = ({order,supplierId,delivering}: CalculationLocalInterface) => {

  const [parts, setParts] = useState<Part[]>([]);
  const [handleTotalPriceSum,setTotalPriceSum]=useState<number>(0); 
  const [error, setError] = useState<string>("");
  const [orderId,setOrderId]=useState<number>(0);
  const [orderPartsIdArray,setOrderPartsIdArray]=useState<number[]>([]);
  const [result,setResult]=useState<number>(0);

 
   console.log(orderPartsIdArray,"orderIdArray");
   console.log(error);
   console.log(delivering);
   console.log(supplierId,"supplierId");
   console.log(orderId,"orderId");
   
   
   


   

useEffect(() => {

    const getsupplierOrderParts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3013/api/v1/order/getSupplierOrderParts/${supplierId}/${order.id}`,
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!res.ok || data.success === false) {
          setError(data.message);
          return;
        }else{
          // console.log(data);
          // setParts(data);
           console.log(data,"gelendataaaavarmiiiii");
           
          if (data.length>0) {

            const partsData:Part[] = data.map((part:any) => ({
              id: part.id,
              partName:part.partName,
              origCode:part.origCode,
              price: parseFloat(part?.price) || 0, // Default to 0 if price is undefined
              count: part?.count || 1, // Default to 1 if count is undefined
              totalPrice:parseFloat(part?.totalPrice)||0, // Calculate initial totalPrice
              profit:parseFloat(part?.profit)||0, // You can set the initial value as needed
              sellPrice:parseFloat(part?.sellPrice)||0, // Likewise for sellPrice
              transport:parseFloat(part?.transport)||0, // And transport
              sipPrice:parseFloat(part?.sipPrice)||0, // And sipPrice
              percent:parseFloat(part?.percent)||0, // Example percent
              unitSipPrice:parseFloat(part?.unitSipPrice)||0, // Initial sip price per unit
              unitSellPrice:parseFloat(part?.unitSellPrice)||0, // Initial sell price per unit
            }));
              setParts(partsData);
              const result=partsData.reduce((acc,part)=>acc+(Number(part.price)*part.count),0);
              setResult(result)
          }
        }
    
        // setDelivering(data.delivering);
      } catch (error) {
        console.log(error);
      }
    }
    
    getsupplierOrderParts();
    setOrderId(order.id);
    const orderIdArray=order.orderParts.map((part)=>part.id);
    setOrderPartsIdArray(orderIdArray);
    
}, [supplierId,order,delivering]);


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

  // console.log(parts);
  // console.log(transport);


  const calculationLocal=()=>{
    const totalPriceSum=parts.reduce((acc,part)=>acc+(Number(part.price)*part.count),0);
    setTotalPriceSum(totalPriceSum);
  const result=parts.map((part)=>{
    const totalPriceResult = Number(part.price) * part.count;
    const transportResult = totalPriceSum > 0 ? Number(((totalPriceResult * transport) / totalPriceSum).toFixed(2)) : 0;
    const sipPriceResult = totalPriceResult + transportResult;
    const profitResult = part.percent > 0 ? Number((sipPriceResult * (Number(part.percent) / 100)).toFixed(2)) : 0;
    const unitSipPriceResult = Number((sipPriceResult / part.count).toFixed(2));
    const sellPriceResult = Number((sipPriceResult + profitResult).toFixed(2));
    const unitSellPriceResult = Number((sellPriceResult / part.count).toFixed(2));
    return{
       ...part,
      id:part.id,
      price:Number(part.price),
      percent:Number(part.percent),
      count:part.count,
      totalPrice:totalPriceResult,
      profit:profitResult,
      transport:transportResult,
      sipPrice:sipPriceResult,
      unitSipPrice:unitSipPriceResult,
      sellPrice:sellPriceResult,
      unitSellPrice:unitSellPriceResult
    }
     
  });
  
   setParts(result);
  }

  const saveData=async()=>{
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/updateOrderParts/${orderId}`,
        {
          method: "POST",
          credentials: "include", // added this part
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderParts: parts,delivering:delivering,supplierId:supplierId,orderPartsIdArray:orderPartsIdArray }),
        }
      );

      const data = await res.json();
      if(!res.ok||data.success===false){
        setError(data.message);
        return;
      }else{
        setParts(data)
        window.close();
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
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" name="price" value={orderPart.price} onChange={(e) => handleChange(e,orderPart.id)}/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat((orderPart.totalPrice).toFixed(2))} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat((orderPart.transport).toFixed(2))} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat((orderPart.sipPrice).toFixed(2))} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat((orderPart.unitSipPrice).toFixed(2))} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-1 items-end">
                    <input
                      className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]"
                      name="percent"
                      value={orderPart.percent}
                      onChange={(e) => handleChange(e, orderPart.id)}
                    />
                    <span className="text-black font-[400] text-sm">%</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat((orderPart.profit).toFixed(2))} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat((orderPart.sellPrice).toFixed(2))} readOnly/>
                    <span className="text-black font-[400]">man</span>
                  </div>
                </td>
                <td className="px-1  font-[300] text-xs border border-dashed border-black p-2">
                  <div className="flex gap-2 items-end">
                    <input className="w-24 h-6 border border-black rounded-sm outline-none p-1 text-black font-[400]" value={parseFloat((orderPart.unitSellPrice).toFixed(2))} readOnly/>
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
            <td className="px-1  font-[300] text-xs border border-dashed border-black p-2 bg-yellow-200">{handleTotalPriceSum===0?(result===0?"":parseFloat((result).toFixed(2))):parseFloat((handleTotalPriceSum).toFixed(2))}</td>
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
