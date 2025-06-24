import { Button, Select, TextInput } from "flowbite-react";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

const PriceList = () => {
  const fileUpload = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const initialValues = {};

  const onSubmit = (values: typeof initialValues) => {};

  const handleFileUploadClick = () => {
    if (fileUpload.current) {
      fileUpload.current.click();
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };
  return (
    <div className="min-h-screen">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="flex items-center gap-5">
          <div className="flex  gap-5 items-center p-4">
            <Select sizing={"sm"} className="w-32">
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </Select>
            <div className="flex items-center  gap-2">
              <span className="text-md">Month</span>
              <Select sizing={"sm"} className="w-32">
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

            <Select sizing={"sm"} className="w-32">
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
              />
              <FaUpload
                className="cursor-pointer hover:text-blue-700"
                onClick={handleFileUploadClick}
              />
              {fileName && (
                <span className="text-sm text-blue-600">{fileName}</span>
              )}
              <span>Faylı seç</span>
            </div>
            <Button color={"blue"} size={"xs"}>
              Yüklə
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default PriceList;
