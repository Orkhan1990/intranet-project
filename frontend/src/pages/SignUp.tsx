import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const [error, setError] = useState(false||"");
  const [success, setSuccess] = useState(false||"");
 

  interface InitialValueInterface {
    userName: string;
    email: string;
    password: string;
  }

  const initialValues: InitialValueInterface = {
    userName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Xananı doldur!"),
    email: Yup.string()
      .email("Düzgün email əlavə et!")
      .required("Xananı doldur!"),
    password: Yup.string()
      .min(8, "Şifrə ən az 8 xarakter olmalıdır!")
      .required("Xananı doldur!"),
  });

  const onSubmit =async (values: any) => {
    console.log(values);
    try {
          const res = await fetch("http://localhost:3013/api/v1/auth/signUp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
          });
    
          const data=await res.json();
          console.log(data);
          if(data.success===false){
            setError(data.message);
            setSuccess("")
            return;
          }
          if(res.ok){
            setSuccess("İstifadəçi uğurla qeydiyyatdan keçdi!");
            setInterval(() => {
              setSuccess("")
            },4000);
          }
          setError("")
         } catch (error:any) {
           setError(error.message)
           setSuccess("")
         }
  };
  return (
    <div className="min-h-screen image">
      <div className="bgFon min-h-screen flex justify-center items-center">
        <div className="text-white w-[350px]">
          <h1 className="text-center text-3xl font-semibold">
            Qeydiyyatdan keç
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >{
            ((props:any)=>(
              <Form className="flex flex-col gap-3 mt-5">
              <div>
                <Label
                  htmlFor="userName"
                  value="İstifadəçi adı"
                  className="text-white text-md"
                />
                <Field
                  as={TextInput}
                  id="userName"
                  type="text"
                  placeholder="İstifadəçi adı"
                  name="userName"
                  required
                />
                <ErrorMessage name="userName" component="div" className="text-red-700"/>
              </div>
              <div>
                <Label
                  htmlFor="email"
                  value="Elektron ünvan"
                  className="text-white text-md"
                />
                <Field
                  as={TextInput}
                  id="email"
                  type="email"
                  placeholder="Elektron ünvan"
                  name="email"
                  required
                />
                <ErrorMessage name="email" component="div" className="text-red-700"/>
              </div>
              <div>
                <Label
                  htmlFor="password"
                  value="Şifrə"
                  className="text-white text-md"
                />
                <Field
                  as={TextInput}
                  id="password"
                  type="password"
                  name="password"
                />
                <ErrorMessage name="password" component="div" className="text-red-700"/>
              </div>
              <Button type="submit" disabled={props.isSubmitting} isProcessing={props.isSubmitting} className="!bg-cyan-700 hover:!bg-cyan-900">Qeydiyyatdan keç</Button>
              </Form>
            ))
          }
           
            
          </Formik>

          <p className="mt-2 text-sm">
            Hesab varsa?{" "}
            <Link to={"/sign-in"} className="text-sky-300">
              Daxil ol
            </Link>
          </p>
          {!error && success && (
            <p className="mt-2 text-sm text-green-300">{success}</p>
          )}
          {error && !success && (
            <p className="mt-2 text-sm text-red-700">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
