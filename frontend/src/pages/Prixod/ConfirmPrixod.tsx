import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store";
import { fetchPrixods } from "../../redux-toolkit/features/prixod/prixodSlice";
import { Link } from "react-router-dom";
import { Button} from "flowbite-react";
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

export const ConfirmPrixod = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { prixods, loading } = useSelector((state: RootState) => state.prixod);

  useEffect(() => {
    dispatch(fetchPrixods());
  }, [dispatch]);

  const confirmedPrixods = useMemo(
    () => prixods.filter((p: any) => p.isConfirmed),
    [prixods]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
          ✅ Təsdiq olunmuş mədaxillər
        </h2>

        <Link to="/importPrixod">
            
          <Button color="blue" size={"xs"} className=" flex gap-2 item-center text-center">
            <HiPlus/>
            Əlavə et
          </Button>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-blue-100 text-blue-900 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-center">Seçim</th>
                <th className="px-4 py-3 text-center">Mədaxil №</th>
                <th className="px-4 py-3 text-center">Rəsmi</th>
                <th className="px-4 py-3 text-center">Sifariş</th>
                <th className="px-4 py-3 text-center">Mesaj</th>
                <th className="px-4 py-3 text-center">Tarix</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-500 italic"
                  >
                    Yüklənir...
                  </td>
                </tr>
              ) : confirmedPrixods.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-500 italic"
                  >
                    Təsdiq olunmuş mədaxil tapılmadı.
                  </td>
                </tr>
              ) : (
                confirmedPrixods.map((prixod: any, index: number) => (
                  <tr
                    key={prixod.id}
                    className={`border-b hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="text-center">
                      <input type="radio" />
                    </td>

                    <td className="px-4 py-3 text-center text-blue-600 underline font-medium">
                      <Link to={`/editPrixod/${prixod.id}`}>{prixod.id}</Link>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <input type="checkbox"/>
                    </td>

                    <td className="px-4 py-3 text-center">
                      {prixod.order?.id ?? "-"}
                    </td>

                    <td className="px-4 py-3 text-center truncate max-w-[200px]">
                      {prixod.message || "-"}
                    </td>

                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      {new Date(prixod.createdAt).toLocaleString("az-AZ", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="sm:hidden mt-8 space-y-4">
        {confirmedPrixods.map((prixod: any) => (
          <div
            key={prixod.id}
            className="bg-white shadow rounded-lg p-4 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <Link
                to={`/editPrixod/${prixod.id}`}
                className="text-blue-600 font-semibold underline"
              >
                Mədaxil №{prixod.id}
              </Link>
              <span className="text-xs text-gray-500">
                {new Date(prixod.createdAt).toLocaleDateString("az-AZ")}
              </span>
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Sifariş:</span>{" "}
              {prixod.order?.id ?? "-"}
            </p>
            <p className="text-sm text-gray-700 truncate">
              <span className="font-semibold">Mesaj:</span>{" "}
              {prixod.message || "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
