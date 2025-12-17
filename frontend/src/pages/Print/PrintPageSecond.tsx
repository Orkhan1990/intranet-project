import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCardDetails } from "../../api/allApi";

export const PrintPageSecond = () => {
  const [cardDetails, setCardDetails] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchCardDetails(id).then((res) => setCardDetails(res));
  }, [id]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
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

  const formatPrice = (value: number) => {
    const fixed = Number(value.toFixed(2));
    return Number.isInteger(fixed) ? fixed : fixed.toString();
  };

  const sparePartsTotal =
    cardDetails?.spareParts?.reduce(
      (acc: number, p: any) => acc + p.totalPrice,
      0
    ) || 0;

  const jobsTotal =
    cardDetails?.cardJobs?.reduce((acc: number, j: any) => acc + j.price, 0) ||
    0;

  const total = sparePartsTotal + jobsTotal;
  const vat = total * 0.18;
  const grandTotal = total + vat;

  return (
    <div className="bg-white text-black p-4 print:p-2 max-w-full text-sm print:text-xs">
      {/* LOGO */}
      <div className="text-center mb-4 mt-4 print:mt-0">
        <img
          src="../images/man.jpg"
          alt="MAN"
          className="mx-auto h-14 print:h-12"
        />
      </div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2 mb-3 print:mb-2">
        <p>
          <b>İş kartı №:</b> {cardDetails?.id || "-"}
        </p>
        <p>
          <b>Qəbulçu:</b>{" "}
          {cardDetails
            ? `${cardDetails.user?.firstName} ${cardDetails.user?.lastName}`
            : "-"}
        </p>
      </div>

      {/* CAR INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-3 print:mb-2">
        <p>
          <b>Tarix:</b>{" "}
          {cardDetails
            ? `${formatDate(cardDetails.openDate)}${
                cardDetails.closeDate
                  ? ` - ${formatDate(cardDetails.closeDate)}`
                  : ""
              }`
            : "-"}
        </p>
        <p>
          <b>VIN:</b> {cardDetails?.qostNumber || "-"}
        </p>
        <p>
          <b>Marka:</b> {cardDetails?.manufactured || "-"}
        </p>
        <p>
          <b>Model:</b> {cardDetails?.model || "-"}
        </p>
        <p>
          <b>Mühərrik:</b> {cardDetails?.engine || "-"}
        </p>
        <p>
          <b>Buraxılış ili:</b> {cardDetails?.produceDate || "-"}
        </p>
        <p>
          <b>DQN:</b> {cardDetails?.carNumber || "-"}
        </p>
        <p>
          <b>Yürüş:</b> {cardDetails?.km ? `${cardDetails.km} km` : "-"}
        </p>
      </div>

      {/* CLIENT INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 print:mb-2">
        <p>
          <b>Müştəri adı:</b> {cardDetails?.client?.companyName || "-"}
        </p>
        <p>
          <b>Telefon:</b> {cardDetails?.client?.phoneNumber || "-"}
        </p>
        <p>
          <b>Ödəniş forması:</b>{" "}
          {paymentTypeFind(cardDetails?.paymentType || "")}
        </p>
      </div>

      {/* NASAZLIQLAR */}
      <div className="bg-gray-100 px-2 py-1 font-semibold mt-4 mb-2 rounded print:mt-2 print:mb-1">
        Nasazlıqlar
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {cardDetails?.cardProblems?.length ? (
              cardDetails.cardProblems.map((problem: any, i: number) => (
                <tr key={i} className="border-b border-gray-300">
                  <td className="pl-1 py-1">{problem.description}</td>
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
      <div className="bg-gray-100 px-2 py-1 font-semibold mt-4 mb-2 rounded print:mt-2 print:mb-1">
        Görülən işlər
      </div>
      <div className="overflow-x-auto mb-4">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 border-b border-gray-400">
            <tr>
              <th className="px-1 py-1 text-left">İşin adı</th>
              <th className="px-1 py-1 text-left">Kodu</th>
              <th className="px-1 py-1 text-center">AV</th>
              <th className="px-1 py-1 text-right">Qiyməti</th>
              <th className="px-1 py-1 text-center">Endirim</th>
              <th className="px-1 py-1 text-right">Yekun</th>
            </tr>
          </thead>
          <tbody>
            {cardDetails?.cardJobs?.map((job: any, i: number) => (
              <tr key={i} className="border-b border-gray-300">
                <td className="px-1 py-1 truncate">{job.name}</td>
                <td className="px-1 py-1 truncate">{job.code}</td>
                <td className="px-1 py-1 text-center">{job.av}</td>
                <td className="px-1 py-1 text-right whitespace-nowrap">
                  {formatPrice(job.av * 50)} AZN
                </td>
                <td className="px-1 py-1 text-center">{job.discount}%</td>
                <td className="px-1 py-1 text-right whitespace-nowrap">
                  {formatPrice(job.price)} AZN
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EHTİYAT HİSSƏLƏRİ */}
      <div className="bg-gray-100 px-2 py-1 font-semibold mb-2 rounded print:mb-1">
        Ehtiyat hissələri
      </div>
      <div className="overflow-x-auto mb-4">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 border-b border-gray-400">
            <tr>
              <th className="px-1 py-1 text-left">E/H kodu</th>
              <th className="px-1 py-1 text-left">E/H adı</th>
              <th className="px-1 py-1 text-center">Say(Əd/L/M)</th>
              <th className="px-1 py-1 text-right">Qiyməti</th>
              <th className="px-1 py-1 text-center">Endirim</th>
              <th className="px-1 py-1 text-right">Qiyməti</th>
              <th className="px-1 py-1 text-right">Ümumi</th>
            </tr>
          </thead>
          <tbody>
            {cardDetails?.spareParts?.map((part: any, i: number) => (
              <tr key={i} className="border-b border-gray-300">
                <td className="px-1 py-1 truncate">{part.name}</td>
                <td className="px-1 py-1 truncate">{part.code}</td>
                <td className="px-1 py-1 text-center">{part.quantity}</td>
                <td className="px-1 py-1 text-right whitespace-nowrap">
                  {formatPrice(part.price)} AZN
                </td>
                <td className="px-1 py-1 text-center">—</td>
                <td className="px-1 py-1 text-right whitespace-nowrap">
                  {formatPrice(part.totalPrice)} AZN
                </td>
              </tr>
            ))}
            <tr className="font-semibold border-t border-gray-400">
              <td colSpan={5} className="px-1 py-1 text-right">
                Cəmi
              </td>
              <td className="px-1 py-1 text-right whitespace-nowrap">
                {formatPrice(sparePartsTotal)} AZN
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col sm:flex-row justify-between mt-6">
        <div className="flex flex-col gap-2 w-full sm:w-1/3">
          <div className="flex flex-col">
            <span className="font-semibold">Servis üzrə direktor müavini</span>
            <span className="mt-4">______________________</span>
            <span>Asif Rzayev</span>
          </div>
          <div className="flex flex-col mt-2">
            <span className="font-semibold">Müştərinin imzası</span>
            <span className="mt-4">______________________</span>
          </div>
          <div className="flex flex-col mt-2">
            <span className="font-semibold">Qəbulçu</span>
            <span className="mt-4">______________________</span>
            <span>
              {cardDetails.user
                ? `${cardDetails.user?.firstName} ${cardDetails.user?.lastName}`
                : "-"}
            </span>
          </div>
        </div>

        <div className="flex items-end w-full sm:w-1/3 font-semibold mt-4 sm:mt-0">
          <div className="w-full">
            <div className="flex justify-between border-b py-1">
              <span>Cəmi:</span>
              <span>{formatPrice(total)} AZN</span>
            </div>
            <div className="flex justify-between border-b py-1">
              <span>ƏDV (18%):</span>
              <span>{formatPrice(vat)} AZN</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Cəmi ƏDV ilə:</span>
              <span>{formatPrice(grandTotal)} AZN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
