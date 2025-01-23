import { Button, Select, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux-toolkit/store/store";

interface ActionsOnOrderInterface {
  order: any;
  setRefreshData: (item: any) => void;
  officeUsers: any;
}

const ActionsOnOrder = ({ order, setRefreshData,officeUsers }: ActionsOnOrderInterface) => {
  const [orderRejectMessage, setOrderRejectMessage] = useState<string>("");
  const [responsibleMessage, setResponsibleMessage] = useState<string>(""); 
  const [responsibleUser,setResponsibleUser]=useState<number>(0);
  const [selectedName,setSelectedName] = useState<string>("");


  const { currentUser } = useSelector((state:RootState) => state.auth);

  const navigate=useNavigate();

  console.log(order,"order");
  
  const fullName = `${order.responsibleUser.firstName} ${order.responsibleUser.lastName}`;
  const checkUser=currentUser?.id===order.responsibleUser.id;

  



  const handleChange = (e: any) => {
    const rejectMessage = e.target.value;
    setOrderRejectMessage(rejectMessage);
    // setOrderId(order.id);
  };
  const handleReject = async () => {
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/rejectOrder/${order.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderRejectMessage }),
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

  const acceptOrder=async(id:any)=>{

    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/acceptOrder/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
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
  }

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

  // const resultDate = order.createdAt;



  const selectRepsonsibleUser = async (userId:number,id:number,messageValue:string) => {
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/order/responsibleOrder/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId,messageValue }),
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
  }

  const handleSelectChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    const selectedValue = parseInt(e.target.value);
    setResponsibleUser(selectedValue);
    const selectedName = e.target.selectedOptions[0].text;
    setSelectedName(selectedName);
       if(selectedValue){
         const confirm = window.confirm(
           `"${selectedName}" sifarişi davam etsin?`
          );
          console.log(confirm,"confirm");
          
          if (confirm) {
            selectRepsonsibleUser(selectedValue,order.id,responsibleMessage); // Send update to backend if confirmed
            // setRefreshData((prev: any) => !prev);
          }
       }
  }

  return (
    <div className="mt-5">
      <h2 className=" bg-orange-300 py-5 px-5 rounded-sm font-semibold">
        Sifarişlər üzərində hərəkətlər
      </h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {/* <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr> */}
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4 text-black">Müraciət tarixi</td>
              <td className="px-6 py-4">{changeFormatDate(order.createdAt)}</td>
              <td className="px-6 py-4"></td>
              <td className="px-20 py-4"></td>
              <td className="px-20 py-4"></td>
              <td className="px-20 py-4"></td>
              <td className="px-20 py-4"></td>
            </tr>
            {order.confirm && (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4 text-black flex flex-col">
                  <span>Bölmə rəhbərin təsdiqi</span>
                  <span>logistika və xidmətin inkişafı</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <h2 className="text-black">Mesaj</h2>
                    <Textarea rows={5} className="my-2" name="acceptMessage" />
                    <Button type="button" color={"blue"} size={"xs"} onClick={()=>acceptOrder(order.id)}>
                      Təsdiqlə
                    </Button>
                  </div>
                </td>
                <td className="px-6 py-4">
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
                      onClick={handleReject}
                    >
                      İmtina et
                    </Button>
                  </div>
                </td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
              </tr>
            )}

            {order.accept&& (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4 text-black flex flex-col">
                  <span>Bölmə rəhbərin təsdiqi</span>
                  <span>logistika və xidmətin inkişafı</span>
                </td>
                <td className="px-6 py-4">{changeFormatDate(order.confirmDate)}</td>
                <td className="px-6 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
              </tr>
            )}
            {
              order.isResponsible&&(
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4 text-black flex flex-col">
                  <span>Sifarişdən cavabdehdir</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div>
                      <h2 className="text-black">Mesaj</h2>
                      <Textarea rows={5} className="my-2" onChange={(e:any)=>setResponsibleMessage(e.target.value)}/>
                      <Select sizing="sm" value={responsibleUser || ""} onChange={handleSelectChange}>
                      {/* <option value=" ">Cavabdeh olan şəxsi seç</option> */}
                        {
                          officeUsers.map((user:any)=>(
                            <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                          ))
                        }
                      </Select>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
              </tr>
              )
            }
                {
              !order.isResponsible&&order.accept&&!checkUser&&(
                <>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4 text-black flex flex-col">
                  <span>Sifarişdən cavabdehdir</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                   <span>{changeFormatDate(order.responsibleDate)}</span>
                  <span>{`(${fullName})`}</span>
                  </div>
                  </td>
                <td className="px-6 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
              </tr>
               <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
               <td className="px-6 py-4 text-grey-500 flex flex-col">
                 <span>Cavabdeh işə başladı</span>
               </td>
               <td className="px-6 py-4"></td>
               <td className="px-6 py-4"></td>
               <td className="px-20 py-4"></td>
               <td className="px-20 py-4"></td>
               <td className="px-20 py-4"></td>
               <td className="px-20 py-4"></td>
             </tr>
             </>
              )
            }

           {
              !order.isResponsible&&order.accept&&checkUser&&(
                <>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4 text-black flex flex-col">
                  <span>Sifarişdən cavabdehdir</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                   <span>{changeFormatDate(order.responsibleDate)}</span>
                  <span>{`(${fullName})`}</span>
                  </div>
                  </td>
                <td className="px-6 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
                <td className="px-20 py-4"></td>
              </tr>
               <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
               <td className="px-6 py-4 text-grey-500 flex flex-col">
                 <span>Cavabdeh işə başladı</span>
               </td>
               <td className="px-6 py-4">
                <div>
                  <h2>Mesaj</h2>
                  <Textarea rows={5} className="my-2"/>
                  <Button color={"blue"} size="xs">Başla</Button>
                </div>
               </td>
               <td className="px-6 py-4"></td>
               <td className="px-20 py-4"></td>
               <td className="px-20 py-4"></td>
               <td className="px-20 py-4"></td>
               <td className="px-20 py-4"></td>
             </tr>
             </>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActionsOnOrder;
