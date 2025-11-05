import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store";
import { fetchPrixods } from "../../redux-toolkit/features/prixod/prixodSlice";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";

// interface Order {
//   id: number;
//   [key: string]: any;
// }

// interface Prixod {
//   id: number;
//   message: string;
//   isConfirmed: boolean;
//   createdAt: string;
//   order?: Order;
// }

export const PrixodList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { prixods, loading } = useSelector((state: RootState) => state.prixod);

  useEffect(() => {
    dispatch(fetchPrixods());
  }, [dispatch]);

  const unconfirmedPrixods = useMemo(
    () => prixods.filter((p: any) => !p.isConfirmed),
    [prixods]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
          🧾 Prixod Təsdiqi
        </h2>

        <Link to="/importPrixod">
          <Button color="blue" size="sm" className="flex items-center gap-2">
            <HiPlus className="text-lg" /> Əlavə et
          </Button>
        </Link>
      </div>

      {/* Table (Desktop & Tablet) */}
      <div className="hidden sm:block bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-100 text-blue-900 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-center">Prixod №</th>
                <th className="px-4 py-3 text-center">Sifariş</th>
                <th className="px-4 py-3 text-center">Mesaj</th>
                <th className="px-4 py-3 text-center">Tarix</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-8 text-gray-500 italic"
                  >
                    Yüklənir...
                  </td>
                </tr>
              ) : unconfirmedPrixods.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-8 text-gray-500 italic"
                  >
                    Təsdiqlənməmiş mədaxil tapılmadı.
                  </td>
                </tr>
              ) : (
                unconfirmedPrixods.map((prixod: any, index: number) => (
                  <tr
                    key={prixod.id}
                    className={`border-b hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-3 text-center text-blue-600 underline font-medium">
                      <Link to={`/editPrixod/${prixod.id}`}>{prixod.id}</Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {prixod.order?.id ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-center truncate max-w-[200px]">
                      {prixod.comment || "-"}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      {(() => {
                        const date = new Date(prixod.createdAt);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        );
                        const year = date.getFullYear();
                        const hours = String(date.getHours()).padStart(2, "0");
                        const minutes = String(date.getMinutes()).padStart(
                          2,
                          "0"
                        );
                        return `${day}/${month}/${year} ${hours}:${minutes}`;
                      })()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden mt-6 space-y-4">
        {loading ? (
          <p className="text-center text-gray-500 italic">Yüklənir...</p>
        ) : unconfirmedPrixods.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Təsdiqlənməmiş mədaxil tapılmadı.
          </p>
        ) : (
          unconfirmedPrixods.map((prixod: any) => (
            <div
              key={prixod.id}
              className="bg-white rounded-lg shadow-md border border-gray-100 p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <Link
                  to={`/editPrixod/${prixod.id}`}
                  className="text-blue-600 font-semibold underline"
                >
                  Prixod №{prixod.id}
                </Link>
                <span className="text-xs text-gray-500">
                  {new Date(prixod.createdAt).toLocaleDateString("az-AZ")}
                </span>
              </div>

              <p className="text-sm text-gray-700">
                <span className="font-semibold">Sifariş:</span>{" "}
                {prixod.order?.id ?? "-"}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Mesaj:</span>{" "}
                {prixod.message || "-"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
