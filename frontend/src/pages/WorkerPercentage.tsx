import { RootState, AppDispatch } from "../redux-toolkit/store/store";
import { fetchUsers } from "../redux-toolkit/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const WorkerPercentage = () => {
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const workers = users.filter((p) => p.isWorker === true|| p.userRole === "ServiceUser");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-8 lg:px-20">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          İşçilərin Faizi
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left  text-gray-700 font-medium">
                  İşçi adı
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-medium">
                  Faiz (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {workers && workers.length > 0 ? (
                workers.map((user: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                      {`${user?.firstName || ""} ${user?.lastName || ""}`}
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={user.percent ?? 0}
                        readOnly
                        className="w-20 text-sm text-center border rounded-md py-1 text-gray-700 bg-gray-50"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Heç bir işçi tapılmadı
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerPercentage;

