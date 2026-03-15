import { Link } from "react-router-dom";
import { exportToExcel } from "../../utilis/exportExcell";

const WorkerCardTable = ({
  workerCards,
  loading,
}: {
  workerCards: any[];
  loading: boolean;
}) => {
  const warrantyStatusColor = (payment: string, warrantyStatus: string) => {
    if (payment !== "warranty") return "hover:bg-gray-50 transition";
    switch (warrantyStatus) {
      case "none":
        return "bg-red-600 ";
      case "send":
        return "bg-yellow-200";
      case "paid":
        return "bg-green-500";
      default:
        return "";
    }
  };
  return (
    <div>
      {loading && workerCards?.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">Yüklənir...</p>
      )}

      {!loading && workerCards?.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">
          Nəticə tapılmadı
        </p>
      )}
      {workerCards?.length > 0 && (
        <div className="mt-10 overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 whitespace-nowrap">#</th>
                <th className="p-3 whitespace-nowrap">Kart №</th>
                <th className="p-3 whitespace-nowrap">Maşın</th>
                <th className="p-3 whitespace-nowrap">DQN</th>
                <th className="p-3 whitespace-nowrap">Şassi</th>
                <th className="p-3 whitespace-nowrap">Müştəri</th>
                <th className="p-3 whitespace-nowrap">1C Data</th>
                <th className="p-3 whitespace-nowrap">İşçilik</th>
                <th className="p-3 whitespace-nowrap">İşçiyə</th>
                <th className="p-3 whitespace-nowrap">AV</th>
                <th className="p-3 whitespace-nowrap">E/h hissə</th>
                <th className="p-3 whitespace-nowrap">E/h maya</th>
                <th className="p-3 whitespace-nowrap">Əlavə xərclər</th>
                <th className="p-3 whitespace-nowrap">ƏDV-siz</th>
                <th className="p-3 whitespace-nowrap">ƏDV qiymət</th>
                <th className="p-3 whitespace-nowrap">Ödənişli</th>
                <th className="p-3 whitespace-nowrap">Valyuta</th>
                <th className="p-3 whitespace-nowrap">Təmir/Hesab</th>
                <th className="p-3 whitespace-nowrap">Açdı</th>
                <th className="p-3 whitespace-nowrap">Açılma</th>
                <th className="p-3 whitespace-nowrap">Bağladı</th>
                <th className="p-3 whitespace-nowrap">Bağlanma</th>
              </tr>
            </thead>

            <tbody>
              {workerCards?.map((card: any, index: number) => {
                const totalExpenses = card?.expenses?.reduce(
                  (sum: number, exp: any) => sum + (exp.price ?? 0),
                  0,
                );

                const countTotalPrice =
                  (card?.workSum ?? 0) +
                  (card?.partsTotalPrice ?? 0) +
                  (totalExpenses ?? 0);
                const edvPrice = countTotalPrice + countTotalPrice * 0.18;

                return (
                  <tr
                    key={card.id}
                    className={`border-b   ${warrantyStatusColor(card.paymentType, card.warrantyStatus)}`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      <Link to={`/updateCard/${card.id}`}>{card.id}</Link>
                    </td>
                    <td className="p-3">
                      <Link to={`/updateCard/${card.id}`}>
                        {card.manufactured} {card.model}
                      </Link>
                    </td>
                    <td className="p-3">{card.carNumber}</td>
                    <td className="p-3">{card.sassi}</td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span>{card.client?.companyName}</span>
                        <span className="text-xs text-gray-500">
                          {card.client?.typeOfStatus}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-center">/</td>
                    <td className="p-3">
                      {parseFloat(card.workSum.toFixed(2))}
                    </td>
                    <td className="p-3">
                      {parseFloat(card.workSumOwn.toFixed(2))}
                    </td>
                    <td className="p-3">{parseFloat(card.avSum.toFixed(2))}</td>
                    <td className="p-3">
                      {parseFloat(card.partsTotalPrice.toFixed(2)) ?? 0}
                    </td>
                    <td className="p-3">
                      {parseFloat(card?.partsSumOwn.toFixed(2)) ?? 0}
                    </td>
                    <td className="p-3">
                      {parseFloat(totalExpenses.toFixed(2)) ?? 0}
                    </td>
                    <td className="p-3">
                      {parseFloat(countTotalPrice.toFixed(2))}
                    </td>
                    <td className="p-3">{parseFloat(edvPrice.toFixed(2))}</td>
                    <td className="p-3"></td>
                    <td className="p-3">/</td>
                    <td className="p-3">
                      {card?.repair?.repairId}/{card?.account?.accountID}
                    </td>
                    <td className="p-3">{`${card?.user?.firstName} ${card?.user?.lastName}`}</td>
                    <td className="p-2 text-center">
                      {card.openDate
                        ? new Date(card.openDate).toLocaleString("az-AZ", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>
                    <td className="p-3 text-center">
                      {card?.closedByUser
                        ? `${card.closedByUser.firstName} ${card.closedByUser.lastName}`
                        : "-"}
                    </td>{" "}
                    <td className="p-2 text-center">
                      {card.closeDate
                        ? new Date(card.closeDate).toLocaleString("az-AZ", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>
                  </tr>
                );
              })}
              <tr className="border-b">
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3 font-bold">
                  {Number(
                    workerCards
                      ?.reduce(
                        (sum, card) => sum + Number(card.workSum), // workSum-i Number-ə çeviririk
                        0,
                      )
                      .toFixed(2), // iki onluq dəqiqlik üçün
                  )}
                </td>
                <td className="p-3 font-bold">
                  {Number(
                    workerCards
                      ?.reduce((sum, card) => sum + Number(card.workSumOwn), 0)
                      .toFixed(2),
                  )}
                </td>
                <td className="p-3 font-bold">
                  {Number(
                    workerCards
                      ?.reduce((sum, card) => sum + Number(card.avSum), 0)
                      .toFixed(2),
                  )}
                </td>
                <td className="p-3 font-bold">
                  {Number(
                    workerCards
                      ?.reduce(
                        (sum, card) => sum + Number(card.partsTotalPrice),
                        0,
                      )
                      .toFixed(2),
                  )}
                </td>
                <td className="p-3 font-bold">
                  {Number(
                    workerCards
                      ?.reduce((sum, card) => sum + Number(card.partsSumOwn), 0)
                      .toFixed(2),
                  )}
                </td>
                <td className="p-3 font-bold">
                  {Number(
                    workerCards
                      ?.reduce(
                        (sum, card) =>
                          sum +
                          Number(
                            card.expenses.reduce(
                              (a: any, b: any) => a + b.price,
                              0,
                            ),
                          ),
                        0,
                      )
                      .toFixed(2),
                  )}
                </td>

                <td className="p-3 font-bold">
                  {Number(
                    workerCards
                      ?.reduce((sum, card) => {
                        const total =
                          card.workSum +
                          card.partsTotalPrice +
                          card.expenses.reduce(
                            (a: any, b: any) => a + b.price,
                            0,
                          );
                        return sum + parseFloat(total.toFixed(2));
                      }, 0)
                      .toFixed(2),
                  )}
                </td>
                <td className="p-3 font-bold">
                  {Number(
                    workerCards
                      ?.reduce((sum, card) => {
                        const total =
                          (card.workSum +
                            card.partsTotalPrice +
                            card.expenses.reduce(
                              (a: any, b: any) => a + b.price,
                              0,
                            )) *
                          1.18;
                        return sum + parseFloat(total.toFixed(2));
                      }, 0)
                      .toFixed(2),
                  )}
                </td>
              </tr>
            </tbody>
          </table>
            <button
              onClick={() => exportToExcel(workerCards, "workerCards")}
              className="text-blue-700 underline hover:text-blue-500 px-4 py-2 rounded"
            >
              Excel export
            </button>
        </div>
      )}
    </div>
  );
};

export default WorkerCardTable;
