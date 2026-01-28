import { Field, Form, Formik } from "formik";
import { WorkCatalogInterface } from "../types";
import { createWorkCatalogAPI } from "../api/allApi";
import { useState } from "react";

const WorkCatalog = () => {
  const [result, setResult] = useState<any>(null);
  const initialValues: WorkCatalogInterface = {
    av: "",
    name: "",
    code: "",
  };

  console.log({ result });

  const onSubmit = async (values: WorkCatalogInterface, { resetForm }: any) => {
    try {
      const res = await createWorkCatalogAPI(values);
      if (res.success) {
        setResult("İş Kataloqu uğurla yaradıldı");
        resetForm();
      } else {
        setResult("Xəta baş verdi, yenidən cəhd edin");
      }

      setTimeout(() => {
        setResult(null);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-3 md:px-8 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
          İş Kataloqu yaratmaq
        </h2>
      </div>

      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-gray-700 font-semibold mb-2"
              >
                Kod
              </label>
              <Field
                as="input"
                type="text"
                name="code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Kod daxil edin"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Ad
              </label>
              <Field
                as="input"
                type="text"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ad daxil edin"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="av"
                className="block text-gray-700 font-semibold mb-2"
              >
                AV
              </label>
              <Field
                as="input"
                type="text"
                name="av"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="AV daxil edin"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Yarat
            </button>
          </Form>
        </Formik>
      </div>
      <p className="text-sm  text-center">{result}</p>
    </div>
  );
};

export default WorkCatalog;
