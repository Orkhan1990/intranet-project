import { Field, Form, Formik } from "formik";
import { Button, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { SupplierInterface } from "../../types";
import { useNavigate } from "react-router-dom";

const AddSuppliers = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const navigate=useNavigate();

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
    id:0,
    supplier: "",
    country: "USA",
    contactPerson: "",
    phone: "",
    email: "",
    paymentType: "",
    deliverType: "cip",
    deliverPeriod: "",
    creditLine: "",
    creditNote: "",
    creditDuration: "",
  };

  const onsubmit = async (values: SupplierInterface,props:any) => {
    console.log(values);

    const res = await fetch(
      "http://localhost:3013/api/v1/supplier/createSupplier",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();

    if (data.success === false) {
      setError(data.message);
      return;
    }

    if (res.ok) {
      setSuccess(`${data.supplier} yaradıldı`);
      setTimeout(() => {
        props.resetForm();
        props.setSubmitting(false);
        setSuccess("");
        navigate("/suppliers");
        window.scrollTo(0,0);
      }, 1000);
    }

    setError("");
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
            <Field as={TextInput} name="supplier" className="w-96" sizing="sm"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Ölkə
            </label>
            <Field as={Select} name="country" sizing="sm">
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
            <Field as={TextInput} name="contactPerson" className="w-96" sizing="sm"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Telefon
            </label>
            <Field as={TextInput} name="phone" className="w-96" sizing="sm"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              E-mail
            </label>
            <Field as={TextInput} type="email" name="email" className="w-96" sizing="sm"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Ödəniş növü
            </label>
            <Field as={TextInput} name="paymentType" className="w-96" sizing="sm"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Çatdırılma tipi
            </label>
            <Field as={Select} name="deliverType" sizing="sm">
              <option value="cip">CIP</option>
              <option value="exw">EXW</option>
              <option value="dap">DAP</option>
            </Field>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Çatdırılma müddəti
            </label>
            <Field as={TextInput} name="deliverPeriod" className="w-96" sizing="sm"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Kredit xətti
            </label>
            <Field as={TextInput} name="creditLine" className="w-96" sizing="sm"/>
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Kredit qeydiyyatı
            </label>
            <Field as={TextInput} name="creditNote" className="w-96" sizing="sm" />
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Kredit müddəti
            </label>
            <Field as={TextInput} name="creditDuration" sizing="sm" className="w-96" />
          </div>
          <Button color={"blue"} type="submit" size={"xs"} className="mt-10">
            Yadda Saxla
          </Button>
        </Form>
      </Formik>
      {!error && success && <p className="text-md text-green-700 ml-10 mt-10 ">{success}</p>}
      {error && !success && <p className="text-lg text-red-700 ml-10 mt-10">{error}</p>}
    </div>
  );
};

export default AddSuppliers;
