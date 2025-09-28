import { Select } from "flowbite-react";

const Briqada = () => {
  return (
    <div className="w-[60%] border border-yellow-300 p-10 rounded-md">
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-sm">
          Briqada
        </label>
        <Select className="w-52 cursor-pointer" sizing={"sm"}>
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
