import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { ClientInterface } from "../../types";
import { useNavigate } from "react-router-dom";


const UpdateClient = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [initialValues, setInitialValues] = useState<ClientInterface>({
    id: 0,
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
  });

    const navigate=useNavigate();


  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const getClientData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3013/api/v1/client/getClient/${id}`,
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (!res.ok || data.success === false) {
          setError(data.message);
          return;
        }
        console.log(data);
        setInitialValues(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    getClientData();
  }, [id]);

  const onSubmit = async (values: ClientInterface) => {
    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/client/updateClient/${id}`,
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
        setError(data.message);
        setSuccess("");
      }
      if (res.ok) {
        setSuccess(`${values.companyName} şirkətinin məlumatı yeniləndi`);
          setTimeout(() => {
                  setError(false);
                  navigate("/clientList");
                  window.scrollTo(0,0); 
                }, 2000);
        setError(false);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="m-10 max-w-2xl mx-auto">
        <h2 className="text-2xl text-center font-semibold">
          Müştəri məlumatın yeniləmək
        </h2>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          <Form className="flex flex-col gap-5">
            <div>
              <Label htmlFor="companyName" value="Şirkət adı" />
              <Field
                as={TextInput}
                id="companyName"
                type="text"
                placeholder="Şirkət adı"
                name="companyName"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="companyRepresentative"
                value="Şirkət nümayəndəsi"
              />
              <Field
                as={TextInput}
                id="companyRepresentative"
                type="text"
                placeholder="Şirkət nümayəndəsi"
                required
                name="companyRepresentative"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber" value="Telefon nömrəsi" />
              <Field
                as={TextInput}
                id="phoneNumber"
                type="text"
                placeholder="Telefon nömrəsi"
                required
                name="phoneNumber"
              />
            </div>

            <div>
              <Label htmlFor="email" value="Email" />
              <Field
                as={TextInput}
                id="email"
                type="email"
                placeholder="Email"
                required
                name="email"
              />
            </div>

            <div>
              <Label htmlFor="address" value="Ünvan" />
              <Field
                as={TextInput}
                id="address"
                type="text"
                placeholder="Ünvan"
                required
                name="address"
              />
            </div>

            <div>
              <Label htmlFor="requisite" value="Rekvizit" />
              <Field
                as={Textarea}
                id="requisite"
                type="text"
                placeholder="Rekvizitlər...."
                name="requisite"
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
                name="voen"
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
              />
            </div>
            <div className="flex gap-20">
              <div>
                <Label htmlFor="type" value="Tipi" />
                <Field as={Select} id="type" required name="type">
                  <option value={"customer"}>Müştəri</option>
                  <option value={"worker"}>Işçi</option>
                  <option value={"boss"}>Təsisçi</option>
                  <option value={"itb"}>İTB</option>
                </Field>
              </div>
              <div>
                <Label htmlFor="typeOfStatus" value="FizikiHüquqi" />
                <Field
                  as={Select}
                  id="typeOfStatus"
                  required
                  name="typeOfStatus"
                >
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

export default UpdateClient;
