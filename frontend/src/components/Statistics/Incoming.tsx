import { Select, TextInput } from "flowbite-react";

const Incoming = () => {
  return (
    <div className="w-[80%] border border-yellow-300 p-10 rounded-md">
      <form action="" className="flex  gap-5 items-center">
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Kod
            </label>
            <TextInput type="text" sizing={"sm"} className="w-56" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Sifariş nömrəsi
            </label>
            <TextInput type="text" sizing={"sm"} className="w-56" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Bazar
            </label>
            <Select className="w-40" sizing={"sm"}>
              <option value="">Seç</option>
              <option value="">Yerli</option>
              <option value="">Xarici</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Brend
            </label>
            <Select className="w-40" sizing={"sm"}>
              <option value="">Seç</option>
              <option value="">BM-RS</option>
              <option value="">BF</option>
              <option value="">BM-RS</option>
              <option value="">BF</option>
              <option value="">BM-RS</option>
              <option value="">BF</option>
              <option value="">BM-RS</option>
              <option value="">BF</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Təchizatçı
            </label>
            <Select className="w-56" sizing={"sm"}>
              <option value="">Seç</option>
              <option value="">Man GMBH</option>
              <option value="">Fatih Bedir</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Ödəniş növü
            </label>
            <Select className="w-40" sizing={"sm"}>
              <option value="">Seç</option>
              <option value="">Nağd</option>
              <option value="">Köçürmə</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Faktura
            </label>
            <Select className="w-40" sizing={"sm"}>
              <option value="">Seç</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Project
            </label>
            <Select className="w-40" sizing={"sm"}>
              <option value="">Seç</option>
              <option value="">Project</option>
            </Select>
          </div>

          <div className="flex  gap-5">
            <div className="flex gap-3 items-center">
              <TextInput type="radio" sizing={"sm"}  className="cursor-pointer" />
              <label htmlFor="" className="text-sm">
                Anbarın vəziyyəti
              </label>
            </div>
            <div className="flex gap-3 items-center">
              <TextInput type="radio" sizing={"sm"}  className="cursor-pointer" />
              <label htmlFor="" className="text-sm">
                Tes
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Incoming;
