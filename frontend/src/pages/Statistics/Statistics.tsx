import { Button } from "flowbite-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // required
import WorkerCard from "../../components/Statistics/WorkerCard";
import Incoming from "../../components/Statistics/Incoming";
import Expenses from "../../components/Statistics/Expenses";
import Briqada from "../../components/Statistics/Briqada";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store";
import {
  fetchCards,
  setActiveTab,
} from "../../redux-toolkit/features/filters/filterSlice";
import { Link } from "react-router-dom";

const Statistics = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const tabs = ["İş kartı", "Gəlir", "Xərc", "Briqada"];

  const filters = useSelector((state: RootState) => state.filter);
  const cards = useSelector((state: RootState) => state.card.cards);
  const activeTab = useSelector((state: RootState) => state.filter.activeTab);

  console.log({ cards, loading });

  const handleFetch = async () => {
    setLoading(true);

    const currentFilters = {
      ...filters,
      startDate: startDate?.toISOString() ?? null,
      endDate: endDate?.toISOString() ?? null,
    };

    // BURDA YALNIZ FETCH ET
    await dispatch(fetchCards(currentFilters));

    setLoading(false);
  };

  return (
    <div className="min-h-screen ">
      <div className=" ml-20 mt-20">
        <form action="" className="flex flex-col  gap-16 ">
          <div className="flex  gap-16 ">
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Başlanğıc tarix
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date: any) => setStartDate(date)}
                  className="border border-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Tarix seçin"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Son tarix
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date: any) => setEndDate(date)}
                  className="border border-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Tarix seçin"
                />
              </div>
              <div className="flex gap-5 items-center">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  Əlavə xərclər
                </label>
                <input
                  type="checkbox"
                  value=""
                  className="text-xs w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full">
              <div className="flex  gap-6 self-start bg-yellow-300 px-6 py-2 rounded-md text-sm font-medium text-black ">
                {tabs.map((tab: any, index: any) => (
                  <span
                    key={index}
                    className={`cursor-pointer hover:underline whitespace-nowrap px-2 py-1 rounded ${
                      activeTab === tab ? "bg-red-700 text-white underline" : ""
                    }`}
                    onClick={() => dispatch(setActiveTab(tab))}
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <div>
                {activeTab === "İş kartı" && <WorkerCard />}
                {activeTab === "Gəlir" && <Incoming />}
                {activeTab === "Xərc" && <Expenses />}
                {activeTab === "Briqada" && <Briqada />}
              </div>
            </div>
          </div>

          <Button
            color={"blue"}
            size={"xs"}
            className="w-28"
            onClick={handleFetch}
          >
            Nəticəyə bax
          </Button>
        </form>
      </div>
      {loading && cards.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">Yüklənir...</p>
      )}

      {cards && cards.length > 0 && (
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
                <th className="p-3 whitespace-nowrap">Bağlanma</th>
              </tr>
            </thead>

            <tbody>
              {cards?.map((card: any, index: number) => {
                const totalExpenses = card?.expenses?.reduce(
                  (sum: number, exp: any) => sum + (exp.price ?? 0),
                  0
                );

                const countTotalPrice =
                  (card?.workSum ?? 0) +
                  (card?.partsTotalPrice ?? 0) +
                  (totalExpenses ?? 0);
                const edvPrice = countTotalPrice + countTotalPrice * 0.18;

                const totalPartsPrice =
                  card?.cardParts?.reduce((sum: number, part: any) => {
                    const price = (part.soldPrice ?? 0) * (part.count ?? 0);
                    const discount = part.discount ?? part.dicount ?? 0;
                    return sum + price * (1 - discount / 100);
                  }, 0) ?? 0;

                  const totalPartsOwnPrice=  card?.cardParts?.reduce((sum: number, part: any) => {
                    const price = (part.netPrice ?? 0) * (part.count ?? 0);
                    return sum + price 
                  }, 0) ?? 0;

                return (
                  <tr
                    key={card.id}
                    className="border-b hover:bg-gray-50 transition"
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
                    <td className="p-3">{card.workSum}</td>
                    <td className="p-3">{card.workSumOwn}</td>
                    <td className="p-3">{card.avSum}</td>
                    <td className="p-3">{totalPartsPrice ?? 0}</td>
                    <td className="p-3">{totalPartsOwnPrice ?? 0}</td>
                    <td className="p-3">{totalExpenses ?? 0}</td>
                    <td className="p-3">{countTotalPrice}</td>
                    <td className="p-3">{edvPrice}</td>
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
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Statistics;
