import { Select, TextInput } from "flowbite-react";
import { AppDispatch, RootState } from "../../redux-toolkit/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setIncomingFilter } from "../../redux-toolkit/features/filters/filterSlice";

// interface IncomingProps {
//   filters: any;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
// }

const Incoming = () => {
 const dispatch: AppDispatch = useDispatch();
   const filters = useSelector((state: RootState) => state.filter.incomingFilters);
     const { brands } = useSelector((state: RootState) => state.brand);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setIncomingFilter({ [name]: value }));
  };

  const {
    code,
    orderNumber,
    market,
    brand,
    supplier,
    paymentType,
    invoice,
    project,
  } = filters;

  return (
    <div className="w-[80%] border border-yellow-300 p-10 rounded-md">
      <form className="flex gap-5 items-center">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm">E/h Kod</label>
            <TextInput
              type="text"
              sizing="sm"
              className="w-56"
              name="code"
              value={code || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Sifariş nömrəsi</label>
            <TextInput
              type="text"
              sizing="sm"
              className="w-56"
              name="orderNumber"
              value={orderNumber || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Bazar</label>
            <Select
              className="w-40"
              sizing="sm"
              name="market"
              value={market || ""}
              onChange={handleChange}
            >
              <option value="">Seç</option>
              <option value="yerli">Yerli</option>
              <option value="xarici">Xarici</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Brend</label>
            <Select
              className="w-40"
              sizing="sm"
              name="brand"
              value={brand || ""}
              onChange={handleChange}
            >
              <option value="">Seç</option>
              {brands?.map((brand: any) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
      
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Təchizatçı</label>
            <Select
              className="w-56"
              sizing="sm"
              name="supplier"
              value={supplier || ""}
              onChange={handleChange}
            >
              <option value="">Seç</option>
              <option value="man">Man GMBH</option>
              <option value="fatih">Fatih Bedir</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Ödəniş növü</label>
            <Select
              className="w-40"
              sizing="sm"
              name="paymentType"
              value={paymentType || ""}
              onChange={handleChange}
            >
              <option value="">Seç</option>
              <option value="cash">Nağd</option>
              <option value="transfer">Köçürmə</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Faktura</label>
            <Select
              className="w-40"
              sizing="sm"
              name="invoice"
              value={invoice || ""}
              onChange={handleChange}
            >
              <option value="">Seç</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Project</label>
            <Select
              className="w-40"
              sizing="sm"
              name="project"
              value={project || ""}
              onChange={handleChange}
            >
              <option value="">Seç</option>
            </Select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Incoming;