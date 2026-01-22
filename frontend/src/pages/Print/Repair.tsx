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

  const mergedTableData = [
    ...(cardDetails?.cardJobs || []).map((job: any) => ({
      type: "job",
      id: job.id,
      code: "",
      name: job.name,
      quantity: "", // iş saatı
      price: job.price,
      discount: job.discount,
      date: job.createdAt,
      av: job.av,
      discountPrice: job.discountPrice // iş saatı üçün əlavə dəyər
    })),

    ...(cardDetails?.expenses || []).map((expense: any) => ({
      name: expense.description,
      price: expense.price,
    })),

    ...(cardDetails?.cardParts || []).map((part: any) => ({
      type: "part",
      id: part.id,
      code: part.code,
      name: part.partName,
      quantity: part.count, // hissə sayı
      price: part.soldPrice,
      discount: part.discount,
      date: part.date,
    })),
  ];
  // const totalAmount = mergedTableData.reduce((sum: number, item: any) => {
  //   // JOB
  //   if (item.type === "job") {
  //     return (
  //       sum +
  //       (cardDetails.paymentType === "internal"
  //         ? item.price / (1 - item.discount / 100)
  //         : item.av * 50)
  //     );
  //   }

  //   // PART
  //   return sum + item.price * (item.quantity || 1);
  // }, 0);

  const totalAmountWithDiscount = mergedTableData.reduce(
    (sum: number, item: any) => {
      // JOB
        if (item.type === "job") {
      return (
        sum +
        (cardDetails.paymentType === "internal"
          ? Number(item.discountPrice)
          : Number(item.discountPrice))
      );
    }

      // PART
      return (
        sum +
        item.price * (item.quantity || 1) * (1 - (item.discount || 0) / 100)
      );
    },
    0
  );

  // const totalDiscount = totalAmount - totalAmountWithDiscount;

  const finalAmountAfterDiscount = totalAmountWithDiscount;

  const vat = finalAmountAfterDiscount * 0.18;
  const finalTotal = finalAmountAfterDiscount + vat;

  const date = formatAzDate(cardDetails?.closeDate) || "";

  console.log({ cardDetails, finalTotal });

  return (
    <div className="bg-gray-200 min-h-screen  print:bg-white print:p-0 font-[Times_New_Roman] w-2/3 print:w-full">
      {/* A4 */}
      <div className=" bg-white  min-h-[297mm] px-[20mm] py-[15mm] text-[14px] text-black  print:shadow-none">
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
            <p className="mt-10 font-bold">{date}</p>
          </div>
        </div>

        <div className="flex justify-between  w-1/2 "></div>

        {/* DATE */}

        {/* TITLE */}
        <h1 className="text-center font-bold text-[16px] mt-4">
          Təmir aktı № {cardDetails?.repair?.repairId}/
          {getYear(cardDetails?.closeDate)}
        </h1>

        {/* INFO */}
        <p className="mt-6 text-[13px]">
          <strong>{cardDetails?.carNumber}</strong> DQN texnikada{" "}
          <strong>{formatAzDate(cardDetails?.openDate)}</strong> tarixində
          görülmüş işin dəyəri (<strong>İş kartı № {cardDetails?.id}</strong>)
        </p>

        {/* TABLE */}
        <table className="w-1/2 border border-black border-collapse mt-4 text-[13px] print:w-full">
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
              <th className="border border-black p-1 w-[20mm]">Qiymət AZN</th>
              <th className="border border-black p-1 w-[20mm]">Məbləğ AZN</th>
            </tr>
          </thead>

          <tbody>
            {mergedTableData &&
              mergedTableData.map((item: any, i: number) => {
                // const quantity = Number(item?.quantity) || 1;
                const price = Number(item?.price) || 0;
                const discount = Number(item?.discount) || 0;

                const discountedPrice = price * (1 - discount / 100);
                // const total = quantity * (price * (1 - discount / 100));
                return (
                  <tr key={i}>
                    <td className="border border-black text-center">{i + 1}</td>
                    <td className="border border-black">
                      {item?.code ? item.code : ""}
                    </td>
                    <td className="border border-black p-1">{item?.name}</td>
                    <td className="border border-black text-center">
                      {item?.quantity ? item.quantity : ""}
                    </td>
                    <td className="border border-black text-center">
                      {item?.quantity === ""
                        ? ""
                        : parseFloat(discountedPrice.toFixed(2))}
                    </td>
                    <td className="border border-black text-center">
                      {item.quantity === ""
                        ? parseFloat(
                            (item.price * (1 - item.discount / 100||1)).toFixed(2)
                          )
                        : parseFloat(
                            (item.price * (1 - item.discount / 100||1)*(item.quantity || 1)).toFixed(2)
                          )}
                    </td>
                  </tr>
                );
              })}

            <tr className="font-bold">
              <td
                colSpan={5}
                className="border border-black text-right pr-2 font-bold"
              >
                Cəmi
              </td>
              <td className="border border-black text-center">
                {parseFloat(finalAmountAfterDiscount.toFixed(2))}
              </td>
            </tr>

            <tr className="font-bold">
              <td colSpan={5} className="border border-black text-right pr-2 ">
                ƏDV
              </td>
              <td className="border border-black text-center">
                {parseFloat(vat.toFixed(2))}
              </td>
            </tr>

            <tr>
              <td
                colSpan={5}
                className="border border-black text-right pr-2 font-bold"
              >
                Yekun
              </td>
              <td className="border border-black text-center font-bold">
                {parseFloat(finalTotal.toFixed(2))}
              </td>
            </tr>
          </tbody>
        </table>

        {/* SIGN */}
        <div className="flex justify-between mt-10">
          <div className="flex gap-2">
            <p className="font-bold">Təhvil verdi</p>
            <div>
              <div className="border-b border-black w-[50mm] mt-6"></div>
              <p className="text-[11px] text-center font-bold">
                (
                {`${cardDetails?.user?.firstName} ${cardDetails?.user?.lastName}`}
                )
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <p className="font-bold">Təhvil aldı</p>
            <div>
              <div className="border-b border-black w-[50mm] mt-6"></div>
              <p className="text-[11px] text-right">(İmza, Soyad)</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 text-[12px]">
          <p>AZ1063, Bakı, Salyan Şossesi 15-ci km</p>
          <p>Tel: (012)5260200 &nbsp; Fax: (012)4480300</p>
          <p>E-mail: info@itb.az</p>
          <a href="https://itb.az/" target="_blank">Web Site: www.itb.az</a>
        </div>
      </div>
    </div>
  );
};

export default Repair;
