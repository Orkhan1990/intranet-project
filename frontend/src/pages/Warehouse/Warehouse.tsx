const Warehouse = () => {
  return (
    <div className="min-h-screen relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Orijinal kod
            </th>
            <th scope="col" className="px-6 py-3">
              Kod
            </th>
            <th scope="col" className="px-6 py-3">
              Brend
            </th>
            <th scope="col" className="px-6 py-3">
              Adı
            </th>
            <th scope="col" className="px-6 py-3">
              Say
            </th>
            <th scope="col" className="px-6 py-3">
              Rezerv
            </th>
            <th scope="col" className="px-6 py-3">
              Likvidlik
            </th>
            <th scope="col" className="px-6 py-3">
              Qiymət
            </th>
            <th scope="col" className="px-6 py-3">
              Satış qiyməti
            </th>
            <th scope="col" className="px-6 py-3">
              Barkod
            </th>
            <th scope="col" className="px-6 py-3">
              Yerləşmə yeri
            </th>
            <th scope="col" className="px-6 py-3">
            </th>
            <th scope="col" className="px-6 py-3">
              Yaradılma tarixi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
       
        </tbody>
      </table>
    </div>
  );
};

export default Warehouse;
