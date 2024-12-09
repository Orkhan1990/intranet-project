import { Field, Form, Formik } from "formik";
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { SupplierInterface } from "../../types";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateSupplier = () => {
  const [error, setError] = useState("");
  const [success,setSuccess]=useState("");
  const [supplierInitialValue, setSupplierInitialValue] = useState<SupplierInterface>({
    id: 0,
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
  });

  const navigate=useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const getSupplier = async () => {
      const res = await fetch(
        `http://localhost:3013/api/v1/supplier/getSupplier/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      if (res.ok) {
        setSupplierInitialValue(data);
      }

      setError("");
    };

    getSupplier();
  }, [id]);

  const countries: string[] = [
    "USA",
    "Germany",
    "Turkey",
    "China",
    "Russia",
    "Ukraina",
    "United Kingdom",
  ];


  const onsubmit = async (values: SupplierInterface) => {
    console.log(values);

    
    const res = await fetch(
        `http://localhost:3013/api/v1/supplier/updateSupplier/${id}`,
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
        setSuccess(`${data.supplier} məlumatı yeniləndi`);
        setTimeout(()=>
          {
            () => setSuccess(""); 
            navigate('/suppliers');
          }, 3000); // Reset success message after 3 seconds
        
        // Navigate to the Suppliers page after a successful update
      }
      
      setError("");
  };

  return (
    <div className="min-h-screen mt-[100px] mb-[100px]">
      <h2 className="text-lg font-semibold text-center">Məlumatı dəyiş</h2>

      <Formik
        initialValues={supplierInitialValue}
        onSubmit={onsubmit}
        enableReinitialize
      >
        <Form className="ml-10 mt-20">
          <div className="flex  items-center  ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Təchizatçı
            </label>
            <Field as={TextInput} name="supplier" className="w-96" />
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
            <Field as={TextInput} name="contactPerson" className="w-96" />
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Telefon
            </label>
            <Field as={TextInput} name="phone" className="w-96" />
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              E-mail
            </label>
            <Field as={TextInput} type="email" name="email" className="w-96" />
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Ödəniş növü
            </label>
            <Field as={TextInput} name="paymentType" className="w-96" />
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Çatdırılma tipi
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
            <Field as={TextInput} name="deliverPeriod" className="w-96" />
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Kredit xətti
            </label>
            <Field as={TextInput} name="creditLine" className="w-96" />
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Kredit qeydiyyatı
            </label>
            <Field as={TextInput} name="creditNote" className="w-96" />
          </div>

          <div className="flex  items-center mt-5 ">
            <label htmlFor="" className="text-sm  w-[200px]">
              Kredit müddəti
            </label>
            <Field as={TextInput} name="creditDuration" className="w-96" />
          </div>
          <Button color={"blue"} type="submit" className="mt-10">
            Yadda Saxla
          </Button>
        </Form>
      </Formik>
      {!error && success && <p className="text-md text-green-700 ml-10 mt-10 ">{success}</p>}
      {error && !success && <p className="text-lg text-red-700 ml-10 mt-10">{error}</p>}
    </div>
  );
};

export default UpdateSupplier;
