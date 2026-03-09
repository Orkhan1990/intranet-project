import { Select, TextInput } from "flowbite-react";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store";
import { fetchUsers } from "../../redux-toolkit/features/user/userSlice";
import { fetchBrands } from "../../redux-toolkit/features/brand/brandSlice";
import { fetchClients } from "../../redux-toolkit/features/client/clientSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const WorkerCard = ({ filters, handleChange }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { users } = useSelector((state: RootState) => state.user);
  const { clients } = useSelector((state: RootState) => state.client);
  const activeTab = useSelector((state: RootState) => state.filter.activeTab);

  const receptions = users.filter((p) => p.isReception === true);
  const serviceWorkers = users.filter(
    (p) => p.isWorker === true && p.userRole === "ServiceUser"
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBrands());
    dispatch(fetchClients());
  }, [dispatch]);

  if (activeTab !== "İş kartı") return null;

  const {
    cardStatus,
    cardNumber,
    banNumber,
    paymentType,
    clientId,
    manufactured,
    workerId,
    receptionId,
    minAmount,
    maxAmount,
    carNumber,
    customerType,
    legalOrPhysical,
  } = filters;

  return (
    <div className="w-[97%] border border-yellow-300 p-4 rounded-md">
      <form className="flex gap-10 items-center">

        {/* CARD STATUS */}
        <div className="flex flex-col gap-3">
          {[
            { label: "Bütün kartlar", value: "all" },
            { label: "Açıq kartlar", value: "open" },
            { label: "Bağlı kartlar", value: "closed" },
          ].map((item) => (
            <label key={item.value} className="flex gap-2 items-center text-sm">
              <input
                type="radio"
                name="cardStatus"
                value={item.value}
                checked={cardStatus === item.value}
                onChange={handleChange}
              />
              {item.label}
            </label>
          ))}
        </div>

        {/* CARD DETAILS */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-sm">Kartın nömrəsi</label>
            <TextInput
              name="cardNumber"
              sizing="sm"
              value={cardNumber || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm">Ban nömrəsi</label>
            <TextInput
              name="banNumber"
              sizing="sm"
              value={banNumber || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm">Ödəniş növü</label>
            <Select
              name="paymentType"
              sizing="sm"
              value={paymentType || ""}
              onChange={handleChange}
            >
              <option value="">Seç</option>
              <option value="transfer">Köçürülmə</option>
              <option value="cash">Nağd</option>
              <option value="warranty">Qarantiya</option>
              <option value="internal">Daxili iş</option>
              <option value="pos">POS</option>
            </Select>
          </div>
        </div>

        {/* CLIENT / BRAND / WORKER */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-sm">Müştərilər</label>
            <Select
              name="clientId"
              sizing="sm"
              value={clientId || ""}
              onChange={handleChange}
            >
              <option value="">Müştəri seç</option>
              {clients?.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.companyName}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="text-sm">Brend</label>
            <Select
              name="manufactured"
              sizing="sm"
              value={manufactured || ""}
              onChange={handleChange}
            >
              <option value="">Bütün brendlər</option>
              <option value="man">MAN</option>
              <option value="neoplan">Neoplan</option>
              <option value="daf">DAF</option>
              <option value="mercedes">Mercedes</option>
              <option value="scania">Scania</option>
              <option value="volvo">Volvo</option>
            </Select>
          </div>

          <div>
            <label className="text-sm">İşçilər</label>
            <Select
              name="workerId"
              sizing="sm"
              value={workerId || ""}
              onChange={handleChange}
            >
              <option value="">İşçi seç</option>
              {serviceWorkers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="text-sm">Maşın nömrəsi</label>
            <TextInput
              name="carNumber"
              sizing="sm"
              value={carNumber || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* RECEPTION / PRICE RANGE */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-sm">Qəbulçu</label>
            <Select
              name="receptionId"
              sizing="sm"
              value={receptionId || ""}
              onChange={handleChange}
            >
              <option value="">Qəbulçu seç</option>
              {receptions.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex gap-4">
            <div>
              <label className="text-sm">Min</label>
              <TextInput
                type="number"
                name="minAmount"
                sizing="sm"
                value={minAmount || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm">Max</label>
              <TextInput
                type="number"
                name="maxAmount"
                sizing="sm"
                value={maxAmount || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Müştəri növü</label>
            <Select
              name="customerType"
              sizing="sm"
              value={customerType || ""}
              onChange={handleChange}
            >
              <option value="">Seç</option>
              <option value="customer">Müştəri</option>
              <option value="worker">İşçi</option>
              <option value="boss">Təsisçi</option>
              <option value="itb">İTB</option>
            </Select>
          </div>

          <div>
            <label className="text-sm">Hüquqi/Fiziki</label>
            <Select
              name="legalOrPhysical"
              sizing="sm"
              value={legalOrPhysical || ""}
              onChange={handleChange}
            >
              <option value="">Seç</option>
              <option value="legal">Hüquqi</option>
              <option value="physical">Fiziki</option>
            </Select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WorkerCard;