import { useState } from 'react'
import { Button, Label, TextInput } from "flowbite-react";
import {Link} from "react-router-dom";
import { Form, Formik } from 'formik';




interface SignUpInterface{
  userName:string,
  email:string,
  password:string
}


const SignUp = () => {
  const[error,setError]=useState("");
  const[success,setSuccess]=useState("");
 
   const initialValues:SignUpInterface={
    userName:"",
    email:"",
    password:""
   }

  const onSubmit=async(e:any,values:any)=>{
    e.preventDefault();
    if(values.userName===""||values.email===""||values.password===""){
      return setError("Xanaları doldur!!")
    }
     try {
      const res = await fetch("http://localhost:3004/api/v1/auth/signUp", {
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
        setSuccess("İstifadəçi uğurla qeydiyyatdan keçdi!")
      }
      setError("")
     } catch (error:any) {
       setError(error.message)
       setSuccess("")
     }
  }
  return (
    <div className='min-h-screen image'>
        <div className='bgFon min-h-screen flex justify-center items-center'>
            <div className='text-white w-[350px]'>
                <h1 className='text-center text-3xl font-semibold'>Qeydiyyatdan keç</h1>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                  <Form className='flex flex-col gap-3 mt-5'>
                  <div>
                    <Label htmlFor="userName" value="İstifadəçi adı"  className='text-white text-md'/>
                    <TextInput id="userName" type="text" placeholder="İstifadəçi adı" required  name="userName"/>
                    </div>
                    <div>
                    <Label htmlFor="email" value="Elektron ünvan"  className='text-white text-md'/>
                    <TextInput id="email" type="email" placeholder="Elektron ünvan" required name="email"/>
                    </div>
                    <div>
                    <Label htmlFor="password" value="Şifrə" className='text-white text-md'/>
                    <TextInput id="password" type="password"  name="password"/>
                    </div>
                    <Button type='submit'>Qeydiyyatdan keç</Button>
                  </Form>
                </Formik>
                <p className='mt-2 text-sm'>Hesab varsa? <Link to={"/sign-in"} className='text-sky-300' >Daxil ol</Link></p>
                {
                  !error&&success&&(<p className='mt-2 text-sm text-green-300'>{success}</p>)
                }
                 {
                  error&&!success&&(<p className='mt-2 text-sm text-red-700'>{error}</p>)
                }

            </div>
        </div>
    </div>
  )
}

export default SignUp