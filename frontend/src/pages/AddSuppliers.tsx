import { Field, Form, Formik } from "formik";
import { SupplierInterface } from "../types";
import { Button, Select, TextInput } from "flowbite-react";

const AddSuppliers = () => {
  const countries: string[] = [
    "USA",
    "Germany",
    "Turkey",
    "China",
    "Russia",
    "Ukraina",
    "United Kingdom",
  ];
  const SupplierInitialValue: SupplierInterface = {
    supplier: "",
    country: "",
    contactPerson: "",
    phone: "",
    email: "",
    paymentType: "",
    deliverType: "",
    deliverPeriod: "",
    creditLine: "",
    creditNote: "",
    creditDuration: "",
  };

  const onsubmit = (values: SupplierInterface) => {
    console.log(values);
  };
  return (
    <div className="min-h-screen mt-[100px] mb-[100px]">
      <h2 className="text-lg font-semibold text-center">Yeni Təchizatçı</h2>

      <Formik initialValues={SupplierInitialValue} onSubmit={onsubmit}>
        <Form className="ml-10 mt-20">
          <div className="flex  items-center  ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Təchizatçı
            </label>
            <Field as={TextInput} name="supplier" className="w-96"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Ölkə
            </label>
            <Field as={Select} name="country">
              {countries.map((item: string, index: number) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Field>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
            Əlaqədar şəxs
            </label>
            <Field as={TextInput} name="contactPerson" className="w-96"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Telefon
            </label>
            <Field as={TextInput} name="phone" className="w-96"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              E-mail
            </label>
            <Field as={TextInput} name="email" className="w-96"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
            Ödəniş növü
            </label>
            <Field as={TextInput} name="paymentType" className="w-96"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Təchizatçı
            </label>
            <Field as={Select} name="deliverType">
                <option value="cip">CIP</option>
                <option value="exw">EXW</option>
                <option value="dap">DAP</option>
            </Field>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
            Çatdırılma müddəti
            </label>
            <Field as={TextInput} name="deliverPeriod" className="w-96"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Kredit xətti
            </label>
            <Field as={TextInput} name="creditLine" className="w-96"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Kredit qeydiyyatı
            </label>
            <Field as={TextInput} name="creditNote" className="w-96"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
            Kredit müddəti
            </label>
            <Field as={TextInput} name="creditDuration" className="w-96"/>
          </div>
           <Button color={"blue"} className="mt-10">Yadda Saxla</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddSuppliers;
