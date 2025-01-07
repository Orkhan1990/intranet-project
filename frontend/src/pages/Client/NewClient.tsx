import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ClientInterface } from "../../types";
import { useNavigate } from "react-router-dom";



const NewClient = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate=useNavigate();

  const initialValues: ClientInterface = {
    id:0,
    companyName: "",
    companyRepresentative: "",
    phoneNumber: "",
    email: "",
    address: "",
    requisite: "",
    voen: "",
    contractNumber: "",
    contractDate: "",
    approver: "",
    oneCCode: "",
    type: "",
    typeOfStatus: "",
    av: 0,
    partsDiscount: 0,
  };

  const clientValidationSchema = Yup.object().shape({
    companyName: Yup.string().required("Xananı doldur!"),
    companyRepresentative: Yup.string().required("Xananı doldur!"),
    phoneNumber: Yup.string().required("Xananı doldur!"),
    email: Yup.string().required("Xananı doldur!"),
    address: Yup.string().required("Xananı doldur!"),
    requisite: Yup.string().required("Xananı doldur!"),
    voen: Yup.string().required("Xananı doldur!"),
    contractNumber: Yup.string().required("Xananı doldur!"),
    contractDate: Yup.string().required("Xananı doldur!"),
    approver: Yup.string().required("Xananı doldur!")
  });

  const onSubmit = async ( values: any) => {
    try {
      const res = await fetch(
        "http://localhost:3013/api/v1/client/createClient",
        {
          method: "POST",
          credentials: "include", // added this part
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();
      if (!res.ok || data.success === false) {
        setError(data.message.sqlMessage);
        setSuccess("");
      }
      if (res.ok) {
        setSuccess(`${values.companyName} şirkəti yaradıldı`);
        setTimeout(() => {
          setError(false);
          navigate("/clientList");
          window.scrollTo(0,0); 
        }, 2000);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="m-10 max-w-2xl mx-auto">
        <h2 className="text-2xl text-center font-semibold">Yeni müştəri</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={clientValidationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-5">
            <div>
              <Label htmlFor="companyName" value="Şirkət adı" />
              <Field as={TextInput}
                id="companyName"
                type="text"
                placeholder="Şirkət adı"
                name="companyName"
                required
                sizing={"sm"}
              />
              <ErrorMessage
                name="companyName"
                component="div"
                className="text-red-700"
              />
            </div>

            <div>
              <Label
                htmlFor="companyRepresentative"
                value="Şirkət nümayəndəsi"
              />
              <Field as={TextInput}
                id="companyRepresentative"
                type="text"
                placeholder="Şirkət nümayəndəsi"
                name="companyRepresentative"
                required
                sizing={"sm"}
              />
              <ErrorMessage
                name="companyRepresentative"
                component="div"
                className="text-red-700"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber" value="Telefon nömrəsi" />
              <Field as={TextInput}
                id="phoneNumber"
                type="text"
                placeholder="Telefon nömrəsi"
                required
                name="phoneNumber"
                sizing={"sm"}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-700"
              />
            </div>

            <div>
              <Label htmlFor="email" value="Email" />
              <Field as={TextInput} id="email" type="email" placeholder="Email" required name="email" sizing={"sm"}/>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-700"
              />
            </div>

            <div>
              <Label htmlFor="address" value="Ünvan" />
              <Field as={TextInput}
                id="address"
                type="text"
                placeholder="Ünvan"
                required
                name="address"
                sizing={"sm"}
              />
               <ErrorMessage
                name="address"
                component="div"
                className="text-red-700"
              />
            </div>

            <div>
              <Label htmlFor="requisite" value="Rekvizit" />
              <Field
                as={Textarea}
                id="requisite"
                type="text"
                placeholder="Rekvizitlər...."
                rows={4}
                required
                name="requisite"
                sizing={"sm"}
              />
              <ErrorMessage
                name="requisite"
                component="div"
                className="text-red-700"
              />
            </div>
            <div>
              <Label htmlFor="voen" value="Vöen" />
              <Field
                as={TextInput}
                id="voen"
                type="text"
                placeholder="Vöen"
                required
                name="voen"
                sizing={"sm"}
              />
               <ErrorMessage
                name="voen"
                component="div"
                className="text-red-700"
              />
            </div>

            <div>
              <Label htmlFor="contractNumber" value="Müqavilə nömrəsi" />
              <Field
                as={TextInput}
                id="contractNumber"
                type="text"
                placeholder="Müqavilə nömrəsi"
                required
                name="contractNumber"
                sizing={"sm"}
              />
                <ErrorMessage
                name="contractNumber"
                component="div"
                className="text-red-700"
              />
            </div>

            <div>
              <Label htmlFor="contractDate" value="Müqavilə tarixi" />
              <Field
                as={TextInput}
                id="contractDate"
                type="text"
                placeholder="Müqavilə tarixi"
                required
                name="contractDate"
                sizing={"sm"}
              />
               <ErrorMessage
                name="contractDate"
                component="div"
                className="text-red-700"
              />
            </div>
            <div>
              <Label htmlFor="approver" value="Təsdiq edən şəxs" />
              <Field
                as={TextInput}
                id="approver"
                type="text"
                placeholder="Təsdiq edən şəxs"
                required
                name="approver"
                sizing={"sm"}
              />
              <ErrorMessage
                name="approver"
                component="div"
                className="text-red-700"
              />
            </div>

            <div>
              <Label htmlFor="oneCCode" value="1C kod" />
              <Field
                as={TextInput}
                id="oneCCode"
                type="text"
                placeholder="1C kod"
                required
                name="oneCCode"
                sizing={"sm"}
              />
            </div>
            <div className="flex gap-20">
              <div>
                <Label htmlFor="type" value="Tipi" />
                <Field as={Select} id="type" required name="type" sizing={"sm"}>
                  <option value={"customer"}>Müştəri</option>
                  <option value={"worker"}>Işçi</option>
                  <option value={"boss"}>Təsisçi</option>
                  <option value={"itb"}>İTB</option>
                </Field>
              </div>
              <div>
                <Label htmlFor="typeOfStatus" value="FizikiHüquqi" />
                <Field as={Select} id="typeOfStatus" required name="typeOfStatus" sizing={"sm"}>
                  <option value={"phisical"}>Fiziki</option>
                  <option value={"legal"}>Hüquqi</option>
                </Field>
               
              </div>
            </div>
            <Button type="submit" color="blue" className="w-[150px]" size={"xs"}>
              Yadda Saxla
            </Button>
          </Form>
        </Formik>
        {error && <p className="text-red-600">{error}</p>}
        {success && !error && <p className="text-green-600 mt-5">{success}</p>}
      </div>
    </div>
  );
};

export default NewClient;
