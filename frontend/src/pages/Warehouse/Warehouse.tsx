import { useEffect, useState } from "react";
import { Liquidity } from "../../enums/projectEnums";
import { BrandInterface } from "../../types";
import { FcOk } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";

interface SparePartInterafce {
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
const numbers:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
const Warehouse = () => {
  const [error, setError] = useState("");
  const [sparePartData, setSparePartData] = useState<SparePartInterafce[]>([]);
  const [queryData,setQueryData]=useState({
    code:"",
    origCode:"",
    brand:"",
    name:"",
    count:0,
    liquidity:"",
    price:0,
    sellPrice:0,
    barcode:""
  })
  useEffect(() => {
    const getAllInvoice = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/sparePart/getAllSpareParts",
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log(data);

        if (!res.ok || data.success === false) {
          setError(data.message);
        } else {
          setSparePartData(data);
        }
      } catch (error: any) {
        setError(error);
      }
    };

    getAllInvoice();
  }, []);

  const getCreatedDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB");
  };
   console.log(queryData);
   
  const handleChange=(e:any)=>{
    const{id,value}=e.target;
     setQueryData((prev)=>({...prev,[id]:value}))
  }



  const filteredData = sparePartData.filter((data) => {
    return (
      (queryData.code ? (data.code.toLocaleLowerCase()||"").includes(queryData.code) : true) &&
      (queryData.origCode ? (data.origCode.toLocaleLowerCase()||"").includes(queryData.origCode) : true) &&
      (queryData.brand ? (data.brand.name.toLowerCase()||"").includes(queryData.brand.toLowerCase()) : true) &&
      (queryData.name ? (data.name.toLowerCase()||"").includes(queryData.name.toLowerCase()) : true) &&
      (queryData.liquidity ? (data.liquidity.toLowerCase()||"").includes(queryData.liquidity.toLowerCase()) : true) &&
      (queryData.barcode ? (data.barcode || "").includes(queryData.barcode) : true) &&
      (queryData.count ? data.count.toString().includes(queryData.count.toString()) : true) &&
      (queryData.price ? data.price.toString().includes(queryData.price.toString()) : true) &&
      (queryData.sellPrice ? data.sellPrice.toString().includes(queryData.sellPrice.toString()) : true)
    );
  });


  return (
    <div className="min-h-screen relative overflow-x-auto">
      <form>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Orijinal kod
              </th>
              <th scope="col" className="px-6 py-3">
                Kod
              </th>
              <th scope="col" className="px-6 py-3">
                Brend
              </th>
              <th scope="col" className="px-6 py-3">
                Adı
              </th>
              <th scope="col" className="px-6 py-3">
                Say
              </th>
              <th scope="col" className="px-6 py-3">
                Rezerv
              </th>
              <th scope="col" className="px-6 py-3">
                Likvidlik
              </th>
              <th scope="col" className="px-6 py-3">
                Qiymət
              </th>
              <th scope="col" className="px-6 py-3">
                Satış qiyməti
              </th>
              <th scope="col" className="px-6 py-3">
                Barkod
              </th>
              <th scope="col" className="px-6 py-3">
                Yerləşmə yeri
              </th>
              <th scope="col" className="px-6 py-3">
                Çap
              </th>
              <th scope="col" className="px-6 py-3">
                Yaradılma tarixi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <input className="border w-24 pl-1"  name="code" id="code" onChange={handleChange}/>
              </td>
              <td className="px-6 py-4">
                <input className="border w-24 pl-1" name="origCode" id="origCode" onChange={handleChange}/>
              </td>
              <td className="px-6 py-4">
                <input className="border w-24 pl-1" name="brand" id="brand" onChange={handleChange}/>
              </td>
              <td className="px-6 py-4">
                <input className="border w-24 pl-1" name="name" id="name" onChange={handleChange}/>
              </td>
              <td className="px-6 py-4">
                <input className="border w-20 pl-1" name="count" id="count" onChange={handleChange}/>
              </td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">
                <input className="border w-24 pl-1" name="liquidity" id="liquidity" onChange={handleChange}/>
              </td>
              <td className="px-6 py-4">
                <input className="border w-24 pl-1" name="price" id="price" onChange={handleChange}/>
              </td>
              <td className="px-6 py-4">
                <input className="border w-24 pl-1" name="sellPrice" id="sellPrice" onChange={handleChange}/>
              </td>
              <td className="px-6 py-4">
                <input className="border w-24 pl-1" name="barcode" id="barcode" onChange={handleChange}/>
              </td>
            </tr>
            {filteredData.length > 0 &&
              filteredData.map((data: SparePartInterafce, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{data.code}</td>
                  <td className="px-6 py-4">{data.origCode}</td>
                  <td className="px-6 py-4">
                  {data.brand.name}
                  </td>
                  <td className="px-6 py-4">
                    <input type="text" value={data.name} className="rounded-lg text-xs"/>
                  </td>
                  <td className="px-6 py-4">
                  <input type="text" value={data.count} className="rounded-lg text-xs w-20" />
                  </td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4">{data.liquidity}</td>
                  <td className="px-6 py-4">
                  <input type="text" value={data.price} className="rounded-lg text-xs w-20" />
                  </td>
                  <td className="px-6 py-4">
                  <input type="text" value={data.sellPrice} className="rounded-lg text-xs w-20"/>
                  </td>
                  <td className="px-6 py-4">{data.barcode}</td>
                  <td className="px-6 py-4">
                    <div className="flex  gap-2">
                      <div className="flex gap-1 items-center">
                      <label htmlFor="">Rəf</label>
                      <select name="" id="" className="text-xs rounded-md ">
                        <option value=""></option>
                      {
                       numbers.map((item:number,index:number)=>(
                        <option key={index} value={item}>{item}</option>
                       ))
                      }
                      </select>
                      </div>
                      <div className="flex gap-1 items-center">
                      <label htmlFor="">Yer</label>
                      <select name="" id="" className="text-xs rounded-md ">
                        <option value=""></option>
                      {
                       numbers.map((item:number,index:number)=>(
                        <option key={index} value={item}>{item}</option>
                       ))
                      }
                      </select>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                    <div className="flex  gap-2">
                      <div className="flex gap-1 items-center">
                      <label htmlFor="">Say</label>
                      <select name="" id="" className="text-xs rounded-md ">
                        <option value=""></option>
                      {
                       numbers.map((item:number,index:number)=>(
                        <option key={index} value={item}>{item}</option>
                       ))
                      }
                      </select>
                      </div>
                      <div className="flex">
                      <div className="flex gap-1 items-center">
                      <label htmlFor="">Çap sayı</label>
                      <select name="" id="" className=" rounded-md text-xs">
                        <option value=""></option>
                      {
                       numbers.map((item:number,index:number)=>(
                        <option key={index} value={item}>{item}</option>
                       ))
                      }
                      </select>
                      </div>
                    </div>
                      <button className="bg-blue-500 text-xs text-white rounded-md p-1 hover:bg-blue-700 ">Çap et</button>
                      </div>
                    </div>   
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span>{data.barcode ? <FcOk className=" w-5 h-5"/> : <FaXmark  className="text-white bg-red-700 w-5 h-5 p-1 rounded-full"/>}</span>
                      <span>{getCreatedDate(data.createdAt)}</span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Warehouse;
