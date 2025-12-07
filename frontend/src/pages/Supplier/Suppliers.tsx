import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SupplierInterface } from "../../types";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { fetchSuppliers } from "../../redux-toolkit/features/supplier/supplierSlice";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store";
import { useDispatch, useSelector } from "react-redux";

const Suppliers = () => {
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierInterface | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { suppliers, loading: suppliersLoading } = useSelector(
    (state: RootState) => state.supplier
  );

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleDeleteClick = (item: SupplierInterface) => {
    setSelectedSupplier(item);
    setOpenModal(true);
  };

  const deleteSupplier = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/supplier/deleteSupplier/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message);
      } else {
        dispatch(fetchSuppliers());
        setOpenModal(false);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen mt-[100px] mb-20 px-4 lg:px-10">
      <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white">
        Təchizatçılar
      </h2>

      {/* Loading */}
      {suppliersLoading && (
        <div className="flex justify-center mt-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Empty state */}
      {!suppliersLoading && suppliers.length === 0 && (
        <p className="text-center mt-10 text-gray-600 dark:text-gray-300 text-lg">
          Təchizatçı mövcud deyil
        </p>
      )}

      {/* Table */}
      {suppliers.length > 0 && (
        <div className="overflow-x-auto mt-10 shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3">Təchizatçı</th>
                <th className="px-4 py-3">Ölkə</th>
                <th className="px-4 py-3 text-center">Əlaqədar şəxs</th>
                <th className="px-4 py-3 text-center">Telefon</th>
                <th className="px-4 py-3 text-center">Email</th>
                <th className="px-4 py-3 text-center">Ödəniş üsulu</th>
                <th className="px-4 py-3 text-center">Çatdırılma növü</th>
                <th className="px-4 py-3 text-center">Çatdırılma vaxtı</th>
                <th className="px-4 py-3 text-center">Kredit xətti</th>
                <th className="px-4 py-3 text-center">Borc</th>
                <th className="px-4 py-3 text-center">Kredit qeydiyyatı</th>
                <th className="px-4 py-3 text-center">Kredit müddəti</th>
                <th className="px-2 py-3">#</th>
                <th className="px-2 py-3">#</th>
              </tr>
            </thead>

            <tbody>
              {suppliers.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3 text-xs">{item.supplier}</td>
                  <td className="px-4 py-3 text-xs">{item.country}</td>
                  <td className="px-4 py-3 text-xs text-center">{item.contactPerson}</td>
                  <td className="px-4 py-3 text-xs text-center">{item.phone}</td>
                  <td className="px-4 py-3 text-xs text-center">{item.email}</td>
                  <td className="px-4 py-3 text-xs text-center">{item.paymentType}</td>
                  <td className="px-4 py-3 text-xs text-center">{item.deliverType}</td>
                  <td className="px-4 py-3 text-xs text-center">{item.deliverPeriod}</td>
                  <td className="px-4 py-3 text-xs text-center">{item.creditLine}</td>
                  <td className="px-4 py-3 text-xs text-center">0</td>
                  <td className="px-4 py-3 text-xs text-center">{item.creditNote}</td>
                  <td className="px-4 py-3 text-xs text-center">{item.creditDuration}</td>

                  <td className="px-2 py-3 text-blue-600 cursor-pointer hover:text-blue-900">
                    <Link to={`/updateSupplier/${item.id}`}>
                      <FaRegEdit />
                    </Link>
                  </td>

                  <td
                    className="px-2 py-3 text-red-600 cursor-pointer hover:text-red-900"
                    onClick={() => handleDeleteClick(item)}
                  >
                    <FaRegTrashAlt />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add button */}
      <Link to="/newSuppliers">
        <Button color="blue" className="mt-10 flex items-center gap-2" size="xs">
          Əlavə et +

        </Button>
        
      </Link>

      {/* Modal */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-600 dark:text-gray-200">
              {selectedSupplier?.supplier} silməyə əminsinizmi?
            </h3>

            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                size="xs"
                onClick={() => deleteSupplier(selectedSupplier!.id)}
              >
                Bəli, sil
              </Button>
              <Button color="gray" size="xs" onClick={() => setOpenModal(false)}>
                Xeyr, bağla
              </Button>
            </div>

            {error && (
              <p className="text-xs text-red-700 mt-4 font-semibold">{error}</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Suppliers;
