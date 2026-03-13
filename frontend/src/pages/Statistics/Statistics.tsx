import { Button } from "flowbite-react";
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
  setStartEndDate,
} from "../../redux-toolkit/features/filters/filterSlice";
import { useCallback } from "react";
import WorkerCardTable from "../../components/Statistics/WorkerCardTable";
import IncomingTable from "../../components/Statistics/IncomingTable";
import ExpensesTable from "../../components/Statistics/ExpensesTable";
import BrigadeTable from "../../components/Statistics/BrigadeTable";

const Statistics = () => {
  const dispatch: AppDispatch = useDispatch();

  // Redux state
  const {
    activeTab,
    startDate,
    endDate,
    workerCardFilters,
    incomingFilters,
    expenseFilters,
    brigadeFilters,
    cards = [],
    loading = false,
  } = useSelector((state: RootState) => state.filter);

  const tabs = ["İş kartı", "Gəlir", "Xərc", "Briqada"];

  // Date picker handler
  const handleDateChange = (
    date: Date | null,
    name: "startDate" | "endDate",
  ) => {
    dispatch(setStartEndDate({ [name]: date }));
  };

  // Fetch cards
  const handleFetch = useCallback(() => {
    const payload: any = {
      tab: activeTab,
      startDate,
      endDate,
      ...(activeTab === "İş kartı"
        ? workerCardFilters
        : activeTab === "Gəlir"
          ? incomingFilters
          : activeTab === "Xərc"
            ? expenseFilters
            : brigadeFilters),
    };

    dispatch(fetchCards(payload));
  }, [
    activeTab,
    startDate,
    endDate,
    workerCardFilters,
    incomingFilters,
    expenseFilters,
    brigadeFilters,
    dispatch,
  ]);

  // Warranty row color

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
                  selected={startDate ? new Date(startDate) : null}
                  onChange={(date) => handleDateChange(date, "startDate")}
                  className="border border-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholderText="Tarix seçin"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Son tarix
                </label>
                <DatePicker
                  selected={endDate ? new Date(endDate) : null}
                  onChange={(date) => handleDateChange(date, "endDate")}
                  className="border border-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
                    onClick={() => {
                      dispatch(setActiveTab(tab));
                    }}
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

      {activeTab === "İş kartı" && (
        <WorkerCardTable cards={cards} loading={loading} />
      )}
      {activeTab === "Gəlir" && (
        <IncomingTable cards={cards} loading={loading} />
      )}
      {activeTab === "Xərc" && (
        <ExpensesTable cards={cards} loading={loading} />
      )}
      {activeTab === "Briqada" && (
        <BrigadeTable cards={cards} loading={loading} />
      )}
    </div>
  );
};

export default Statistics;
