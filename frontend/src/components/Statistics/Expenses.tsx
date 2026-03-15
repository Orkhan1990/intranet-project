import { Select, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux-toolkit/store/store";
import { setExpensesFilter } from "../../redux-toolkit/features/filters/filterSlice";
import { fetchPrixods } from "../../redux-toolkit/features/prixod/prixodSlice";
import { fetchBrands } from "../../redux-toolkit/features/brand/brandSlice";
import { fetchSuppliers } from "../../redux-toolkit/features/supplier/supplierSlice";
import { useEffect } from "react";
import { fetchClients } from "../../redux-toolkit/features/client/clientSlice";



const Expenses = () => {

   const dispatch: AppDispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter.expenseFilters);

    const { brands } = useSelector((state: RootState) => state.brand);
    const { suppliers } = useSelector((state: RootState) => state.supplier);
    const {clients} = useSelector((state: RootState) => state.client);
    const {prixods} = useSelector((state: RootState) => state.prixod);
  
    console.log({suppliers});
    
  
      useEffect(() => {
        dispatch(fetchSuppliers());
        dispatch(fetchBrands());
        dispatch(fetchPrixods());
        dispatch(fetchClients());
      }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setExpensesFilter({ [name]: value }));
  };
  const {
    code,
    clientId,
    cardStatus,
    orderNumber,
    market,
    brandId,
    paymentType,
    cardNumber,
    supplierId,
    invoice,
    project,
  } = filters;



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
              Kart statusu
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
              name="brandId"
              value={brandId || ""}
              onChange={handleChange}
            >
              <option value="">Brend seç</option>
              {brands?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
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
            <Select className="w-40" sizing={"sm"} name="supplierId" value={supplierId||""} onChange={handleChange}>
              <option value="">Seç</option>
              {suppliers?.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.supplier}
                </option>
              ))}
      
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
              {prixods?.map((prixod) => (
                <option key={prixod.id} value={prixod.invoice}>
                  {prixod.invoice}
                </option>
              ))}
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
