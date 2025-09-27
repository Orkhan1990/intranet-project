import { Button, TabItem } from "flowbite-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // required
import WorkerCard from "../../components/Statistics/WorkerCard";

const Statistics = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const tabs = ["İş kartı", "Gəlir", "Xərc", "Briqada"];

  return (
    <div className="min-h-screen  ml-20 mt-20">
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
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
            <div>
              {activeTab === "İş kartı" && <WorkerCard />}
              {activeTab === "Gəlir" && <div>Gəlir məzmunu</div>}
              {activeTab === "Xərc" && <div>Xərc məzmunu</div>}
              {activeTab === "Briqada" && <div>Briqada məzmunu</div>}
            </div>
          </div>
        </div>

        <Button color={"blue"} size={"sm"} className="w-28">Axtar</Button>
      </form>
    </div>
  );
};

export default Statistics;
