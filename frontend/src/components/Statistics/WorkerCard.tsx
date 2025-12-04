import { Select, TextInput } from "flowbite-react";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store";
import { fetchUsers } from "../../redux-toolkit/features/user/userSlice";
import { fetchBrands } from "../../redux-toolkit/features/brand/brandSlice";
import { fetchClients } from "../../redux-toolkit/features/client/clientSlice";
import { setFilter } from "../../redux-toolkit/features/filters/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const WorkerCard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  const { clients } = useSelector((state: RootState) => state.client);
  const filters = useSelector((state: RootState) => state.filter);

  const handleChange = (key: string, value: any) => {
    dispatch(setFilter({ [key]: value }));
  };

  const receptions = users.filter((p) => p.isReception === true);
  const serviceWorkers = users.filter(
    (p) => p.isWorker === true && p.userRole === "ServiceUser"
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBrands());
    dispatch(fetchClients());
  }, [dispatch]);

  return (
    <div className="w-[97%] border border-yellow-300 p-4 rounded-md">
      <form className="flex gap-10 items-center">
        {/* Card Status Radio Buttons */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <input
              type="radio"
              name="cardStatus"
              checked={filters.cardStatus === "all"}
              onChange={() => handleChange("cardStatus", "all")}
            />
            <label className="text-sm">Bütün kartlar</label>
          </div>
          <div className="flex gap-3 items-center">
            <input
              type="radio"
              name="cardStatus"
              checked={filters.cardStatus === "open"}
              onChange={() => handleChange("cardStatus", "open")}
            />
            <label className="text-sm">Açıq kartlar</label>
          </div>
          <div className="flex gap-3 items-center">
            <input
              type="radio"
              name="cardStatus"
              checked={filters.cardStatus === "closed"}
              onChange={() => handleChange("cardStatus", "closed")}
            />
            <label className="text-sm">Bağlı kartlar</label>
          </div>
        </div>

        {/* Card Details */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Kartın nömrəsi</label>
            <TextInput
              type="text"
              sizing="sm"
              value={filters.cardNumber || ""}
              onChange={(e) => handleChange("cardNumber", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Ban nömrəsi</label>
            <TextInput
              type="text"
              sizing="sm"
              value={filters.banNumber || ""}
              onChange={(e) => handleChange("banNumber", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Ödəniş növü</label>
            <Select
              className="w-36 cursor-pointer"
              sizing="sm"
              value={filters.paymentType || ""}
              onChange={(e) => handleChange("paymentType", e.target.value)}
            >
              <option value="">Seç</option>
              <option value="transfer">Köçürmə</option>
              <option value="cash">Nağd</option>
              <option value="guarantee">Qarantiya</option>
              <option value="internal">Daxili iş</option>
            </Select>
          </div>
        </div>

        {/* Client, Brand, Worker, Car */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Müştərilər</label>
            <Select
              className="w-36 cursor-pointer"
              sizing="sm"
              value={filters.clientId || ""}
              onChange={(e) => handleChange("clientId", e.target.value)}
            >
              <option value="">Müştəri seç</option>
              {clients &&
                clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.companyName}
                  </option>
                ))}
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Brend</label>
            <Select
              className="w-36 cursor-pointer"
              sizing="sm"
              value={filters.manufactured || ""}
              onChange={(e) => handleChange("manufactured", e.target.value)}
            >
              <option value="">Bütün Brendler</option>

              <option value="man">Man</option>
              <option value="neoplan">Neoplan</option>
              <option value="daf">Daf</option>
              <option value="mercedes">Mercedes</option>
              <option value="sumitomo">Sumitomo</option>
              <option value="scania">Scania</option>
              <option value="Kamaz">Kamaz</option>
              <option value="ford">Ford</option>
              <option value="shagman">Shagman</option>
              <option value="volvo">Volvo</option>
              <option value="iveco">Iveco</option>
              <option value="renault">Renault</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">İşçilər</label>
            <Select
              className="w-36 cursor-pointer"
              sizing="sm"
              value={filters.workerId || ""}
              onChange={(e) => handleChange("workerId", e.target.value)}
            >
              <option value="">İşçi seç</option>
              {serviceWorkers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Maşının nömrəsi</label>
            <TextInput
              type="text"
              sizing="sm"
              value={filters.carNumber || ""}
              onChange={(e) => handleChange("carNumber", e.target.value)}
            />
          </div>
        </div>

        {/* Reception, Min/Max, Customer Type, Legal/Physical */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Qəbulçu</label>
            <Select
              className="w-36 cursor-pointer"
              sizing="sm"
              value={filters.receptionId || ""}
              onChange={(e) => handleChange("receptionId", e.target.value)}
            >
              <option value="">Qəbulçu seç</option>
              {receptions.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-sm">Min</label>
              <TextInput
                type="number"
                sizing="sm"
                value={filters.minAmount || ""}
                onChange={(e) =>
                  handleChange("minAmount", Number(e.target.value))
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Max</label>
              <TextInput
                type="number"
                sizing="sm"
                value={filters.maxAmount || ""}
                onChange={(e) =>
                  handleChange("maxAmount", Number(e.target.value))
                }
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-sm">Müştəri növü</label>
              <Select
                className="w-36 cursor-pointer"
                sizing="sm"
                value={filters.customerType || ""}
                onChange={(e) => handleChange("customerType", e.target.value)}
              >
                <option value="">Seç</option>
                <option value="ITB">İTB</option>
                <option value="Customer">Müştəri</option>
                <option value="Worker">İşçi</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Hüquqi/Fiziki</label>
              <Select
                className="w-36 cursor-pointer"
                sizing="sm"
                value={filters.legalOrPhysical || ""}
                onChange={(e) =>
                  handleChange("legalOrPhysical", e.target.value)
                }
              >
                <option value="">Seç</option>
                <option value="legal">Hüquqi</option>
                <option value="physical">Fiziki</option>
              </Select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WorkerCard;
