import { Button, Select, TextInput } from "flowbite-react";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { PriceListHistInterface } from "../../types";
import { Type } from "../../enums/projectEnums";
import * as XLSX from  "xlsx";




const PriceList = () => {
  const fileUpload = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const[ initialValues, setInitialValues] = useState<PriceListHistInterface[]>([{
    name: "",
    nameDe: "",
    price: 0,
    quantity: 0,
    year: "2025",
    kvartal: 0,
    kod: "",
    origKod: "",
    type:Type.Man,
    rabatgrup: 0,
    month: "1"
  }]);
  

 

 

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

    const file=e.target.files ? e.target.files[0] : null;
    if (!file||file==null) { 
       return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data= event.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData:any[]=XLSX.utils.sheet_to_json(worksheet);

      const mappedData:PriceListHistInterface[]=jsonData.map((item:any) => ({
         ...item,
         name:item.name||"",
         nameDe:item.nameDe||"",
          price:parseFloat(item.price)||0,
          quantity:parseFloat(item.quantity)||0,
          rabatgrup:parseFloat(item.rabatgrup)||0,
          kod:item.kod||"",
          origKod:item.origKod||"",
      }))
      setInitialValues(mappedData);
    }
     reader.readAsArrayBuffer(file);  
    };
  return (
    <div className="min-h-screen">
      <Formik initialValues={initialValues} onSubmit={onSubmit}  enableReinitialize>
        <Form className="flex items-center gap-5">
          <div className="flex  gap-5 items-center p-4">
            <Select sizing={"sm"} className="w-32" name="year">
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </Select>
            <div className="flex items-center  gap-2">
              <span className="text-md">Month</span>
              <Select sizing={"sm"} className="w-32" name="month">
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

            <Select sizing={"sm"} className="w-32" name="type">
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
        </Form>
      </Formik>
    </div>
  );
};

export default PriceList;
