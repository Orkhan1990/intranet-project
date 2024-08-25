import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { successStart } from "../redux/features/auth/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const singInInitialValues = {
  username: "",
  password: "",
};

const signInValidationSchema = Yup.object().shape({
  username: Yup.string().required("Xananı doldur!"),
  password: Yup.string().required("Xananı doldur!"),
});

const SignInn = () => {
  const [error, setError] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
    const navigate = useNavigate();
    const dispatch = useDispatch();
//   console.log(formData);

  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.id]: e.target.value });
  //   };
  //   const handleFormSubmit = async (e) => {
  //     e.preventDefault();
  //     if (
  //       formData.username === "" ||
  //       formData.email === "" ||
  //       formData.password === ""
  //     ) {
  //       return setError("Xanaları doldur!!");
  //     }

  //     try {
  //       const res = await fetch("http://localhost:3004/api/v1/auth/signIn", {
  //         method: "POST",
  //         credentials: "include", // added this part
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       const data = await res.json();
  //       console.log(data);
  //       if (data.success === false) {
  //         setError(data.message);
  //         return;
  //       }
  //       if (data.isWorker === true && !data.isAdmin) {
  //         setError("Zəhmət olmasa administratorla əlaqə saxlayın !");
  //         return;
  //       }
  //       if (res.ok) {
  //         dispatch(successStart(data));
  //         navigate("/");
  //       }
  //       setError("");
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };

  const onSubmit = async (values, props) => {
    try {
      const res = await fetch("http://localhost:3004/api/v1/auth/signIn", {
        method: "POST",
        credentials: "include", // added this part
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
      if (data.isWorker === true && !data.isAdmin) {
        setError("Zəhmət olmasa administratorla əlaqə saxlayın !");
        return;
      }
      if (res.ok) {
        dispatch(successStart(data));
        setTimeout(()=>{
            props.resetForm()
            props.setSubmitting(false)
        },2000)
        navigate("/");
      }
      setError("");
    } catch (error) {
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
                    htmlFor="username"
                    value="İstifadəçi adı"
                    className="text-white text-md"
                  />
                  <Field
                    type="text"
                    name="username"
                    placeholder="İstifadəçi adı"
                    as={TextInput}
                  />
                  {props.errors.username&& (<p className="text-sm text-red-500">{props.errors.username}</p>)}
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="password"
                    value="Şifrə"
                    className="text-white text-md"
                  />
                  <Field 
                  as={TextInput} 
                  type="password"
                   name="password"
                   />
                {props.errors.password&& (<p className="text-sm text-red-500">{props.errors.password}</p>)}

                </div>
                <Button type="submit" disabled={props.isSubmitting}>Daxil ol</Button>
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

export default SignInn;