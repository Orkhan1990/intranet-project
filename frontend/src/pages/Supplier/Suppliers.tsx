import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SupplierInterface } from "../../types";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Suppliers = () => {
  const [error, setError] = useState("");
  const [suppliersList, setSupplierList] = useState<SupplierInterface[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierInterface>({
    id:0,
    supplier:"",
    country:"",
    contactPerson:"",
    phone:"",
    email:"",
    paymentType:"",
    deliverType:"",
    deliverPeriod:"",
    creditLine:"",
    creditNote:"",
    creditDuration:""
  }); 


  const handleDeleteClick = (item:any) => {
    setSelectedSupplier(item); // Set the selected supplier for deletion
    setOpenModal(true); // Open the modal
  };

  console.log(selectedSupplier);
  

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/supplier/getSuppliers",
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (!res.ok || data.success === false) {
          setError(data.message);
        }
        setSupplierList(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    getSuppliers();
  }, []);

  const deleteSupplier = async (id: number) => {
    console.log(id,"qaqa");
    
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/supplier/deleteSupplier/${id}`,
        {
          method: "DELETE",
          credentials: "include", // added this part
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
         

      const data=await res.json();

      if(!res.ok||data.success===false){
        setError(data.message)
      }
      if(res.ok){
        setSupplierList((prev) => prev.filter((supplier) => supplier.id!== id));
        setOpenModal(false)
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen mt-[100px] mb-[100px]">
      <h2 className="text-center text-lg font-semibold">Təchizatçılar</h2>
      {
        suppliersList.length>0?(
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-20">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Təchizatçı
              </th>
              <th scope="col" className="px-6 py-3">
                Ölkə
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Əlaqədar şəxs
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Telefon
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Ödəniş üsulu
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Çatdırılma növü
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Çatdırılma vaxtı
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Kredit xətti
              </th>
              <th scope="col" className="px-3 py-3">
                Borc
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Kredit qeydiyyatı
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Kredit müddəti
              </th>
              <th scope="col" className="py-4 px-2">
                #
              </th>
              <th scope="col" className="py-4 px-2">
                #
              </th>
            </tr>
          </thead>
          <tbody>
            {suppliersList.length>0&&suppliersList.map((item: SupplierInterface, index: number) => (
              <>
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 text-center text-xs">
                    {item.supplier}
                  </td>
                  <td className="px-6 py-4 text-center text-xs">
                    {item.country}
                  </td>
                  <td className="px-6 py-4 text-center text-xs">
                    {item.contactPerson}
                  </td>
                  <td className="px-6 py-4 text-center text-xs">{item.phone}</td>
                  <td className="px-6 py-4 text-center text-xs">{item.email}</td>
                  <td className="px-6 py-4 text-center text-xs">
                    {item.paymentType}
                  </td>
                  <td className="px-6 py-4 text-center text-xs">
                    {item.deliverType}
                  </td>
                  <td className="px-6 py-4 text-center text-xs">
                    {item.deliverPeriod}
                  </td>
                  <td className="px-6 py-4 text-center text-xs">
                    {item.creditLine}
                  </td>
                  <td className="px-6 py-4 text-center text-xs">0</td>
                  <td className="px-6 py-4 text-center text-xs">
                    {item.creditNote}
                  </td>
                  <td className="px-6 py-4 text-center text-xs">
                    {item.creditDuration}
                  </td>
                  <Link to={`/updateSupplier/${item.id}`}>
                    <td className="pt-4 px-2 text-blue-700 ">
                      <FaRegEdit />
                    </td>
                  </Link>
                  <td
                    className="py-4 px-2 text-red-600 cursor-pointer hover:!text-red-900"
                    onClick={() => handleDeleteClick(item)}
                  >
                    <FaRegTrashAlt />
                  </td>
                </tr>
  
                <Modal
                  show={openModal}
                  size="md"
                  onClose={() => setOpenModal(false)}
                  popup
                >
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {selectedSupplier?.supplier} silməyə əminsinizmi?
                      </h3>
                      <div className="flex justify-center gap-4">
                        <Button
                          color="failure"
                          onClick={()=>deleteSupplier(selectedSupplier?.id)}
                        >
                          {"Bəli, sil"}
                        </Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                          Xeyr, bağla
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </>
            ))}
          </tbody>
        </table>
        ):( <h2 className="ml-5 mt-20">Təchizatçı mövcud deyil</h2>)
      }

  

      <Link to="/newSuppliers">
        <Button color={"blue"} className="mt-10 flex gap-5 ml-5">
          Əlavə et
          <span className="ml-2">+</span>
        </Button>
      </Link>
    </div>
  );
};

export default Suppliers;
