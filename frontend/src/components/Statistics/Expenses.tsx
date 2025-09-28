import { Select, TextInput } from "flowbite-react";

const Expenses = () => {
  return (
    <div className="w-[80%] border border-yellow-300 p-10 rounded-md">
      <form action="" className="flex  gap-5 items-center">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Kod
            </label>
            <TextInput type="text" sizing={"sm"} className="w-56" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Müştəri
            </label>
            <Select className="w-56" sizing={"sm"}>
              <option value="">Müştəri seç</option>
              <option value="">Bəxtiyar Quliyev</option>
              <option value="">Socar</option>
              <option value="">Azpetrol</option>
              <option value="">Bakı şəhər İcra Hakimiyyəti</option>
              <option value="">Azvirt MMC</option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Kartın statusu
            </label>
            <Select className="w-40" sizing={"sm"}>
              <option value="">Hamısı</option>
              <option value="">Açıq</option>
              <option value="">Qapalı</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Sifariş nömrəsi
            </label>
            <TextInput type="text" sizing={"sm"} className="w-56" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Bazar (daxilolma)
            </label>
            <Select className="w-40" sizing={"sm"}>
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
            <Select>
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
            <Select>
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
            <TextInput type="text" sizing={"sm"} className="w-56" />
          </div>

             <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Təchizatçı
            </label>
            <Select>
              <option value="">Seç</option>
              <option value="">MAN GMBH</option>
              <option value="">Fatih Bedir</option>
            </Select>
          </div>

              <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Ödəniş növü(daxilolma)
            </label>
            <Select>
              <option value="">Seç</option>
              <option value="">Nağd</option>
              <option value="">Köçürmə</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <div className="flex gap-2 items-center">
                    <TextInput type="checkbox" sizing={"sm"}  />
                    <label htmlFor="" className="text-sm">Bağlı məlumat</label>
                </div>
                  <div className="flex gap-2 items-center">
                    <TextInput type="checkbox" sizing={"sm"}/>
                    <label htmlFor="" className="text-sm">Tes</label>
                </div>
                  <div className="flex gap-2 items-center">
                    <TextInput type="checkbox"  sizing={"sm"}/>
                    <label htmlFor="" className="text-sm">Çeşidlə</label>
                </div>
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Faktura nömrəsi
            </label>
            <Select className="w-40" sizing={"sm"}>
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
            <Select className="w-40" sizing={"sm"}>
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
