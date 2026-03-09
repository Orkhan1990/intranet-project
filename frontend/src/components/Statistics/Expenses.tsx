import { Select, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";

interface ExpensesProps {
  filters: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const Expenses = ({ filters, handleChange }: ExpensesProps) => {
  const {
    code,
    clientId,
    cardStatus,
    orderNumber,
    market,
    manufactured,
    paymentType,
    cardNumber,
    supplier,
    invoice,
    project,
  } = filters;

    const { clients } = useSelector((state: RootState) => state.client);


  return (
    <div className="w-[80%] border border-yellow-300 p-10 rounded-md">
      <form action="" className="flex  gap-5 items-center">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Kod
            </label>
            <TextInput
              type="text"
              sizing={"sm"}
              className="w-56"
              name="code"
              value={code || ""}
              onChange={handleChange}
            />
          </div>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Kartın statusu
            </label>
            <Select
              className="w-40"
              sizing={"sm"}
              name="cardStatus"
              value={cardStatus || ""}
              onChange={handleChange}
            >
              <option value="all">Hamısı</option>
              <option value="open">Açıq</option>
              <option value="closed">Qapalı</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Sifariş nömrəsi
            </label>
            <TextInput type="text" sizing={"sm"} className="w-56" name="orderNumber" value={orderNumber||""} onChange={handleChange}/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Bazar (daxilolma)
            </label>
            <Select className="w-40" sizing={"sm"} name="market" value={market||""} onChange={handleChange}>
              <option value="">Seç</option>
              <option value="">Yerli</option>
              <option value="">Xarici</option>
              <option value="">Akt əsasında</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Brend
            </label>
            <Select
              className="w-40"
              sizing={"sm"}
              name="manufactured"
              value={manufactured || ""}
              onChange={handleChange}
            >
              <option value="">Brend seç</option>
              <option value="">3F</option>
              <option value="">3FM</option>
              <option value="">4CR</option>
              <option value="">4D</option>
              <option value="">4U</option>
              <option value="">734U</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Ödəniş növü
            </label>
            <Select
              className="w-40"
              sizing={"sm"}
              name="paymentType"
              value={paymentType || ""}
              onChange={handleChange}
            >
              <option value="">Seç</option>
              <option value="">Köçürmə</option>
              <option value="">Nağd</option>
              <option value="">Qarantiya</option>
              <option value="">Daxili iş</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Kart nömrəsi
            </label>
            <TextInput type="text" sizing={"sm"} className="w-56" name="cardNumber" value={cardNumber||""} onChange={handleChange}/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Təchizatçı
            </label>
            <Select className="w-40" sizing={"sm"} name="supplier" value={supplier||""} onChange={handleChange}>
              <option value="">Seç</option>
              <option value="">MAN GMBH</option>
              <option value="">Fatih Bedir</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Ödəniş növü(daxilolma)
            </label>
            <Select className="w-40" sizing={"sm"} name="paymentType" value={paymentType||""} onChange={handleChange}>
              <option value="">Seç</option>
              <option value="">Nağd</option>
              <option value="">Köçürmə</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <div className="flex gap-2 items-center">
              <TextInput type="checkbox" sizing={"sm"} />
              <label htmlFor="" className="text-sm">
                Bağlı məlumat
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <TextInput type="checkbox" sizing={"sm"} />
              <label htmlFor="" className="text-sm">
                Tes
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <TextInput type="checkbox" sizing={"sm"} />
              <label htmlFor="" className="text-sm">
                Çeşidlə
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Faktura nömrəsi
            </label>
            <Select className="w-40" sizing={"sm"} name="invoice" value={invoice||""} onChange={handleChange}>
              <option value="">Seç</option>
              <option value="">012456</option>
              <option value="">123456</option>
              <option value="">7894561</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Project
            </label>
            <Select className="w-40" sizing={"sm"} name="project" value={project||""} onChange={handleChange}>
              <option value="">Seç</option>
              <option value="">Project1</option>
            </Select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Expenses;
