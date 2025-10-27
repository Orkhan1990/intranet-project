import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux-toolkit/store/store";
import { fetchPrixods } from "../../redux-toolkit/features/prixod/prixodSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export const PrixodList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { prixods } = useSelector((state: RootState) => state.prixod);

  useEffect(() => {
    dispatch(fetchPrixods());
  }, [dispatch]);

  return (
    <div className="min-h-screen mt-[100px] mb-[100px]">
      <div className="ml-5">
        <h2 className="text-center font-semibold text-xl">Prixod Təsdiqi</h2>
        <table className="  mt-10 border-collapse border border-gray-300 ">
          <thead className="bg-gray-400 text-black ">
            <tr className="flex gap-10 p-3">
              <th className="w-64 font-normal px-4">Prixod</th>
              <th className="w-64 font-normal px-4">Sifariş</th>
              <th className="w-64 font-normal px-4">Mesaj</th>
              <th className="w-64 font-normal px-4">Tarix</th>
            </tr>
          </thead>
          <tbody>
            {prixods
              .filter((prixod) => prixod.isConfirmed === false) // 👈 only show unconfirmed
              .map((prixod) => (
                <tr
                  key={prixod.id}
                  className="flex items-center gap-10 p-3 border-b hover:bg-gray-100"
                >
                  <td className="w-64 text-center px-4 underline">
                    <Link to={`/editPrixod/${prixod.id}`}>{prixod.id}</Link>
                  </td>
                  <td className="w-64 text-center ">
                    {prixod.order?.id ?? "-"}
                  </td>
                  <td className="w-64 text-center ">{prixod.message}</td>
                  <td className="w-64 text-center">
                    {new Date(prixod.createdAt).toLocaleString("az-AZ", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            <td></td>
          </tbody>
        </table>
        <Link to={"/importPrixod"}>
          <Button color={"blue"} size={"xs"} className="mt-10">
            Əlavə et
          </Button>
        </Link>
      </div>
    </div>
  );
};
