import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
// import { PriceListHistInterface } from "../../types";
import { Type } from "../../enums/projectEnums";
import { uploadExcell } from "../../api/uploadExcel";
// import * as XLSX from "xlsx";

const PriceList = () => {
  const fileUpload = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [upload, setUpload] = useState(false);
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("1");
  const [type, setType] = useState<Type>(Type.Man);
  const [result, setResult] = useState<boolean>(false);
  const [spinner, setSpinner] = useState(false);
  console.log(upload);
  

  // Define the expected response type from uploadExcell
  interface UploadExcelResponse {
    success: boolean;
    [key: string]: any;
  }

  useEffect(() => {
  if (error || result) {
    const timer = setTimeout(() => {
      setError(false);
      setResult(false);
    }, 8000);

    return () => clearTimeout(timer); // cleanup on unmount
  }
}, [error, result]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) console.error("No file selected");
    setSpinner(true);

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("year", year);
    formData.append("month", month);
    formData.append("type", type);

    const data = (await uploadExcell(
      formData,
      setUpload,
      setError
    )) as UploadExcelResponse;
    console.log(data);
    if (data && data.success) {
      setResult(true);
      setSpinner(false);
      setError(false);
    } else {
      setError(true);
      setResult(false);
      setSpinner(false);
    }

    setFileName("");

    // ✅ Reset file input so same file can be selected again
    if (fileUpload.current) {
      fileUpload.current.value = "";
    }
    setFile(null);
  };

  const handleFileUploadClick = () => {
    if (fileUpload.current) {
      fileUpload.current.click();
    }
  };

  const handleFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }

    const file = e.target.files ? e.target.files[0] : null;
    if (!file || file == null) {
      return;
    }
    setFile(file);
  };
  return (
    <div className="min-h-screen">
      <form
        className="flex items-center gap-5"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <div className="flex  gap-5 items-center p-4">
          <Select
            sizing={"sm"}
            className="w-32"
            name="year"
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </Select>
          <div className="flex items-center  gap-2">
            <span className="text-md">Month</span>
            <Select
              sizing={"sm"}
              className="w-32"
              name="month"
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </Select>
          </div>

          <Select
            sizing={"sm"}
            className="w-32"
            name="type"
            onChange={(e) => setType(e.target.value as Type)}
          >
            <option value="man">Man</option>
            <option value="sachs1">Sachs1</option>
            <option value="sachs2">Sachs2</option>
            <option value="lemferder">Lemferder</option>
            <option value="knor">Knor</option>
            <option value="hengs">Hengs</option>
            <option value="diezel_technik">Diezel Technik</option>
          </Select>

          <div className="flex items-center gap-5">
            <TextInput
              type="file"
              sizing={"xs"}
              className="text-sm hidden"
              ref={fileUpload}
              onChange={(event) => handleFile(event)}
              accept=".xlsx, .xls,.csv"
            />
            <FaUpload
              className="cursor-pointer hover:text-blue-700"
              onClick={handleFileUploadClick}
            />
            {fileName && (
              <span className="text-sm text-blue-600">{fileName}</span>
            )}
            <span>.csv faylı seç</span>
          </div>
          <div className="flex items-center gap-5">
            <Button color={"blue"} size={"xs"} type="submit" disabled={spinner}>
              Yüklə
            </Button>
            {spinner && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </form>


      {error && (
        <p className="text-red-700 font-semibold p-4">
          Məlumatlar yüklənərkən xəta baş verdi
        </p>
      )}
      {result&&(
        <p className="text-green-700 font-semibold p-4">
          Məlumatlar uğurla yükləndi
        </p>
      )}
    </div>
  );
};

export default PriceList;
