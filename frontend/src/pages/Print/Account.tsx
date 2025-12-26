import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCardDetails } from "../../api/allApi";
import { formatAzDate, getYear } from "../../utilis/utilis";

const Account = () => {
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

  console.log({ cardDetails });

  //  const mergedTableData = [
  //   ...(cardDetails?.cardParts || []).map((part: any) => ({
  //     type: "part",
  //     id: part.id,
  //     code: part.code,
  //     name: part.partName,
  //     quantity: part.count, // hissə sayı
  //     price: part.soldPrice,
  //     discount: part.discount,
  //     date: part.date,
  //   })),
  //   ...(cardDetails?.cardJobs || []).map((job: any) => ({
  //     type: "job",
  //     id: job.id,
  //     code: "",
  //     name: job.name,
  //     quantity: "", // iş saatı
  //     price: job.price,
  //     discount: job.discount,
  //     date: job.createdAt,
  //     av: job.av, // iş saatı üçün əlavə dəyər
  //   })),
  // ];

  const totalJobsPrice = cardDetails?.cardJobs?.reduce(
    (sum: any, item: any) => {
      const price = Number(item?.price) || 0;
      return sum + price;
    },
    0
  );


console.log({ totalJobsPrice: parseFloat(totalJobsPrice.toFixed(2)) });  

  const totalPartsPrice = cardDetails?.cardParts?.reduce(
  (sum:any, item:any) => {
    const quantity = Number(item?.count) || 1;
    const price = Number(item?.soldPrice) || 0;
    const discount = Number(item?.discount) || 0;

    const itemTotal =
      quantity * (price * (1 - discount / 100));

    return sum + itemTotal;
  },
  0
) || 0;

  return (
    <div className=" min-h-screen py-6 print:bg-white print:py-0 w-2/3 print:w-full">
      <div
        className="
          min-h-[297mm] bg-white 
          p-[20mm] text-black
           print:shadow-none
          font-serif text-[14px]
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div className="space-y-1 ">
            <h2 className="text-lg font-bold">Improtex Trucks & Buses</h2>
            <p className="font-semibold">
              MAN Truck & Bus AG-nin Azərbaycanda Rəsmi İdxalçısı
            </p>

            <div className="mt-2 text-md italic font-bold">
              <p>VÖEN: 1400726411</p>
              <p>“Rabitabank” ASC, Mərkəz filial</p>
              <p>H/h: AZ61NABZ013501000000006944</p>
              <p>SWIFT: RBTAAZ22</p>
            </div>
          </div>

          <img
            src="../../../public/images/man.jpg"
            alt="MAN"
            className="w-[120px]"
          />
        </div>

        {/* TITLE */}

        <div className="text-center my-6">
          <h1 className="text-3xl font-bold print:text-xl">
            Hesab № {cardDetails?.account?.accountID}
          </h1>
        </div>

        {/* CUSTOMER */}
        <div className="mb-4 font-bold text-xl print:text-sm">
          <div className="flex justify-between items-center">
            <p>
              <strong>Sifarişçi:</strong> {cardDetails?.client?.companyName}
            </p>
            <p className="text-center">
              {formatAzDate(cardDetails?.closeDate)}
            </p>
          </div>
          <p>
            <strong>VÖEN:</strong> {cardDetails?.client?.voen}
          </p>
        </div>

        {/* DESCRIPTION */}
        <p className="mb-4">
          <strong>{cardDetails?.client?.contractDate}</strong> tarixli{" "}
          <strong>{cardDetails?.client?.contractNumber}</strong> № -li
          müqaviləyə <strong>{cardDetails?.repair?.repairId}/</strong>
          <strong>{getYear(cardDetails?.openDate)}</strong> N-li Təmir Aktına
          əsasən
        </p>

        {/* TABLE */}
        <table className="w-full border border-black border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-black p-1 font-bold text-center">
                Ödənişin məzmunu
              </th>
              <th className="border border-black p-1">Miqdarı</th>
              <th className="border border-black p-1">Qiyməti (AZN)</th>
              <th className="border border-black p-1">Məbləğ (AZN)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 font-bold text-center">
                Ehtiyat Hissələri
              </td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center">
                {/* {parseFloat(totalPartsPrice.toFixed(2))} */}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold text-center">
                Texniki xidmət
              </td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center">
                {/* {parseFloat(totalJobsPrice.toFixed(2))} */}
              </td>
            </tr>
          </tbody>
        </table>

        {/* TOTALS */}
        <div className="w-[300px] ml-auto mt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>CƏMİ:</span>
            <span>{""}</span>
          </div>
          <div className="flex justify-between">
            <span>ƏDV 18%:</span>
            <span>{""}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Yekun:</span>
            <span>{""}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 text-sm">
          <p>
            Servis müqaviləsinə əsasən ödəniş 7 iş günü ərzində həyata
            keçirilməlidir
          </p>

          <div className="mt-6">
            <p>AZ1063, Bakı, Salyan Şossesi 15-ci km</p>
            <p>Tel: (012) 5260200 | Fax: (012) 4480300</p>
            <p>E-mail: info@itb.az | www.man.az</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
