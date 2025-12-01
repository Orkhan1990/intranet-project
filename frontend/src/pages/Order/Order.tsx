import { useEffect} from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { fetchOrders } from "../../redux-toolkit/features/order/orderSlice";
import { RootState, AppDispatch } from '../../redux-toolkit/store/store';
import { useDispatch, useSelector } from 'react-redux';




const Order = () => {


  const { currentUser } = useSelector((state: RootState) => state.auth);

  const { orders} = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();



 

  const getStageResult = (result: any) => {
    switch (result) {
      case "created":
        return "Sifariş yaradıldı";
      case "warehouseConfirm":
        return "Anbardar təsdiqi";
      case "responsibleUser":
        return "Məsul şəxs işə başladı";
      case "requestToSupplier":
        return "Təchizatçıya müraciət";
      case "responseFromSupplier":
        return "Təchizatçıdan cavab gəldi";
      case "giveTheOrder":
        return "Sifariş verildi";
      case "finish":
        return "Sifariş tamamlandı";
      default:
        return "";
    }
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

 

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
                orders.map((order: any, index: number) => {

                    const checkUser = currentUser?.id === order.user.id;
                  return (
                    <tr
                      className={`${checkUser?"text-black bg-red-500":"text-black odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"}`}
                      key={index}
                    >
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4">
                        <Link to={`/editOrder/${order.id}`}>{index + 1}</Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/editOrder/${order.id}`}>
                          {order.client.companyName}
                        </Link>
                      </td>
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
                      <td className="flex flex-col px-4 py-4 text-xs text-center">
                        <span>{getHour(order.createdAt)}</span>
                        <span>{getFullDate(order.createdAt)}</span>
                      </td>

                      <td className=" px-1 py-1 text-xs text-center">
                        {order.confirmWarehouseDate ? (
                          <div className="flex flex-col ">
                            <span>{getHour(order.confirmWarehouseDate)}</span>
                            <span>
                              {getFullDate(order.confirmWarehouseDate)}
                            </span>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </td>

                      <td className=" px-1 py-1 text-xs text-center">
                        {order.responsibleStartDate ? (
                          <div className="flex flex-col ">
                            <span>{getHour(order.responsibleStartDate)}</span>
                            <span>
                              {getFullDate(order.responsibleStartDate)}
                            </span>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </td>

                      <td className=" px-1 py-1 text-xs text-center">
                        {order.requestToSupplierDate ? (
                          <div className="flex flex-col ">
                            <span>{getHour(order.requestToSupplierDate)}</span>
                            <span>
                              {getFullDate(order.requestToSupplierDate)}
                            </span>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </td>

                      <td className=" px-1 py-1 text-xs text-center">
                        {order.respoenseFromSupplierDate ? (
                          <div className="flex flex-col ">
                            <span>
                              {getHour(order.respoenseFromSupplierDate)}
                            </span>
                            <span>
                              {getFullDate(order.respoenseFromSupplierDate)}
                            </span>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </td>

                        <td className=" px-1 py-1 text-xs text-center">
                        {order.giveOrderDate ? (
                          <div className="flex flex-col ">
                            <span>
                              {getHour(order.giveOrderDate)}
                            </span>
                            <span>
                              {getFullDate(order.giveOrderDate)}
                            </span>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </td>

                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Link to="/createOrder">
            <Button color={"blue"} className="mx-16 my-5" size={"xs"}>
              Əlavə et +
            </Button>
          </Link>
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
