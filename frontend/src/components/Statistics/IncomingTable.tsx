import { Link } from "react-router-dom";

const IncomingTable = ({ cards, loading }: { cards: any[]; loading: boolean }) => {
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
              {cards?.map((card: any, index: number) => {
             

                return (
                  <tr
                    key={card.id}
                    className={"border-b"}
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
                      Salam
                    </td>
                    <td className="p-3">
                      Salam
                    </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    )}
    </div>
  )
}

export default IncomingTable