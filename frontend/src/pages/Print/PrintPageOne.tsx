import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCardDetails } from "../../api/allApi";

const PrintPageOne = () => {
  const [cardDetails, setCardDetails] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchCardDetails(id).then((res) => setCardDetails(res));
  }, [id]);

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
        return type;
    }
  };

  const totalPrice = cardDetails?.cardJobs?.reduce(
    (acc: number, job: any) => acc + job.price,
    0
  );

  return (
    <div className="bg-white text-black text-[13px] p-2 print:p-1 max-w-full">
      {/* LOGO */}
      <div className="text-center mb-3 mt-10">
        <img src="../images/man.jpg" alt="MAN" className="mx-auto h-14" />
      </div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start border-b pb-1 mb-3 mt-10">
        <p>
          <b>İş kartı №:</b> {cardDetails?.id || "-"}
        </p>
        <p>
          <b>Qəbulçu:</b>{" "}
          {cardDetails ? `${cardDetails.user?.firstName} ${cardDetails.user?.lastName}` : "-"}
        </p>
      </div>

      {/* CAR INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-1 mb-3">
        <p>
          <b>Tarix</b> <span>(açılma-baglama)</span>:{" "}
          {cardDetails && formatDate(cardDetails.openDate)} -
          {cardDetails?.closeDate ? ` - ${formatDate(cardDetails.closeDate)}` : ""}
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
        <p>
          <b>Müştəri adı:</b> {cardDetails?.client?.companyName || "-"}
        </p>
        <p>
          <b>Telefon:  {cardDetails?.client?.companyRepresentative} (</b> {cardDetails?.client?.phoneNumber || "-"})
        </p>
        <p>
          <b>Ödəniş forması:</b> {paymentTypeFind(cardDetails?.paymentType || "")}
        </p>
      </div>

      {/* NASAZLIQLAR */}
      <div className="bg-gray-100 px-2 py-1 font-semibold mt-4 mb-2 rounded">Nasazlıqlar</div>
      <Table className="w-full border-collapse text-[13px]">
        <Table.Head className="bg-gray-100">
          <Table.HeadCell>Nasazlığın adı</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {cardDetails?.cardProblems?.length ? (
            cardDetails.cardProblems.map((problem: any, i: number) => (
              <Table.Row key={i} className="border-b border-gray-300">
                <Table.Cell className="pl-1">{problem.description}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell className="pl-1">Məlumat yoxdur</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      {/* GÖRÜLƏN İŞLƏR */}
      <div className="bg-gray-100 px-2 py-1 font-semibold mt-4 mb-2 rounded">Görülən işlər</div>
      <Table className="w-full border-collapse text-[13px]">
        <Table.Head className="bg-gray-100">
          <Table.HeadCell>İşin adı</Table.HeadCell>
          <Table.HeadCell>Kodu</Table.HeadCell>
          <Table.HeadCell>AV</Table.HeadCell>
          <Table.HeadCell>Qiyməti</Table.HeadCell>
          <Table.HeadCell>Endirim</Table.HeadCell>
          <Table.HeadCell>Yekun</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {cardDetails?.cardJobs?.length ? (
            cardDetails.cardJobs.map((job: any, i: number) => (
              <Table.Row key={i} className="border-b border-gray-300">
                <Table.Cell className="pl-1">{job.name}</Table.Cell>
                <Table.Cell>{job.code}</Table.Cell>
                <Table.Cell>{job.av}</Table.Cell>
                <Table.Cell>{job.av * 50} AZN</Table.Cell>
                <Table.Cell>{job.discount}%</Table.Cell>
                <Table.Cell>{job.price} AZN</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={6} className="pl-1">
                Məlumat yoxdur
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      {/* TOTAL */}
      <div className="text-right font-semibold mt-3 text-[13px]">
        Cəmi: {totalPrice || 0} AZN
      </div>

      {/* SIGNATURE */}
      <div className="mt-6 text-[13px] mb-10">
        <p>
          Avtomobilin kabinasında qiymətli, zərərli və kabinanı qaldırarkən xələl gətirə biləcək heç
          nə yoxdur. Bunu öz imzamla təsdiqləyirəm.
        </p>
        <p className="mt-4">İmza: ____________________</p>
      </div>
    </div>
  );
};

export default PrintPageOne;
