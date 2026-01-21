import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCardDetails } from "../../api/allApi";
import { Table } from "flowbite-react";
import { yearWithSuffix } from "../../utilis/utilis";

const Agreement = () => {
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

  console.log(cardDetails);
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const date = formatDate(cardDetails?.openDate);
  const contractDate = cardDetails?.client?.contractDate;

  // console.log({contractDate});

  const mergedTableData = [
    ...(cardDetails?.cardJobs || []).map((job: any) => ({
      type: "job",
      id: job.id,
      code: job.code,
      name: job.name,
      quantity: "", // iş saatı
      price: job.price,
      discount: job.discount,
      date: job.createdAt,
      av: job.av, // iş saatı üçün əlavə dəyər
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

  console.log({ mergedTableData });

  const totalAmount = mergedTableData.reduce((sum: number, item: any) => {
    // JOB
    if (item.type === "job") {
      return (
        sum +
        (cardDetails.paymentType === "internal"
          ? Number(item.price) 
          : item.av * 50)
      );
    }

    // PART
    return sum + item.price * (item.quantity || 1);
  }, 0);

  const totalAmountWithDiscount = mergedTableData.reduce(
    (sum: number, item: any) => {
      // JOB → artıq discountlu gəlir
      if (item.type === "job") {
        return sum + Number(item.price);
      }

      // PART → burada discount tətbiq olunur
      return (
        sum +
        Number(item.price) * (item.quantity || 1) * (1 - (item.discount || 0) / 100)
      );
    },
    0
  );

  const totalDiscount = totalAmount - totalAmountWithDiscount;

  const finalAmountAfterDiscount = totalAmount - totalDiscount;

  const vat = finalAmountAfterDiscount * 0.18;
  const finalTotal = finalAmountAfterDiscount + vat;

  return (
    <div className="bg-white text-black p-10 text-sm print:p-0">
      {/* TARİX */}
      <div className="text-right mb-4">
        <span className="font-semibold">Tarix:</span>{" "}
        <span>
          {date}
          {yearWithSuffix(date)}
        </span>
      </div>

      {/* BAŞLIQ */}
      <h1 className="text-center font-bold text-lg mb-6">
        QİYMƏTLƏRİN RAZILAŞDIRILMASI PROTOKOLU
      </h1>

      {/* MƏTN */}
      <p className="mb-4 leading-6">
        <strong>{cardDetails?.client?.companyName}</strong> ilə{" "}
        <strong>"Improtex Trucks and Buses" MMC</strong> arasında bağlanmış{" "}
        <strong>{contractDate}</strong> il tarixli{" "}
        <strong>{cardDetails?.client?.contractNumber}</strong> №-li Müqaviləyə
        uyğun olaraq, malların (iş və xidmətlərin) qiymətləri aşağıdakı kimi
        razılaşdırılır:
      </p>

      {/* CƏDVƏL */}
      <div className="border border-black w-6/12 print:w-full">
        <Table>
          <Table.Head>
            <Table.HeadCell className="border border-black w-12 text-center">
              Sıra №
            </Table.HeadCell>
            <Table.HeadCell className="border border-black">
              Malların (iş və xidmətlərin) adı
            </Table.HeadCell>
            <Table.HeadCell className="border border-black w-24 text-center">
              Miqdar
            </Table.HeadCell>
            <Table.HeadCell className="border border-black w-24 text-center">
              Qiyməti
            </Table.HeadCell>
            <Table.HeadCell className="border border-black w-28 text-center">
              Məbləği
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y divide-black text-black">
         {mergedTableData
  ?.filter(
    (item: any) =>
      item.name ||
      item.price > 0 ||
      item.quantity > 0
  )
  .map((item: any, i: number) => (
    <Table.Row key={i}>
      <Table.Cell className="border border-black text-center">
        {i + 1}
      </Table.Cell>

      <Table.Cell className="border border-black">
        {item.name}
      </Table.Cell>

      <Table.Cell className="border border-black text-center">
        {item.quantity > 0 ? item.quantity : ""}
      </Table.Cell>

      <Table.Cell className="border border-black text-center">
        {item.price > 0 && item.quantity !== "" ? item.price : ""}
      </Table.Cell>

      <Table.Cell className="border border-black text-center">
        {item.price > 0
          ? item.quantity === ""
            ? parseFloat(
                (item.price / (1 - item.discount / 100)).toFixed(2)
              )
            : parseFloat(
                (item.price * (item.quantity || 1)).toFixed(2)
              )
          : ""}
      </Table.Cell>
    </Table.Row>
  ))}

            <Table.Row>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold">
                Cəmi:
              </Table.Cell>
              <Table.Cell className="border border-black text-center font-semibold">
                {parseFloat(totalAmount.toFixed(2))} AZN
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold">
                Güzəşt:
              </Table.Cell>
              <Table.Cell className="border border-black text-center font-semibold">
                {parseFloat(totalDiscount.toFixed(2))} AZN
              </Table.Cell>
            </Table.Row>

            {/* CƏM */}

            <Table.Row>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-center font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>{" "}
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-center font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold">
                Cəmi:
              </Table.Cell>
              <Table.Cell className="border border-black text-center font-semibold">
                {parseFloat((totalAmount - totalDiscount).toFixed(2))} AZN
              </Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold">
                ƏDV - 18%:
              </Table.Cell>
              <Table.Cell className="border border-black text-center font-semibold">
                {parseFloat(vat.toFixed(2))} AZN
              </Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-bold">
                YEKUN:
              </Table.Cell>
              <Table.Cell className="border border-black text-center font-bold">
                {parseFloat(finalTotal.toFixed(2))} AZN
              </Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
              <Table.Cell className="border border-black text-right font-semibold"></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      {/* İMZALAR */}
      <div className="flex justify-between mt-5">
        <div className="w-1/3">
          <p className="font-semibold mb-10">ALICI:</p>
          <div className="border-t border-black w-full mb-2"></div>
          <p className="text-sm">M.Y.</p>
        </div>

        <div className="w-1/3 text-right">
          <p className="font-semibold mb-10">SATICI:</p>
          <div className="border-t border-black w-full mb-2"></div>
          <p className="text-sm">M.Y.</p>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
