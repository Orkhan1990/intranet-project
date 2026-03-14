import { Link } from "react-router-dom";

const IncomingTable = ({
  cards,
  loading,
}: {
  cards: any[];
  loading: boolean;
}) => {
  console.log({ cards }, "incoming");

  return (
    <div>
      {loading && cards.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">Yüklənir...</p>
      )}

      {!loading && cards.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">
          Nəticə tapılmadı
        </p>
      )}
      {cards && cards.length > 0 && (
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
              {cards?.map((card: any) => {
                return (
                  <tr key={card.no} className={"border-b"}>
                    <td className="p-3">{card.no}</td>
                    <td className="p-3">
                      <Link to={""}>{card.origCode}</Link>
                    </td>
                    <td className="p-3">
                      <Link to={""}>{card.code}</Link>
                    </td>
                    <td className="p-3">{card.name}</td>
                    <td className="p-3">{card.brand}</td>
                    <td className="p-3">{` ${card.orderNumber==="0" ? card.comment : card.orderNumber}`}</td>
                    <td className="p-3 text-center">{card.supplier}</td>
                    <td className="p-3">{card.quantityIn}</td>
                    <td className="p-3">{card.quantitySold}</td>
                    <td className="p-3">{card.cost}</td>
                    <td className="p-3">{card.sellPrice}</td>
                    <td className="p-3">{card.totalCost}</td>
                    <td className="p-3">{card.totalSellPrice}</td>
                    <td className="p-3">
                      {new Date(card.date).toLocaleDateString("az-AZ", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
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
                  {cards.reduce(
                    (sum: number, card: any) => sum + card.quantityIn,
                    0,
                  )}
                </td>
                <td className="p-3 font-bold">
                  {cards.reduce(
                    (sum: number, card: any) => sum + card.quantitySold,
                    0,
                  )}
                </td>
                <td className="p-3 font-bold">
                  {cards.reduce((sum: number, card: any) => sum + card.cost, 0)}
                </td>
                <td className="p-3 font-bold">
                  {cards.reduce(
                    (sum: number, card: any) => sum + card.sellPrice,
                    0,
                  )}
                </td>
                <td className="p-3 font-bold">
                  {cards.reduce(
                    (sum: number, card: any) => sum + card.totalCost,
                    0,
                  )}
                </td>
                <td className="p-3 font-bold">
                  {cards.reduce(
                    (sum: number, card: any) => sum + card.totalSellPrice,
                    0,
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IncomingTable;
