const ExpensesTable = ({
  expenseCards,
  loading,
}: {
  expenseCards: any[];
  loading: boolean;
}) => {
  return (
    <div>
      {loading && expenseCards?.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">Yüklənir...</p>
      )}

      {!loading && expenseCards?.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">
          Nəticə tapılmadı
        </p>
      )}

      {expenseCards && expenseCards?.length > 0 && (
        <div className="mt-10 overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">#</th>
                <th className="p-3">Kart Nömrəsi</th>
                <th className="p-3">Kod</th>
                <th className="p-3">Ad</th>
                <th className="p-3">Brend</th>
                <th className="p-3">Miqdar</th>
                <th className="p-3">Müştəri</th>
                <th className="p-3">Ödəmə Növü</th>
                <th className="p-3">Sifariş</th>
                <th className="p-3">Təchizatçı</th>
                <th className="p-3">Maya Dəyəri</th>
                <th className="p-3">Satış Qiyməti</th>
                <th className="p-3">Fərq</th>
                <th className="p-3">Satış Qiyməti (endirimsiz)</th>
                <th className="p-3">Tarix</th>
              </tr>
            </thead>
            <tbody>
              {expenseCards?.map((card, index) => (
                <tr key={index}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{card.cardNumber || "-"}</td>
                  <td className="p-3">{card.code || "-"}</td>
                  <td className="p-3">{card.name || "-"}</td>
                  <td className="p-3">{card.brand || "-"}</td>
                  <td className="p-3">{card.quantityIn || 0}</td>
                  <td className="p-3">{card.client || "-"}</td>
                  <td className="p-3">{card.paymentType || "-"}</td>
                  <td className="p-3">{card.orderNumber || "-"}</td>
                  <td className="p-3">{card.supplier || "-"}</td>
                  <td className="p-3">
                    {Number(card.cost) % 1 === 0
                      ? Number(card.cost)
                      : card.cost.toFixed(2)}
                  </td>
                  <td className="p-3">

                    <div className="flex gap-1">
                      <span>
                           {Number(card.sellPrice) % 1 === 0
                      ? Number(card.sellPrice)
                      : card.sellPrice.toFixed(2)}
                      </span>
                      <span className="text-red-700 font-bold">{`(${-card.discount}%)`}</span>
                    </div>
                 
                  </td>
                  <td className="p-3">
                    {(card.sellPrice - card.cost) % 1 === 0
                      ? card.sellPrice - card.cost
                      : (card.sellPrice - card.cost).toFixed(2)}
                  </td>
                  <td className="p-3">
                    {Number(card.sellPriceWithoutDiscount) % 1 === 0
                      ? Number(card.sellPriceWithoutDiscount)
                      : card.sellPriceWithoutDiscount.toFixed(2)}
                  </td>
                  <td className="p-3">
                    {new Date(card.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
              <tr className={"border-b"}>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3 font-bold">
                  {expenseCards?.reduce(
                    (sum: number, card: any) => sum + card.quantityIn,
                    0,
                  )}
                </td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3 font-bold">
                  {/* {expenseCards?.reduce(
                    (sum: number, card: any) => sum + card.quantitySold,
                    0,
                  )} */}
                </td>
                <td className="p-3 font-bold">
                  {/* {expenseCards?.reduce(
                    (sum: number, card: any) => sum + card.cost,
                    0,
                  )} */}
                </td>
                <td className="p-3 font-bold">
                  {expenseCards?.reduce(
                    (sum: number, card: any) => sum + card.cost,
                    0,
                  )}
                </td>
                <td className="p-3 font-bold">
                  {expenseCards?.reduce(
                    (sum: number, card: any) => sum + card.sellPrice,
                    0,
                  )}
                </td>
                <td className="p-3 font-bold">
                  {expenseCards?.reduce(
                    (sum: number, card: any) => sum + card.difference,
                    0,
                  )}
                </td>
                   <td className="p-3 font-bold">
                  {expenseCards?.reduce(
                    (sum: number, card: any) => sum + card.sellPriceWithoutDiscount,
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

export default ExpensesTable;
