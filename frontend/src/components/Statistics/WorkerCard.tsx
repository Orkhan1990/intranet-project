import {Select, TextInput } from "flowbite-react";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store"
import { fetchUsers } from "../../redux-toolkit/features/user/userSlice";
import { fetchBrands } from "../../redux-toolkit/features/brand/brandSlice";
import { fetchClients } from "../../redux-toolkit/features/client/clientSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const WorkerCard = () => {


  const dispatch: AppDispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  const {brands}=useSelector((state:RootState)=>state.brand);
  const {clients}=useSelector((state:RootState)=>state.client);

  console.log({brands});

  const receptions=users.filter(p=>p.isReception===true);
  const serviceWorkers=users.filter(p=>p.isWorker===true&&p.userRole==="ServiceUser");
  console.log({receptions});
  
  


  useEffect(() => { 
    dispatch(fetchUsers());
    dispatch(fetchBrands());
    dispatch(fetchClients());
  }, [dispatch]);
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
              {
                clients&& clients.map((client)=>(
                  <option key={client.id} value={client.id}>{client.companyName} </option>
                ))
              }
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Brend
            </label>
            <Select className="w-36 cursor-pointer" sizing={"sm"}>
              <option value="">Bütün Brendler</option>
              {
                brands&& brands.map((brand)=>(
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))
              }

            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              İşçilər
            </label>
            <Select className="w-36 cursor-pointer" sizing={"sm"}>
              <option value="">İşçi seç</option>
              {
                serviceWorkers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))
              }
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
                {
                  receptions.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))
                }
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
