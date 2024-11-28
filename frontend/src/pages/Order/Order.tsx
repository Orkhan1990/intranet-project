const Order = () => {
  return (
    <div className="min-h-screen mt-[100px] mb-[100px]  ">
      <div className="relative">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-[10px]"></th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Müştəri
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Maşın üçün
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Faktura
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Faktura №
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Ödəniş növü
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Çatdırılma üsulu
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Yaradılıb
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                İlkin ödəniş (%)
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Say
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Satış qiyməti
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Mərhələ
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Müraciət tarixi
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Anbar təsdiqi
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
                Məsuliyyətli və başlanğıc tarixi
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
              Təchizatçıya müraciət
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
              Təchizatçının cavabı 
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
              Sifariş
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
              Mühasibat təsdiqi 
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
              Ödəniş
              </th>
              <th scope="col" className="px-6 py-3 text-[10px]">
              Göndərmə
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
