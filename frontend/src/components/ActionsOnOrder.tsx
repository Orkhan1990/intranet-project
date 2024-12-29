const ActionsOnOrder = ({ order }: any) => {


    const changeFormatDate=(resultDate:Date)=>{
      const date = new Date(resultDate);
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");
    
      let day = date.getDate().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-based month
      let year = date.getFullYear();
    
      let formattedDate = `${hours}:${minutes} ${day}-${month}-${year}`;
      return formattedDate
    }

  // const resultDate = order.createdAt;


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
            {(order.confirm)?(<tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
               <td className="px-6 py-4 text-black flex flex-col"><span>Bölmə rəhbərin təsdiqi</span><span>logistika və xidmətin inkişafı</span></td>
               <td className="px-6 py-4">{changeFormatDate(order.confirmDate)}</td>
               <td className="px-6 py-4"></td>
               <td className="px-20 py-4"></td>
               <td className="px-20 py-4"></td>
               <td className="px-20 py-4"></td>
               <td className="px-20 py-4"></td>
             </tr>):("")
               
            }
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActionsOnOrder;
