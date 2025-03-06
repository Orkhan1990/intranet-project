import { useEffect, useState } from "react";
import { DeliverType, OrderType, PayType } from "../../enums/projectEnums";
import {
  ClientInterface,
  OrderPartsInterface,
  UserInterface,
} from "../../types";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const Order = () => {
  const [orders, setOrders] = useState<AllOrdersInterface[]>([]);
  const [error, setError] = useState("");
  console.log(orders,"salaaaa");
  

  console.log(orders);

  interface OrderHistory{
    stage:string,
    confirm:boolean,
    confirmDate:string,
    accept:boolean,
    acceptDate:string,
    acceptMessage:string
  }

  interface AllOrdersInterface {
    id: number;
    project: string;
    cardNumber: string;
    orderType: OrderType;
    client: ClientInterface;
    manufacturer: string;
    model: string;
    chassisNumber: string;
    engineNumber: string;
    produceYear: string;
    km: string;
    status: string;
    stage: string;
    vehicleNumber: string;
    paymentType: PayType;
    delivering: DeliverType;
    deliveringType: string;
    initialPayment: number;
    orderHistory:OrderHistory[],
    comment: string;
    oil: boolean;
    user: UserInterface;
    orderParts: OrderPartsInterface[];
    createdAt: string;
  }

  

  const getStageResult = (result:any) => {
    // const currentStep=result.orderHistory[result.orderHistory.length-1]?.step
    switch (result) {
      case "created":
        return "Sifariş yaradıldı";
      case "warehouseConfirm":
      return "Anbardar təsdiqi";
      case "orderresposibility":
      return "Sifariş üçün cavabdehdir";
      case "responsibleUser":
        return "Məsul şəxs işə başladı";
      case "invastigation":
        return "Bazar araşdırması aparılır";
      case "calculation":
        return "Hesablama aparılır";
        case "finish":
          return "Sifariş tamamlandı"
      default:
        return "";
    }
  };

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/order/getAllOrders",
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
        }
        setOrders(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    getAllOrders();
  }, []);


  //Change TIME FORMAT

  const getHour = (time: string) => {
    const localDate = new Date(time);
    console.log(localDate);

    // Convert to local time and extract the hour and minute
    const hours = localDate.getHours().toString().padStart(2, "0");
    const minutes = localDate.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const getFullDate = (time: string) => {
    const date = time.substring(0, 10);
    const dateArray = date.split("-");
    const reverseDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;

    return reverseDate;
  };

  return (
    <div className="min-h-screen mt-[100px] mb-[100px]  ">
      {orders.length > 0 ? (
        <div className="relative">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-[10px]"></th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Müştəri
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Maşın üçün
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Faktura
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Faktura №
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Ödəniş növü
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Çatdırılma üsulu
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Yaradılıb
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  İlkin ödəniş (%)
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Say
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Satış qiyməti
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Mərhələ
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Müraciət tarixi
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Anbar təsdiqi
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Məsuliyyətli və başlanğıc tarixi
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Təchizatçıya müraciət
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Təchizatçının cavabı
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Sifariş
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Mühasibat təsdiqi
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Ödəniş
                </th>
                <th scope="col" className="px-6 py-3 text-[10px]">
                  Göndərmə
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders.map((order: AllOrdersInterface, index: number) => (
                  <tr
                    className=" text-black odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    key={index}
                  >
                    <td className="px-6 py-4"></td>
                     <td className="px-6 py-4"><Link to={`/editOrder/${order.id}`} >{order.id}</Link></td>
                    <td className="px-6 py-4"><Link to={`/editOrder/${order.id}`} >{order.client.companyName}</Link></td>
                    <td className="px-6 py-4">{order.manufacturer}</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        className="text-xs w-20 py-1 rounded-sm outline-none "
                      />
                    </td>
                    <td className="px-6 py-4">{order.paymentType}</td>
                    <td className="px-6 py-4">{order.delivering}</td>
                    <td className="px-3 py-4 text-xs">
                      {order.user.firstName} {order.user.lastName}
                    </td>
                    <td className=" px-6 py-4 text-xs">
                      {order.initialPayment} %
                    </td>
                    <td className=" px-6 py-4 text-xs">0</td>
                    <td className=" px-6 py-4 text-xs"></td>
                    <td className=" px-6 py-4 text-xs">
                      {getStageResult(order.stage)}
                    </td>
                    <td className="flex flex-col px-4 py-4 text-xs">
                      <span>{getHour(order.createdAt)}</span>
                      <span>{getFullDate(order.createdAt)}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Link to="/createOrder" ><Button color={"blue"} className="mx-16 my-5" size={"xs"}>Əlavə et +</Button></Link>

        </div>
      ) : (
        <div className="ml-20">
          <p className="text-black">Sifarişlər mövcud deyil</p>
          <Link to="/createOrder">
            <Button color={"blue"} className="mt-2 flex gap-5" size={"xs"}>
              Əlavə et
              <span className="ml-2">+</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Order;
