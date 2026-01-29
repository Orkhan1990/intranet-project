import { Button, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { filterEmployeeFee } from "../api/allApi";
import { RootState } from "../redux-toolkit/store/store";
import { useSelector } from "react-redux";

const EmployeeFee = () => {
    const today = new Date().toISOString().split("T")[0];
    
    const [filters, setFilters] = useState({
        startDate: today,
        endDate: "",
        clientId: "",
        cardNumber: "",
        paymentType: "",
        fired: false,
    });
    const [results, setResults] = useState<any[]>([]);

  const { clients } = useSelector((state: RootState) => state.client);
    
  const handleChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log(results);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) =>
        value !== "" &&
        value !== null &&
        value !== false
    )
  );
    try {
      const res = await filterEmployeeFee(cleanFilters);
      
        setResults(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
        İşçilərin Əmək Haqqı
      </h1>

      <div className="flex mt-6">
        {/* FILTER PANEL */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mr-6 border-r pr-6 border-gray-300"
        >
          <div className="flex flex-col gap-2">
            <label>Başlanğıc tarix</label>
            <TextInput
              type="date"
              sizing="sm"
              value={filters.startDate}
              onChange={(e) =>
                handleChange("startDate", e.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Son tarix</label>
            <TextInput
              type="date"
              sizing="sm"
              value={filters.endDate}
              onChange={(e) =>
                handleChange("endDate", e.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Müştəri</label>
            <Select
              sizing="sm"
              value={filters.clientId}
              onChange={(e) =>
                handleChange("clientId", e.target.value)
              }
            >
              <option value="">Müştəri seç</option>
              {
                clients&&clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.companyName}
                  </option>
                ))
              }
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label>Kart nömrəsi</label>
            <TextInput
              type="text"
              sizing="sm"
              placeholder="Kart nömrəsi"
              value={filters.cardNumber}
              onChange={(e) =>
                handleChange("cardNumber", e.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Ödəniş növü</label>
            <Select
              sizing="sm"
              value={filters.paymentType}
              onChange={(e) =>
                handleChange("paymentType", e.target.value)
              }
            >
              <option value="">Ödəniş növü seç</option>
              <option value="transfer">Köçürmə</option>
              <option value="cash">Nağd</option>
              <option value="warranty">Zəmanət</option>
              <option value="internal">Daxili</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.fired}
              onChange={(e) =>
                handleChange("fired", e.target.checked)
              }
            />
            <label>İşdən çıxanlar</label>
          </div>

          <Button type="submit" color="blue" size="xs">
            Axtar
          </Button>
        </form>

        {/* RESULTS SECTION (sonra doldurulacaq) */}
        <div className="flex-1">
          {/* table / summary / total salary */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeFee;
