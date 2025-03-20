import { Button, Select, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux-toolkit/store/store";
import { SupplierInterface } from "../types";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt, FaMinus } from "react-icons/fa";
import { DeliverType, Liquidity, OrderType } from "../enums/projectEnums";
import { FaPlus } from "react-icons/fa6";


interface ActionsOnOrderInterface {
  order: any;
  setRefreshData: (item: any) => void;
  officeUsers: any;
}

// interface CalculationData{
//   supplierId:number,
//   liquidity:Liquidity
// }

const ActionsOnOrder = ({
  order,
  setRefreshData,
  officeUsers,
}: ActionsOnOrderInterface) => {
  const [message, setMessage] = useState<string>("");
  const [responsibleMessage, setResponsibleMessage] = useState<string>("");
  const [suppliers, setSuppliers] = useState<SupplierInterface[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([""]);
  const [selectSupplierForCalculation,setSelectSupplierForCalculation]=useState([
    {
      // id:0,
      // deliverType:DeliverType.Fast
    }
  ]);
  const [error, setError] = useState<string>("");
  const [calculationData, setCalculationData] = useState({
    supplierId:0,
    liquidity:Liquidity.Fast
  });


  useEffect(()=>{

    const supplierId=order.orderHistory[4]?.supplierOrderHistories
    ?.length > 0 &&
    order.orderHistory[4].supplierOrderHistories
      .sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )[0].supplier.id
        setCalculationData((prevData) => ({
          ...prevData,
          supplierId,  // Update supplierId dynamically
        }));
      }
    
  ,[order])

  console.log(calculationData,"calculationData");

 
    

  const handleChangeCalculation=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setCalculationData((prev:any)=>({...prev,[e.target.name]:e.target.value}))
  }

  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: RootState) => state.auth);

  // console.log(order, "order");

  const checkUser = currentUser?.id === order.orderHistory[2]?.user.id;
  // console.log(checkUser, "checkUser");

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/supplier/getSuppliers",
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
          setError(data.message);
        }

        if (res.ok) {
          setSuppliers(data);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getSuppliers();
  }, [order.id]);

  const handleClickFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAddSelect = () => {
    setSelectedSuppliers([...selectedSuppliers, ""]); // Add an empty select option
  };

  const handleReduceSelect = () => {
    if (selectedSuppliers.length > 1) {
      setSelectedSuppliers(selectedSuppliers.slice(0, -1));
    }
  };

  const handleSelectSuppliers = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedSuppliers = [...selectedSuppliers];
    updatedSuppliers[index] = e.target.value; // Update the specific index
    setSelectedSuppliers(updatedSuppliers);
  };

  const sendToSupplier = async (historyId: number) => {
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/sendToSupplier/${order.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, historyId, selectedSuppliers }),
        }
      );
      const data = await res.json();
      if (!res.ok || data.success === false) {
        setError(data.message);
      } else {
        setRefreshData((prev: any) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    const rejectMessage = e.target.value;
    setMessage(rejectMessage);
    // setOrderId(order.id);
  };
  const handleReject = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/rejectOrder/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, orderId: order.id }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setRefreshData((prev: any) => !prev);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptOrder = async (id: any) => {
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/acceptOrder/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, orderId: order.id }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setRefreshData((prev: any) => !prev);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeFormatDate = (resultDate: Date) => {
    const date = new Date(resultDate);
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");

    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-based month
    let year = date.getFullYear();

    let formattedDate = `${hours}:${minutes} ${day}-${month}-${year}`;
    return formattedDate;
  };

  const selectRepsonsibleUser = async (
    userId: number,
    id: number,
    messageValue: string,
    historyId: number
  ) => {
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/responsibleOrder/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, messageValue, historyId }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setRefreshData((prev: any) => !prev);
        navigate(`/editOrder/${order.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    historyId: any
  ) => {
    const selectedValue = parseInt(e.target.value);
    const selectedName = e.target.selectedOptions[0].text;
    if (selectedValue) {
      const confirm = window.confirm(`"${selectedName}" sifarişi davam etsin?`);
      console.log(confirm, "confirm");

      if (confirm) {
        selectRepsonsibleUser(
          selectedValue,
          order.id,
          responsibleMessage,
          historyId
        ); // Send update to backend if confirmed
        // setRefreshData((prev: any) => !prev);
      }
    }
  };

  const startResponsibleUser = async (historyId: any) => {
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/startResponsibleOrder/${order.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, historyId }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setRefreshData((prev: any) => !prev);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const continueNextStep = async (historyId: number) => {
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/calculationStepPass/${order.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ historyId }),
        }
      );

      const data=await res.json();
      if(!res.ok||data.success===false){
        setError(data.message)
      }else{
        setRefreshData((prev:any)=>!prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increaseCalculation=()=>{
        if(selectSupplierForCalculation.length<order.orderHistory[4]?.supplierOrderHistories
          ?.length){
         setSelectSupplierForCalculation((prev)=>[...prev,{}])
        }
  }
  const decreaseCalculation =()=>{
      if(order?.orderHistory?.[4]?.supplierOrderHistories &&
        order.orderHistory[4].supplierOrderHistories.length > 1){
          setSelectSupplierForCalculation((prev) => 
            Array.isArray(prev) && prev.length > 0 ? prev.slice(0,1) : prev
          );
        }
  }


  const calculationOpenNewTab=()=>{
      // Calculate 90% of the screen width and full screen height
      const width = window.innerWidth * 0.9; // 90% of the screen width
      const height = window.innerHeight/1.4;    // Full screen height
  
      // Set the position (optional) - center the window
      const left = (window.innerWidth - width) / 2;  // Center horizontally
      const top = (window.innerHeight - height) / 2; // Center vertically
  
      // Set window features
      const windowFeatures = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`;
      const isStandartClient=order.orderType===OrderType.Standart_Client;
  
    window.open(`http://localhost:5173/calculation?orderId=${order.id}&supplierId=${calculationData.supplierId}&liquidity=${calculationData.liquidity}&isStandartClient=${isStandartClient}`,"_blank",windowFeatures)
  }





    

  return (
    <div className="mt-5">
      <h2 className=" bg-orange-300 py-5 px-5 rounded-sm font-semibold">
        Sifarişlər üzərində hərəkətlər
      </h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {order.orderHistory &&
          order.orderHistory.map((item: any, index: number) => {
            switch (item.step) {
              case "orderConfirm":
                return (
                  <div className="flex text-sm">
                    <div className="w-64 py-6 px-6 text-black">
                      Müraciət tarixi
                    </div>
                    <div className="py-6 px-6  ">
                      {changeFormatDate(order.createdAt)}
                    </div>
                  </div>
                );

              case "orderAccept":
                return (
                  <div className="flex text-sm  odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <div className="w-64 px-6 py-4 text-black flex flex-col">
                      <span>Bölmə rəhbərin təsdiqi</span>
                      <span>logistika və xidmətin inkişafı</span>
                    </div>
                    {item.confirm ? (
                      <>
                        <div className="px-6 py-4">
                          <div>
                            <h2 className="text-black">Mesaj</h2>
                            <Textarea
                              rows={5}
                              className="my-2"
                              name="acceptMessage"
                            />
                            <Button
                              type="button"
                              color={"blue"}
                              size={"xs"}
                              onClick={() => acceptOrder(item.id)}
                            >
                              Təsdiqlə
                            </Button>
                          </div>
                        </div>
                        <div className="px-6 py-4">
                          <div>
                            <h2 className="text-black">İmtina səbəbi</h2>
                            <Textarea
                              rows={5}
                              className="my-2"
                              name="rejectMessage"
                              onChange={handleChange}
                            />
                            <Button
                              type="button"
                              color={"blue"}
                              size={"xs"}
                              onClick={() => handleReject(item.id)}
                            >
                              İmtina et
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-6 py-4">
                          {changeFormatDate(item.date)}
                        </div>
                      </>
                    )}
                  </div>
                );

              case "responsibleFromOrder":
                return (
                  <div className=" flex  text-sm odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ">
                    <div className="w-64 px-6 py-4 text-black flex flex-col">
                      <span>Sifarişdən cavabdehdir</span>
                    </div>
                    {item.confirm ? (
                      <div className="px-6 py-4">
                        <div>
                          <div>
                            <h2 className="text-black">Mesaj</h2>
                            <Textarea
                              rows={5}
                              className="my-2"
                              onChange={(e: any) =>
                                setResponsibleMessage(e.target.value)
                              }
                            />
                            <Select
                              sizing="sm"
                              onChange={(e: any) =>
                                handleSelectChange(e, item.id)
                              }
                            >
                              {officeUsers.map((user: any) => (
                                <option key={user.id} value={user.id}>
                                  {user.firstName} {user.lastName}
                                </option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <div className="px-6 py-4">
                            <div className="flex gap-2">
                              <span>{changeFormatDate(item?.date)}</span>
                            </div>
                          </div>
                          <div>
                            <span>{`(${item?.user.firstName} ${item?.user.lastName})`}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );

              case "responsibleUserBegin":
                return checkUser ? (
                  item.confirm ? (
                    <div className="flex text-sm odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <div className="w-64 px-6 py-4 text-black ">
                        Cavabdeh işə başladı
                      </div>
                      <div className="px-6 py-4">
                        <div>
                          <h2>Mesaj</h2>
                          <Textarea
                            rows={5}
                            className="my-2"
                            onChange={(
                              e: React.ChangeEvent<HTMLTextAreaElement>
                            ) => setMessage(e.target.value)}
                          />
                          <Button
                            color={"blue"}
                            size={"xs"}
                            onClick={() => startResponsibleUser(item.id)}
                          >
                            Başla
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex text-sm items-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <div className="w-64 px-6 py-4 text-black ">
                        Cavabdeh işə başladı
                      </div>
                      <div className="px-6 py-4">
                        <div className="flex gap-2">
                          <span>{changeFormatDate(item?.date)}</span>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="text-sm odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <div className="w-64 px-6 py-4 text-black">
                      Cavabdeh işə başladı
                    </div>
                  </div>
                );

              case "requestSupplier":
                return (
                  checkUser && (
                    <div>
                      <div className="flex text-sm">
                        <div className="w-64 px-6 py-4 text-black">
                          Təchizatçıya sorğu
                        </div>
                        <div className="px-6 py-4">
                          {order.orderHistory[4]?.supplierOrderHistories
                            ?.length > 0 &&
                            order.orderHistory[4].supplierOrderHistories
                              .sort(
                                (a: any, b: any) =>
                                  new Date(a.date).getTime() -
                                  new Date(b.date).getTime()
                              )
                              .map((item: any, index: number) => (
                                <div className="flex gap-2" key={index}>
                                  <span>{changeFormatDate(item.date)}</span>
                                  <div className="flex gap-2">
                                    <span className="text-black font-semibold">
                                      Təchizatçı:
                                    </span>
                                    <Link
                                      to={`/updateSupplier/${item.supplier.id}`}
                                      className="underline text-blue-500"
                                    >
                                      {item.supplier.supplier}
                                    </Link>
                                  </div>
                                </div>
                              ))}

                          {item.showHide && (
                            <div>
                              <h2>Mesaj</h2>
                              <Textarea
                                rows={5}
                                className="my-2 w-80"
                                onChange={(e: any) =>
                                  setMessage(e.target.value)
                                }
                              />
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col gap-2">
                                  {selectedSuppliers.map((_, index: number) => (
                                    <Select
                                      className="w-[500px]"
                                      sizing={"sm"}
                                      key={index}
                                      value={selectedSuppliers[index]}
                                      onChange={(e) =>
                                        handleSelectSuppliers(e, index)
                                      }
                                    >
                                      <option value="">Təchizatçını seç</option>
                                      {suppliers.length > 0 &&
                                        suppliers.map((supplier) => (
                                          <option
                                            key={supplier.id}
                                            value={supplier.id}
                                          >
                                            {supplier.supplier}
                                          </option>
                                        ))}
                                    </Select>
                                  ))}
                                </div>

                                <Button
                                  color={"white"}
                                  className="bg-yellow-400 outline-none rounded-full  text-white hover:bg-yellow-600 "
                                  size={"xs"}
                                  onClick={handleAddSelect}
                                >
                                  +
                                </Button>
                                <Button
                                  color={"white"}
                                  className=" bg-red-400 outline-none rounded-full  text-white hover:bg-red-600 "
                                  size={"xs"}
                                  onClick={handleReduceSelect}
                                >
                                  -
                                </Button>
                                <Button
                                  color={"blue"}
                                  type="button"
                                  size={"xs"}
                                  onClick={() => sendToSupplier(item.id)}
                                >
                                  Göndər
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {item.confirm && (
                        <div className="flex text-sm odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <h2 className="w-64  px-6 py-4 text-black">
                            Təchizatçıdan cavab
                          </h2>

                          <div className="px-6 py-4 flex flex-col gap-3">
                            <h2>Mesaj</h2>
                            <Textarea rows={5} className="w-80" />
                            <div className="flex gap-40 items-center">
                              <div className="flex gap-2 items-center">
                                <Select sizing={"sm"} className="w-80">
                                  {order.orderHistory[4]?.supplierOrderHistories
                                    ?.length > 0 &&
                                    order.orderHistory[4].supplierOrderHistories
                                      .sort(
                                        (a: any, b: any) =>
                                          new Date(a.date).getTime() -
                                          new Date(b.date).getTime()
                                      )
                                      .map((item: any, index: number) => (
                                        <option
                                          value={item.supplier.id}
                                          key={index}
                                        >
                                          {item.supplier.supplier}
                                        </option>
                                      ))}
                                </Select>
                                <TextInput
                                  type="file"
                                  sizing={"xs"}
                                  className="hidden"
                                  ref={fileInputRef}
                                />
                                <Button
                                  size={"xs"}
                                  className="flex  items-center bg-yellow-500 text-white rounded-md"
                                  onClick={handleClickFileUpload}
                                >
                                  <span className="mt-1">Faylı yüklə</span>
                                  <FaCloudUploadAlt className="text-2xl ml-1" />
                                </Button>
                              </div>
                              <Button color={"blue"} size={"xs"}>
                                Yüklə
                              </Button>
                            </div>
                            <Button
                              color={"blue"}
                              size={"xs"}
                              className="w-24"
                              onClick={() => continueNextStep(item.id)}
                            >
                              Davam etmək
                            </Button>
                          </div>
                        </div>
                      )}

                      {!item.confirm && !item.showHide && (
                        <div className="flex text-sm  odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <div className="w-64 px-6 py-4 text-black flex flex-col">
                            Təchizatçıdan cavab
                          </div>
                        </div>
                      )}
                    </div>
                  )
                );

                case "calculationBegin":
                  return(
                    checkUser&&(
                      <div className="flex text-sm ">
                           <div className="w-64 px-6 py-4 text-black flex flex-col">
                                Hesablama
                          </div>

                          <div className="px-6 py-4 flex flex-col gap-3">

                            {
                              selectSupplierForCalculation.map((_,index:number)=>(
                                <div className="flex gap-2 items-center">
                                <Select className="w-72" sizing={"sm"} name="supplierId" onChange={handleChangeCalculation}>
                                {order.orderHistory[4]?.supplierOrderHistories
                                        ?.length > 0 &&
                                        order.orderHistory[4].supplierOrderHistories
                                          .sort(
                                            (a: any, b: any) =>
                                              new Date(a.date).getTime() -
                                              new Date(b.date).getTime()
                                          )
                                          .map((item: any, index: number) => (
                                            <option
                                              value={item.supplier.id}
                                              key={index}
                                            >
                                              {item.supplier.supplier}
                                            </option>
                                          ))}
                                </Select>
                                <Select className="w-52" sizing={"sm"} name="liquidity" onChange={handleChangeCalculation}>
                                  <option value={DeliverType.Fast}>Təcili (7-15 gün)</option>
                                  <option value={DeliverType.Normal_Fast}>Orta təcili (15-30 gün)</option>
                                  <option value={DeliverType.Planned}>Planlı (40-60 gün)</option>
                                </Select>
                              <Button color={"blue"}  onClick={calculationOpenNewTab} size={"xs"} className="cursor-pointer">Hesablama</Button>
                              </div>
                              ))
                            }
                          
                          {
                            order.orderHistory[4]?.supplierOrderHistories
                            ?.length > 1 && (
                              <div className="flex gap-2 items-center ">
                              <Button  className="rounded-lg bg-yellow-500 w-6 h-6 outline-none flex items-center" onClick={increaseCalculation}><FaPlus className="text-white"/></Button>
                              <Button  className="rounded-lg bg-yellow-500 w-6 h-6 outline-none flex items-center" onClick={decreaseCalculation}><FaMinus className="text-white"/></Button> 
                               </div>
                            )
                          }
                           <Button color={"blue"} size={"xs"} className="w-20">Bitirmək</Button>
                          </div>

                      </div>
                    )
                  
                  )

              default:
                break;
            }
          })}
      </div>
    </div>
  );
};

export default ActionsOnOrder;
