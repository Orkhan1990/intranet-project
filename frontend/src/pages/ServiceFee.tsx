import { Button } from "flowbite-react/components/Button";
import { Select } from "flowbite-react/components/Select";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { AppDispatch, RootState } from "../redux-toolkit/store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchClients } from "../redux-toolkit/features/client/clientSlice";

const ServiceFee = () => {


  const [filters, setFilters] = React.useState({
    clientId: "",
    startDate: "",
    endDate: "",
  });

  const {clients} = useSelector((state: RootState) => state.client);

    const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch])

  const handleDateChange = (
    date: Date | null,
    name: "startDate" | "endDate",
  ) => {
    setFilters((prev) => ({ ...prev, [name]: date ? date.toISOString() : "" }));
  };

  const handleChnage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFetch = () => {};
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
                  selected={filters.startDate ? new Date(filters.startDate) : null}
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
                  selected={filters.endDate ? new Date(filters.endDate) : null}
                  onChange={(date) => handleDateChange(date, "endDate")}
                  className="border border-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholderText="Tarix seçin"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full">
              <div className="flex  gap-20 self-start bg-yellow-300 px-6 py-2 rounded-md text-sm font-medium text-black">
                <div className="underline">
                Hesab

                </div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
              </div>

              <div className="flex gap-2 items-center">
                <label htmlFor="">Müştəri:</label>
                <Select className="w-52" name="clientId" sizing="sm" value={""} onChange={handleChnage}>
                  <option value="">Müştəri seç</option>
                  {clients?.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.companyName}
                    </option>
                  ))}
                </Select>
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
    </div>
  );
};

export default ServiceFee;
