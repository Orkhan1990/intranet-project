// import { Table } from "flowbite-react";

import { useEffect, useState } from "react";
import { fetchCardDetails } from "../../api/allApi";
import { useParams } from "react-router-dom";
import { formatAzDate, getYear } from "../../utilis/utilis";

const Repair = () => {
    const [cardDetails, setCardDetails] = useState<any>(null);
   
     const { id } = useParams();
   
     useEffect(() => {
       if (!id) return;
   
       const getData = async () => {
         try {
           const data = await fetchCardDetails(id);
           setCardDetails(data);
         } catch (err) {
           console.error(err);
         }
       };
   
       getData();
     }, [id]);

     const date=formatAzDate(cardDetails?.closeDate)||""

     

  return (
    <div className="bg-gray-200 min-h-screen  print:bg-white print:p-0 font-[Times_New_Roman]">

      {/* A4 */}
      <div className=" bg-white  min-h-[297mm] px-[20mm] py-[15mm] text-[14px] text-black shadow print:shadow-none">

        {/* HEADER */}
        <div className="flex justify-between">

          {/* LEFT */}
          <div className="w-1/2 text-[13px] leading-5 font-bold">
            <p>Improtex Trucks & Buses</p>
            <p>MAN Truck & Bus AG-nin Azərbaycanda Rəsmi İdxalçısı</p>

            <div className="mt-6">
              <p className="font-bold">"Təsdiq edirəm"</p>
              <p>"Improtex Trucks and Buses" MMC-nin</p>
              <p>Servis xidmətləri üzrə direktor müavini</p>
               

               <div className="w-1/2">
              <div className="mt-8 border-b border-black"></div>
              <p className="text-[11px] text-right">(İmza, Soyad)</p>
               </div>
            </div>
                      <p className="mt-10">Bakı şəhəri</p>

          </div>

          {/* RIGHT */}
          <div className="w-1/2 text-center text-[13px]">
            <img
              src="../../../public/images/man.jpg"
              alt="MAN"
              className="mx-auto h-[20mm] mb-2"
            />

            <p className="font-bold">"Təsdiq edirəm"</p>
            <p>NORM ASC</p>
            <p>{cardDetails?.client.approver}</p>

            <div className="mt-8 border-b border-black w-[60mm] mx-auto"></div>
             <p className="mt-10 font-bold">
          {date}
        </p>
          </div>
        </div>

        <div className="flex justify-between  w-1/2 ">
          
        </div>

        {/* DATE */}
      

        {/* TITLE */}
        <h1 className="text-center font-bold text-[16px] mt-4">
          Təmir aktı № {cardDetails?.repair?.repairId}/{getYear(cardDetails?.closeDate)}
        </h1>

        {/* INFO */}
        <p className="mt-6 text-[13px]">
          77JB967 DQN texnikada 24 Dekabr 2025 tarixində görülmüş işin dəyəri
          (iş kartı № 725742)
        </p>

        {/* TABLE */}
        <table className="w-full border border-black border-collapse mt-4 text-[13px]">
          <thead>
            <tr>
              <th className="border border-black p-1 w-[8mm]">№</th>
              <th className="border border-black p-1 w-[30mm]">
                Ehtiyat hissəsinin kodu
              </th>
              <th className="border border-black p-1">
                Satılmış işin və eh/h adı
              </th>
              <th className="border border-black p-1 w-[15mm]">Miqdarı</th>
              <th className="border border-black p-1 w-[20mm]">Qiyməti AZN</th>
              <th className="border border-black p-1 w-[20mm]">Məbləğ AZN</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border border-black text-center">1</td>
              <td className="border border-black"></td>
              <td className="border border-black p-1">
                2 ədəd Ön təkərin demontajı şinmontajı və montajı
              </td>
              <td className="border border-black text-center"></td>
              <td className="border border-black text-center"></td>
              <td className="border border-black text-center">30</td>
            </tr>

            <tr>
              <td className="border border-black text-center">2</td>
              <td className="border border-black"></td>
              <td className="border border-black p-1">
                2 ədəd təkərin balans olunması
              </td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black text-center">40</td>
            </tr>

            <tr>
              <td colSpan={5} className="border border-black text-right pr-2">
                Cəmi
              </td>
              <td className="border border-black text-center">70</td>
            </tr>

            <tr>
              <td colSpan={5} className="border border-black text-right pr-2">
                ƏDV
              </td>
              <td className="border border-black text-center">12.6</td>
            </tr>

            <tr>
              <td colSpan={5} className="border border-black text-right pr-2 font-bold">
                Yekun
              </td>
              <td className="border border-black text-center font-bold">
                82.6
              </td>
            </tr>
          </tbody>
        </table>

        {/* SIGN */}
        <div className="flex justify-between mt-10">
          <div>
            <p>Təhvil verdi</p>
            <div className="border-b w-[50mm] mt-6"></div>
            <p className="text-[11px]">(İmza, Möhür)</p>
          </div>

          <div>
            <p>Təhvil aldı</p>
            <div className="border-b w-[50mm] mt-6"></div>
            <p className="text-[11px]">(İmza, Soyad)</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 text-[12px]">
          <p>AZ1063, Bakı, Salyan Şossesi 15-ci km</p>
          <p>Tel: (012)4480200 &nbsp; Fax: (012)4480300</p>
          <p>E-mail: info@az.man-mn.com</p>
          <p>Internet: www.man.az</p>
        </div>
      </div>

      {/* PRINT BUTTON */}
      <div className="text-center mt-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-black text-white px-6 py-2"
        >
          Çap et
        </button>
      </div>
    </div>
  );
};

export default Repair;
