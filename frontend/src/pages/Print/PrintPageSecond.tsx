import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCardDetails } from "../../api/allApi";

const PrintPageSecond = () => {
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

  console.log(id);

  console.log(cardDetails);
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const paymentTypeFind = (type: string) => {
    switch (type) {
      case "cash":
        return "Nağd ödəniş";
      case "transfer":
        return "Köçürülmə";
      case "warranty":
        return "Zəmanət";
      case "pos":
        return "POS";
      case "internal":
        return "Daxili hesablaşma";
      default:
        return type || "-";
    }
  };
  const formatPrice = (value: number | undefined | null) => {
    if (value == null) return "-"; // undefined və null üçün
    const fixed = Number(value.toFixed(2));
    return Number.isInteger(fixed) ? fixed : fixed.toString();
  };

  const totalExpences = cardDetails?.expenses?.reduce(
    (acc: number, expence: any) => acc + expence.price,
    0
  );

  const sparePartsTotal =
    cardDetails?.cardParts?.reduce(
      (acc: number, p: any) =>
        acc + p.soldPrice * (1 - (p.discount ?? 0) / 100) * p.count,
      0
    ) || 0;

  const totalPrice = cardDetails?.cardJobs?.reduce(
    (acc: number, job: any) => acc + (Number(job.discountPrice)),
    0
  );

  const jobsTotal =
    cardDetails?.cardJobs?.reduce((acc: number, j: any) => acc + (+(j.discountPrice)), 0) ||
    0;

  const total = sparePartsTotal + jobsTotal + totalExpences;
  const vat = total * 0.18;
  const grandTotal = total + vat;

  return (
    <div className="bg-white text-black  print:p-2 max-w-full text-sm print:text-xs">
      {/* LOGO */}
      <div className="mb-4 mt-4 print:flex print:justify-end">
        <img
          src="../images/man.jpg"
          alt="MAN"
          className="h-14 mx-auto print:mx-0 print:h-12"
        />
      </div>

      {/* HEADER */}
      <div className="bg-gray-200 py-2 pl-6 border-t-[1px] border-black">
        <div className="grid grid-cols-3 items-start print:flex print:justify-between">
          {/* SOL – İş kartı */}
          <div className="text-left">
            <p>
              <b>İş kartı №:</b> {cardDetails?.id || "-"}
            </p>
          </div>

          {/* ORTA – Qəbulçu */}
          <div className="flex flex-col items-center print:items-end print:ml-auto print:text-right">
            <p>
              <b>Qəbulçu:</b>{" "}
              {cardDetails
                ? `${cardDetails?.user?.firstName} ${cardDetails?.user?.lastName}`
                : "-"}
            </p>
          </div>
          <div />
        </div>
      </div>

      {/* CAR INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 mb-3 print:mb-2 pl-5 mt-5">
        <div className="flex flex-col gap-2">
          <p>
            <b>Tarix(açılış-bağlanış):</b>
            <br />
            <span>
              {cardDetails
                ? `${formatDate(cardDetails?.openDate)} - 
            ${
              cardDetails?.closeDate
                ? ` - ${formatDate(cardDetails.closeDate)}`
                : ""
            }`
                : "-"}
            </span>
          </p>
          <p>
            <b>VIN:</b> {cardDetails?.qostNumber || "-"}
          </p>
          <p>
            <b>Müştəri adı:</b> {cardDetails?.client?.companyName || "-"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p>
            <b>Marka:</b> {cardDetails?.manufactured || "-"}
          </p>
          <p>
            <b>Model:</b> {cardDetails?.model || "-"}
          </p>

          <p>
            <b>Telefon:</b> {cardDetails?.client?.phoneNumber || "-"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p>
            <b>Mühərrik:</b> {cardDetails?.engine || "-"}
          </p>
          <p>
            <b>Buraxılış ili:</b> {cardDetails?.produceDate || "-"}
          </p>

          <p>
            <b>Ödəniş forması:</b>{" "}
            {paymentTypeFind(cardDetails?.paymentType || "")}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p>
            <b>DQN:</b> {cardDetails?.carNumber || "-"}
          </p>
          <p>
            <b>Yürüş:</b> {cardDetails?.km ? `${cardDetails.km} km` : "-"}
          </p>
        </div>
      </div>

      {/* NASAZLIQLAR */}
      <div className="bg-gray-200 font-semibold py-2 pl-6 border-t-[1px] border-black mt-5">
        Nasazlıqlar
      </div>
      <div className="overflow-x-auto  mt-5">
        <table className="w-full border-collapse">
          <tbody>
            {cardDetails?.cardProblems?.length ? (
              cardDetails?.cardProblems.map((problem: any, i: number) => (
                <tr key={i} className="border-b border-gray-300">
                  <td className="pl-5 py-1">{problem.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="pl-1 py-1">Məlumat yoxdur</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* GÖRÜLƏN İŞLƏR */}
      <div className="bg-gray-200 font-semibold py-2 pl-6 border-t-[1px] border-black mt-5">
        Görülən işlər
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="table-auto border-collapse ">
          <thead>
            <tr>
              <th className="px-6 py-2 text-left">İşin adı</th>
              <th className="px-4 py-2 text-left">Kodu</th>
              <th className="px-4 py-2 text-center">AV</th>
              <th className="px-4 py-2 text-right">Qiyməti</th>
              <th className="px-4 py-2 text-center">Endirim</th>
              <th className="px-4 py-2 text-right">Yekun</th>
            </tr>
          </thead>
          <tbody>
            {cardDetails?.cardJobs?.map((job: any, i: number) => (
              <tr key={i} className="border-b border-gray-300">
                <td className="px-6 py-2 truncate">{job.name}</td>
                <td className="px-4 py-2 truncate">{job.code}</td>
                <td className="px-4 py-2 text-center">{parseFloat(job.av)}</td>
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  {formatPrice(Number(job.price))}
                </td>
                <td className="px-4 py-2 text-center">{parseFloat(job.discount)}%</td>
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  {formatPrice(Number(job.discountPrice))}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={5}
                className="px-4 py-2 text-right font-semibold"
              ></td>
              <td className="font-semibold">Cəmi: {formatPrice(totalPrice || 0)} AZN</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* EHTİYAT HİSSƏLƏRİ */}
      <div className="bg-gray-200 font-semibold py-2 pl-6 border-t-[1px] border-black mt-5">
        Ehtiyat hissələri
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="table-auto border-collapse w-auto">
          <thead>
            <tr>
              <th className="px-6 py-2 text-left">E/H kodu</th>
              <th className="px-4 py-2 text-left">E/H adı</th>
              <th className="px-4 py-2 text-center">Say(Əd/L/M)</th>
              <th className="px-4 py-2 text-right">Qiyməti</th>
              <th className="px-4 py-2 text-center">Endirim</th>
              <th className="px-4 py-2 text-right">Qiyməti</th>
              <th className="px-4 py-2 text-right">Ümumi məbləğ</th>
            </tr>
          </thead>
          <tbody>
            {cardDetails?.cardParts?.map((part: any, i: number) => (
              <tr key={i} className="border-b border-gray-300">
                <td className="px-6 py-2 truncate">{part.partName}</td>
                <td className="px-4 py-2 truncate">{part.code}</td>
                <td className="px-4 py-2 text-center">{part.count}</td>
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  {formatPrice(part.soldPrice)}
                </td>
                <td className="px-4 py-2 text-center">{part.discount ?? 0}%</td>
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  {formatPrice(
                    part.soldPrice * (1 - (part.discount ?? 0) / 100)
                  )}
                </td>
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  {formatPrice(
                    part.count *
                      (part.soldPrice * (1 - (part.discount ?? 0) / 100))
                  )}
                </td>
              </tr>
            ))}
            <tr className="font-semibold border-t border-gray-400">
              <td colSpan={6} className="px-4 py-2 text-right"></td>
              <td className="px-4 py-2 text-right whitespace-nowrap">
                Cəmi: {sparePartsTotal ? formatPrice(sparePartsTotal) : "0"} AZN
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-gray-200 font-semibold py-2 pl-6 border-t-[1px] border-black mt-5">
        Əlavə xərclər
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="table-auto border-collapse w-auto">
          <thead>
            <tr>
              <th className="px-6 py-2 text-left">İşin adı</th>
              <th className="px-4 py-2 text-left">Çəkilən xərc</th>
            </tr>
          </thead>

          <tbody>
            {cardDetails?.expenses?.map((expence: any, i: number) => (
              <tr key={i} className="border-b border-gray-300">
                <td className="px-6 py-2 truncate">{expence.description}</td>
                <td className="px-4 py-2 truncate">{expence.price}</td>
              </tr>
            ))}
            <tr className="font-semibold border-t border-gray-400">
              <td colSpan={1} className="px-4 py-2 text-right"></td>
              <td className="px-4 py-2 text-right whitespace-nowrap">
                Cəmi: {totalExpences ? formatPrice(totalExpences) : "0"} AZN
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
      {/* Comment */}
      <div className="bg-gray-200 font-semibold py-2 pl-6 border-t-[1px] border-black mt-5">
        İşə şərh
      </div>
      <div className="mt-2 mb-6 pl-5">
        {cardDetails?.comments ? cardDetails.comments : "Məlumat yoxdur"}
      </div>

        <div className="bg-gray-200 font-semibold py-2 pl-6 border-t-[1px] border-black mt-5">
      </div>

      {/* FOOTER */}
      <div className="flex  mt-6 mb-10">
        <div className="flex flex-col w-1/2 print:w-2/3 gap-2">
          <div className="flex pl-5 ">
            <span className="font-semibold w-44">Servis üzrə direktor müavini</span>
            <span className="mt-4">______________________</span>
            <span className="font-semibold">Asif Rzayev</span>
          </div>
          <div className="flex pl-5 mt-2">
            <span className="font-semibold w-44">Müştərinin imzası</span>
            <span className="mt-4">______________________</span>
          </div>
          <div className="flex pl-5 mt-2">
            <span className="font-semibold w-44">Qəbulçu</span>
            <span className="mt-4">______________________</span>
            <span className="font-semibold">
              {cardDetails?.user?.firstName
                ? `${cardDetails.user.firstName} ${cardDetails.user.lastName}`
                : "-"}
            </span>
          </div>
        </div>

        <div className="flex   font-semibold mt-4 sm:mt-0">
          <div className="w-full">
            <div className="flex justify-between border-b py-1">
              <span>Cəmi:</span>
              <span>{formatPrice(total)} AZN</span>
            </div>
            <div className="flex justify-between border-b py-1">
              <span>ƏDV (18%):</span>
              <span>{formatPrice(vat)} AZN</span>
            </div>
            <div className="flex gap-2 justify-between py-1">
              <span>Cəmi ƏDV ilə:</span>
              <span>{formatPrice(grandTotal)} AZN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPageSecond;
