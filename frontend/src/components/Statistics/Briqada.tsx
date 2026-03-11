import { Select } from "flowbite-react";
import { setBrigadeFilter } from "../../redux-toolkit/features/filters/filterSlice";
import { AppDispatch, RootState } from "../../redux-toolkit/store/store";
import { useDispatch, useSelector } from "react-redux";

const Briqada = () => {
  const dispatch: AppDispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter.brigadeFilters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setBrigadeFilter({ [name]: value }));
  };

  return (
    <div className="w-[60%] border border-yellow-300 p-10 rounded-md">
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-sm">
          Briqada
        </label>
        <Select className="w-52 cursor-pointer" sizing={"sm"} name="briqada" value={filters.briqada || ""} onChange={handleChange}>
          <option value="">Briqada seç</option>
          <option value="">Aqreqat briqadası</option>
          <option value="">Dəmirçi və Rəngləmə briqadası</option>
          <option value="">Elektrik briqadası</option>
          <option value="">Elektrik briqadası</option>
          <option value="">Elektrik briqadası</option>
          <option value="">Elektronika briqadası</option>
          <option value="">Servis briqadası</option>
          <option value="">Traktorlar briqadası</option>
          <option value="">Avto yuma briqadası</option>
          <option value="">Çilingər briqadası 1</option>
          <option value="">Çilingər briqadası 2</option>
          <option value="">Əkbərov Akif</option>
        </Select>
      </div>
    </div>
  );
};

export default Briqada;
