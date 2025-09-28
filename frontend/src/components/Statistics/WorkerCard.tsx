import {Select, TextInput } from "flowbite-react";

const WorkerCard = () => {
  return (
    <div className="w-[97%] border border-yellow-300 p-4 rounded-md">
      <form action="" className="flex gap-10 items-center">
        <div className="flex flex-col gap-3">
          <div className="flex  gap-3 items-center">
            <TextInput type="radio" sizing={"sm"} className="cursor-pointer" />
            <label htmlFor="" className="text-sm ">
              Bütün kartlar
            </label>
          </div>
          <div className="flex gap-3 items-center">
            <TextInput type="radio" sizing={"sm"} className="cursor-pointer" />
            <label htmlFor="" className="text-sm">
              Açıq kartlar
            </label>
          </div>
          <div className="flex gap-3 items-center">
            <TextInput type="radio" sizing={"sm"} className="cursor-pointer" />
            <label htmlFor="" className="text-sm">
              Bağlı kartlar
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Kartın nömrəsi
            </label>
            <TextInput type="text" sizing={"sm"} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Ban nömrəsi
            </label>
            <TextInput type="text" sizing={"sm"} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Ödəniş növü
            </label>
            <Select className="w-36 cursor-pointer" sizing={"sm"}>
              <option value="">Köçürmə</option>
              <option value="">Nağd</option>
              <option value="">Qarantiya</option>
              <option value="">Daxili iş</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Müştərilər
            </label>
            <Select className="w-36 cursor-pointer" sizing={"sm"}>
              <option value="">Müştəri seç</option>
              <option value="">Socar</option>
              <option value="">Azpetrol</option>
              <option value="">Zqan</option>
              <option value="">Pasha</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Brend
            </label>
            <Select className="w-36 cursor-pointer" sizing={"sm"}>
              <option value="">Bütün Brendler</option>
              <option value="">Man</option>
              <option value="">Bobcat</option>
              <option value="">Mercedes</option>
              <option value="">Daf</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              İşçilər
            </label>
            <Select className="w-36 cursor-pointer" sizing={"sm"}>
              <option value="">İşçi seç</option>
              <option value="">Mübariz Məmmədov</option>
              <option value="">Novruz Abbasov</option>
              <option value="">Evgeniy Denisov</option>
              <option value="">Muqbil İsmayılov</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Maşının nömrəsi
            </label>
            <TextInput type="text" sizing={"sm"} />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-20">
            {/* <div className="flex gap-3 items-center">
              <input type="radio" className="h-2 w-2 cursor-pointer" />
              <label htmlFor="" className="text-sm">
                Bütün kartlar
              </label>
            </div> */}

            <div className="flex gap-3 items-center">
              <TextInput type="radio" sizing={"sm"}  className="cursor-pointer" />
              <label htmlFor="" className="text-sm">
                Moyka
              </label>
            </div>

            <div className="flex gap-3 items-center">
              <TextInput type="radio" sizing={"sm"}  className="cursor-pointer" />
              <label htmlFor="" className="text-sm">
                Yağlama
              </label>
            </div>

            <div className="flex gap-3 items-center">
              <TextInput type="radio" sizing={"sm"}  className="cursor-pointer" />
              <label htmlFor="" className="text-sm">
                Rab0
              </label>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm">
                Qəbulçu
              </label>
              <Select className="w-36 cursor-pointer" sizing={"sm"}>
                <option value="">Qəbulçu seç</option>
                <option value="">İlkin Məmmədov</option>
                <option value="">Aqil Huseynov</option>
                <option value="">Xəlil Necefov</option>
                <option value="">Kərim Məmmədov</option>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm">
                Min
              </label>
              <TextInput type="text" sizing={"sm"} />
            </div>

              <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm">
                Max
              </label>
              <TextInput type="text" sizing={"sm"} />
            </div>
          </div>

            <div className="flex gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm">
                Müştəri növü
              </label>
              <Select className="w-36 cursor-pointer" sizing={"sm"}>
                <option value="">Müştəri növü seç</option>
                <option value="">İTB</option>
                <option value="">Müştəri</option>
                <option value="">İşçi</option>
              </Select>
            </div>


             <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm">
                Hüquqi/Fiziki
              </label>
              <Select className="w-36 cursor-pointer" sizing={"sm"}>
                <option value="">Seç</option>
                <option value="">Hüquqi</option>
                <option value="">Fiziki</option>
              </Select>
            </div>

         
          </div>
        </div>
      </form>
    </div>
  );
};

export default WorkerCard;
