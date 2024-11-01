import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { successStart } from "../redux-toolkit/features/auth/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserRole } from "../enums/projectEnums";



interface SingInInitialValuesInterface{
  userName:string,
  password:string
}


const singInInitialValues:SingInInitialValuesInterface = {
  userName: "",
  password: "",
};

const signInValidationSchema = Yup.object().shape({
  userName: Yup.string().required("Xananı doldur!"),
  password: Yup.string().required("Xananı doldur!"),
});

const SignIn = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values: any, props: any) => {
    try {
      console.log(values);
      
      const res = await fetch("http://localhost:3013/api/v1/auth/signIn", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      if (data.userRole ===UserRole.ServiceUser) {
        setError("Zəhmət olmasa administratorla əlaqə saxlayın !");
        setInterval(() => {
          setError("")
        }, 5000);
        return;
      }
      if (res.ok) {
        dispatch(successStart(data));
        setTimeout(() => {
          props.resetForm();
          props.setSubmitting(false);
        }, 2000);
        navigate("/");
      }
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen image">
      <div className="bgFon min-h-screen flex justify-center items-center">
        <div className="text-white w-[350px]">
          <h1 className="text-center text-5xl font-semibold">Daxil ol</h1>
          <Formik
            initialValues={singInInitialValues}
            validationSchema={signInValidationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form className="flex flex-col gap-3 mt-5">
                <div className="flex flex-col gap-2 ">
                  <Label
                    htmlFor="userName"
                    value="İstifadəçi adı"
                    className="text-white text-md"
                  />
                  <Field
                    type="text"
                    name="userName"
                    placeholder="İstifadəçi adı"
                    as={TextInput}
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="text-red-700"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="password"
                    value="Şifrə"
                    className="text-white text-md"
                  />
                  <Field as={TextInput} type="password" name="password" />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="text-red-700"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={props.isSubmitting}
                  isProcessing={props.isSubmitting}
                  className="!bg-cyan-700 hover:!bg-cyan-900"
                >
                  Daxil ol
                </Button>
              </Form>
            )}
          </Formik>
          <p className="mt-2 text-sm">
            Hesab yoxdursa?{" "}
            <Link to={"/sign-up"} className="text-sky-300">
              Qeydiyyatdan keç
            </Link>
          </p>
          {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
