import { Button, Select, TextInput } from "flowbite-react";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { PriceListHistInterface } from "../../types";
import { Type } from "../../enums/projectEnums";
import * as XLSX from "xlsx";

const PriceList = () => {
  const fileUpload = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const[year, setYear] = useState("2025");
  const [month, setMonth] = useState("1");
  const [type, setType] = useState<Type>(Type.Man);
  const [initialValues, setInitialValues] = useState<PriceListHistInterface[]>([
    {
      name: "",
      nameDe: "",
      price: 0,
      quantity: 0,
      year: "2025",
      kod: "",
      origKod: "",
      type: Type.Man,
      rabatgrup: 0,
      month: "1",
    },
  ]);

  console.log(initialValues);

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  const handleFileUploadClick = () => {
    if (fileUpload.current) {
      fileUpload.current.click();
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }

    const file = e.target.files ? e.target.files[0] : null;
    if (!file || file == null) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

     const mappedData: PriceListHistInterface[] = jsonData
  .map((item: any) => {
    if (!Array.isArray(item)) return null;

    return {
      name: String(item[0] ?? ""),        // Column A
      nameDe: String(item[1] ?? ""),      // Column B
      price: parseFloat(item[2]) || 0,    // Column C
      quantity: parseFloat(item[3]) || 0, // Column D
      kod: String(item[4] ?? ""),         // Column E
      origKod: String(item[5] ?? ""),     // Column F
      rabatgrup: parseFloat(item[6]) || 0, // Column G
      year,
      type,
      month
    };
  })
  .filter((row) => row !== null); // remove null rows
      setInitialValues(mappedData);
    };
    reader.readAsArrayBuffer(file);
  };
  return (
    <div className="min-h-screen">
        <form className="flex items-center gap-5"  onSubmit={()=>onSubmit}>
            <div className="flex  gap-5 items-center p-4">
            <Select sizing={"sm"} className="w-32" name="year" onChange={(e) => setYear(e.target.value)}>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </Select>
            <div className="flex items-center  gap-2">
              <span className="text-md">Month</span>
              <Select sizing={"sm"} className="w-32" name="month"  onChange={(e) => setMonth(e.target.value)}>
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

            <Select sizing={"sm"} className="w-32" name="type"  onChange={(e) => setType(e.target.value as Type)}>
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
                onChange={handleFile}
                accept=".xlsx, .xls,.csv"
              />
              <FaUpload
                className="cursor-pointer hover:text-blue-700"
                onClick={handleFileUploadClick}
              />
              {fileName && (
                <span className="text-sm text-blue-600">{fileName}</span>
              )}
              <span>Excell faylı seç</span>
            </div>
            <Button color={"blue"} size={"xs"} type="submit">
              Yüklə
            </Button>
          </div>
        </form>
    </div>
  );
};

export default PriceList;
