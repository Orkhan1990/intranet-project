import { Link } from "react-router-dom";
import { exportToExcel } from "../../utilis/exportExcell";

const IncomingTable = ({
  incomingCards,
  loading,
}: {
  incomingCards: any[];
  loading: boolean;
}) => {
  console.log({ incomingCards }, "incoming");

  return (
    <div>
      {loading && incomingCards?.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">Yüklənir...</p>
      )}

      {!loading && incomingCards?.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">
          Nəticə tapılmadı
        </p>
      )}
      {incomingCards && incomingCards?.length > 0 && (
        <div className="mt-10 overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 whitespace-nowrap">#</th>
                <th className="p-3 whitespace-nowrap">Orig Kod</th>
                <th className="p-3 whitespace-nowrap">Kod</th>
                <th className="p-3 whitespace-nowrap">Ad</th>
                <th className="p-3 whitespace-nowrap">Brend</th>
                <th className="p-3 whitespace-nowrap">Sifariş nömrəsi</th>
                <th className="p-3 whitespace-nowrap">Təchizatçı</th>
                <th className="p-3 whitespace-nowrap">Say(daxil olan)</th>
                <th className="p-3 whitespace-nowrap">Say(satılan)</th>
                <th className="p-3 whitespace-nowrap">Maya dəyəri</th>
                <th className="p-3 whitespace-nowrap">Satış qiyməti</th>
                <th className="p-3 whitespace-nowrap">Maya dəyəri(Cəmi)</th>
                <th className="p-3 whitespace-nowrap">Satış qiyməti(Cəmi)</th>
                <th className="p-3 whitespace-nowrap">Tarix</th>
              </tr>
            </thead>

            <tbody>
              {incomingCards?.map((card: any) => {
                return (
                  <tr
                    key={card.no}
                    className={"border-b odd:bg-white even:bg-gray-200"}
                  >
                    <td className="p-3">{card.no}</td>
                    <td className="p-3">
                      <Link to={""}>{card.origCode}</Link>
                    </td>
                    <td className="p-3">
                      <Link to={""}>{card.code}</Link>
                    </td>
                    <td className="p-3">{card.name}</td>
                    <td className="p-3">{card.brand}</td>
                    <td className="p-3">
                      {card?.orderNumber === "0" ? (
                        card?.comment
                      ) : (
                        <Link
                          className="hover:underline hover:text-blue-800"
                          to={`/editOrder/${card?.orderNumber}`}
                        >
                          {card?.orderNumber}
                        </Link>
                      )}
                    </td>{" "}
                    <td className="p-3 text-center">{card.supplier}</td>
                    <td className="p-3">{card.quantityIn}</td>
                    <td className="p-3">{card.quantitySold}</td>
                    <td className="p-3">{card.cost}</td>
                    <td className="p-3">{card.sellPrice}</td>
                    <td className="p-3">{card.totalCost}</td>
                    <td className="p-3">{card.totalSellPrice}</td>
                    <td className="p-3">
                      {new Date(card.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
              <tr className={"border-b"}>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3 font-bold">
                  {incomingCards?.reduce(
                    (sum: number, card: any) => sum + card.quantityIn,
                    0,
                  )}
                </td>
                <td className="p-3 font-bold">
                  {incomingCards?.reduce(
                    (sum: number, card: any) => sum + card.quantitySold,
                    0,
                  )}
                </td>
                <td className="p-3 font-bold">
                  {incomingCards?.reduce(
                    (sum: number, card: any) => sum + card.cost,
                    0,
                  )}
                </td>
                <td className="p-3 font-bold">
                  {incomingCards?.reduce(
                    (sum: number, card: any) => sum + card.sellPrice,
                    0,
                  )}
                </td>
                <td className="p-3 font-bold">
                  {incomingCards.reduce(
                    (sum: number, card: any) => sum + card.totalCost,
                    0,
                  )}
                </td>
                <td className="p-3 font-bold">
                  {incomingCards?.reduce(
                    (sum: number, card: any) => sum + card.totalSellPrice,
                    0,
                  )}
                </td>
              </tr>
            </tbody>
          </table>
            <button
              onClick={() => exportToExcel(incomingCards, "incomingCards")}
              className=" text-blue-700 underline hover:text-blue-500 px-4 py-2 rounded"
            >
              Excel export
            </button>
        </div>
      )}
    </div>
  );
};

export default IncomingTable;
