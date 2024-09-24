import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

// import {useSelector} from "react-redux";
// import { RootState } from "../redux-toolkit/store/store";

interface NewClientInterface {
  companyName: string;
  companyRepresentative: string;
  phoneNumber: string;
  email: string;
  address: string;
  requisite: string;
  voen: string;
  contractNumber: string;
  contractDate: string;
  approver: string;
  oneCCode: string;
  type: string;
  typeOfStatus: string;
  av: number;
  partsDiscount: number;
}

const NewClient = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");

  const initialValues: NewClientInterface = {
  companyName:"",
  companyRepresentative:"",
  phoneNumber:"",
  email:"",
  address:"",
  requisite:"",
  voen:"",
  contractNumber:"",
  contractDate:"",
  approver:"",
  oneCCode:"",
  type:"",
  typeOfStatus:"",
  av:0,
  partsDiscount:0
  };

  const clientValidationSchema = Yup.object().shape({
    userName: Yup.string().required("Xananı doldur!"),
    password: Yup.string().required("Xananı doldur!"),
  });

 

  const onSubmit = async (e: any, values: any) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:3013/api/v1/client/clientCreate",
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
        setError(false);
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
              <TextInput
                id="companyName"
                type="text"
                placeholder="Şirkət adı"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="companyRepresentative"
                value="Şirkət nümayəndəsi"
              />
              <TextInput
                id="companyRepresentative"
                type="text"
                placeholder="Şirkət nümayəndəsi"
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber" value="Telefon nömrəsi" />
              <TextInput
                id="phoneNumber"
                type="text"
                placeholder="Telefon nömrəsi"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput id="email" type="email" placeholder="Email" required />
            </div>

            <div>
              <Label htmlFor="address" value="Ünvan" />
              <TextInput
                id="address"
                type="text"
                placeholder="Ünvan"
                required
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
              />
            </div>
            <div className="flex gap-20">
              <div>
                <Label htmlFor="type" value="Tipi" />
                <Field as={Select} id="type" required>
                  <option value={"customer"}>Müştəri</option>
                  <option value={"worker"}>Işçi</option>
                  <option value={"boss"}>Təsisçi</option>
                  <option value={"itb"}>İTB</option>
                </Field>
              </div>
              <div>
                <Label htmlFor="typeOfStatus" value="FizikiHüquqi" />
                <Field as={Select} id="typeOfStatus" required>
                  <option value={"phisical"}>Fiziki</option>
                  <option value={"legal"}>Hüquqi</option>
                </Field>
              </div>
            </div>
            <Button type="submit" color="blue" className="w-[200px]">
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
