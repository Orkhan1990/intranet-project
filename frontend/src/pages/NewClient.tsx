import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import {useSelector} from "react-redux";

const NewClient = () => {
  const [formData, setFormData] = useState({});
  const[error,setError]=useState(false);
  const[success,setSuccess]=useState("");

const {currentUser}=useSelector(state=>state.auth);


  // console.log(currentUser);
  console.log(formData);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await fetch("http://localhost:3004/api/v1/client/clientCreate", {
        method: "POST",
        credentials: "include", // added this part
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      
      const data=await res.json();
       if(!res.ok||data.success===false){
        setError(data.message.sqlMessage)
        setSuccess("")
       }
      //  console.log(data);
       if(res.ok){
         setSuccess(`${formData.companyName} şirkəti yaradıldı`);
         setError("")
       }

      
    } catch (error) {
      setError(error.message);
    }
  };
  const handleChange = async (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  };

  return (
    <div className="min-h-screen ">
      <div className="m-10 max-w-2xl mx-auto">
        <h2 className="text-2xl text-center font-semibold">Yeni müştəri</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="companyName" value="Şirkət adı" />
            <TextInput
              id="companyName"
              type="text"
              placeholder="Şirkət adı"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="companyRepresentative" value="Şirkət nümayəndəsi" />
            <TextInput
              id="companyRepresentative"
              type="text"
              placeholder="Şirkət nümayəndəsi"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber" value="Telefon nömrəsi" />
            <TextInput
              id="phoneNumber"
              type="text"
              placeholder="Telefon nömrəsi"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="address" value="Ünvan" />
            <TextInput
              id="address"
              type="text"
              placeholder="Ünvan"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="requisite" value="Rekvizit" />
            <Textarea
              id="requisite"
              type="text"
              placeholder="Rekvizitlər...."
              rows={4}
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="voen" value="Vöen" />
            <TextInput id="voen" type="text" placeholder="Vöen" required onChange={handleChange}/>
          </div>

          <div>
            <Label htmlFor="contractNumber" value="Müqavilə nömrəsi" />
            <TextInput
              id="contractNumber"
              type="text"
              placeholder="Müqavilə nömrəsi"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="contractDate" value="Müqavilə tarixi" />
            <TextInput
              id="contractDate"
              type="text"
              placeholder="Müqavilə tarixi"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="approver" value="Təsdiq edən şəxs" />
            <TextInput
              id="approver"
              type="text"
              placeholder="Təsdiq edən şəxs"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="oneCCode" value="1C kod" />
            <TextInput
              id="oneCCode"
              type="text"
              placeholder="1C kod"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-20">
            <div>
              <Label htmlFor="type" value="Tipi" />
              <Select id="type" required onChange={handleChange}>
                <option value={"customer"}>Müştəri</option>
                <option value={"worker"}>Işçi</option>
                <option value={"boss"}>Təsisçi</option>
                <option value={"itb"}>İTB</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="typeOfStatus" value="FizikiHüquqi" />
              <Select id="typeOfStatus" required onChange={handleChange}>
                <option value={"phisical"}>Fiziki</option>
                <option value={"legal"}>Hüquqi</option>
              </Select>
            </div>
          </div>
          <Button type="submit" color="blue" className="w-[200px]">
            Yadda Saxla
          </Button>
        </form>
        {
          error&&<p className="text-red-600">{error}</p>
        }
        {
          success&&!error&&<p className="text-green-600 mt-5">{success}</p>
        }
      </div>
    </div>
  );
};

export default NewClient;