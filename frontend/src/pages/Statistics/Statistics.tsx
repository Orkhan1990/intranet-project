import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // required

const Statistics = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="min-h-screen flex items-start justify-start p-10">
      <form action="" className="flex gap-5">
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

        <div className="inline-flex gap-20 text-black-500 bg-yellow-300 p-3 rounded-md ">
          <h1>İşçi kartı</h1>
          <h1>Gəlir</h1>
          <h1>Xərc</h1>
          <h1>Briqada</h1>
        </div>
      </form>
    </div>
  );
};

export default Statistics;
