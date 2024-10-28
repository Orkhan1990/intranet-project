import { Button, Checkbox, Select, Table, Textarea, TextInput } from "flowbite-react";
import { Field, FieldArray, Form, Formik } from "formik";
import { DeliverType, Liquidity,OrderType, PayType } from "../enums/projectEnums";
import { OrdersInterface } from "../types";

const Orders = () => {



  const produceDateData:string[]=["2024","2023","2022","2021","2020","2019","2018"]

 const ordersInitialValue:OrdersInterface={
  project:"",
  cardNumberId:0,
  orderType:OrderType.Local_Market,
  clientId:0,
  brandId:0,
  model:"",
  chassisNumber:"",
  engineNumber:"",
  produceDate:"",
  probeg:"",
  gosNumberL:"",
  payType:PayType.Transfer,
  deliverPeriod:DeliverType.Fast,
  deliverMethod:"",
  prepayment:0,
  comment:"",
  oil:false,
  parts:[
    {
      partNumber:"",
      count:0,
      checkOnWarehouse:false,
      partName:""
    }
  ]
 }

  const onsubmit=(values:OrdersInterface)=>{
    console.log(values);
  }


  
  return (
    <div className="min-h-screen mt-[100px] mb-[100px]">
    <h2 className="font-semibold text-xl text-center  mb-[50px]">
      Ehtiyyat hissə sifarişi
    </h2>
      <Formik initialValues={ordersInitialValue} onSubmit={onsubmit}>
        {({ values,setFieldValue }) => (
          <Form className="ml-[90px] w-full">
            <div className="flex  items-center ">
              <label htmlFor="" className="text-sm  w-[200px]">
                Proyekt
              </label>
              <Field as={Select} name="project">
                <option value="project1">Project 1</option>
              </Field>
            </div>

            <div className="flex  items-center mt-5 ">
              <label htmlFor="" className="text-sm  w-[200px]">
                Kart nömrəsi
              </label>
              <Field as={Select} name="cardNumberId" >
                <option value="1">1</option>
                <option value="2">2</option>
              </Field>
            </div>

            <div className="flex  items-center mt-5 ">
              <label htmlFor="" className="text-sm  w-[200px]">
                Sifarişin tipi
              </label>
              <Field as={Select} name="cardNumberId" >
                <option value={OrderType.Standart_Client}>Standart (müştəri)</option>
                <option value={OrderType.Local_Market}>Yerli bazar</option>
                <option value={OrderType.Stok}>Stok</option>
              </Field>
            </div>

            <div className="flex  items-center mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Müştəri
              </label>
              <Field as={Select} name="market" className="w-32">
                <option value="zqan">Zqan</option>
                <option value="avrora">Avrora</option>
              </Field>
            </div>

            <div className="flex  items-center mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Istehsalçı
              </label>
              <Field as={Select} name="paymentType" className="w-32">
                <option value="man">Man</option>
                <option value="bobcat">Bobcat</option>
                <option value="sumitomo">Sumitomo</option>
              </Field>
            </div>

            <div className="flex  items-start mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Model
              </label>
              <Field as={TextInput}  name="comment" className="w-64" />
            </div>

            <div className="flex  items-start mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Şassi nömrəsi
              </label>
              <Field as={TextInput}  name="comment"  className="w-64"/>
              <span className="text-red-700 ml-4 text-lg">*</span>
            </div>

            <div className="flex  items-start mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Mühərrik nömrəsi
              </label>
              <Field as={TextInput}  name="comment"  className="w-64"/>
              <span className="text-red-700 ml-4 text-lg">*</span>
            </div>

            <div className="flex  items-center mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Buraxılış ili
              </label>
              <Field as={Select} name="paymentType" className="w-32">
                {
                  produceDateData.map((item:string)=>(
                    <option value={item}>{item}</option>
                  ))
                }
              </Field>
            </div>

            <div className="flex  items-start mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Km/saat
              </label>
              <Field as={TextInput}  name="comment"  className="w-64"/>
              <span className="text-red-700 ml-4 text-lg">*</span>
            </div>

            <div className="flex  items-start mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Maşın nömrəsi
              </label>
              <Field as={TextInput}  name="comment"  className="w-64"/>
              <span className="text-red-700 ml-4 text-lg">*</span>
            </div>

            <div className="flex  items-center mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Ödəniş üsulu
              </label>
              <Field as={Select} name="paymentType" className="w-32">
                <option value={PayType.Transfer}>Köçürmə</option>
                <option value={PayType.Cash}>Nağd</option>
              </Field>
            </div>


            <div className="flex  items-center mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
                Çatdırılma 
              </label>
              <Field as={Select} name="paymentType">
                <option value={DeliverType.Fast}>Təcili (7-15 gün)</option>
                <option value={DeliverType.Normal_Fast}>Orta (15-30 gün)</option>
                <option value={DeliverType.Planned}>Planlaşdırılmış (40-60 gün)</option>
              </Field>
            </div>

            <div className="flex  items-center mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
              Çatdırılma üsulu
              </label>
              <Field as={Select} name="paymentType">
                <option value="simplified">Sadələşmiş</option>
                <option value="standart">Standart</option>
              </Field>
            </div>


            <div className="flex  items-center mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
              İlkin ödəniş
              </label>
              <Field as={Select} name="paymentType">
                <option value="0">0%</option>
                <option value="65">65%</option>
              </Field>
            </div>

            <div className="flex  items-center mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
              Şərh
              </label>
              <Field as={Textarea} rows={5} name="paymentType" className="w-96"/>
            </div>

            <div className="flex  items-center mt-5">
              <label htmlFor="" className="text-sm  w-[200px]">
              Yağ
              </label>
              <Field as={Checkbox}  name="paymentType" />
            </div>

            <div className="mt-10 ">
              <FieldArray name="parts">
                {({ push, remove }) => (
                  <div className="border text-sm w-[90%] p-5 rounded-md ">
                    <Table className="flowbite-table">
                      <Table.Head>
                        <Table.HeadCell>№</Table.HeadCell>
                        <Table.HeadCell>Kod</Table.HeadCell>
                        <Table.HeadCell>Original Kod</Table.HeadCell>
                        <Table.HeadCell>Adı</Table.HeadCell>
                        <Table.HeadCell>Brend</Table.HeadCell>
                        <Table.HeadCell>Likvidlik</Table.HeadCell>
                        <Table.HeadCell>Say</Table.HeadCell>
                        <Table.HeadCell>Qiymet</Table.HeadCell>
                        <Table.HeadCell>Satış Qiyməti</Table.HeadCell>
                      </Table.Head>
                      {/* {values.parts.map((_, index) => (
                        <NewPartsComponent
                          name={`parts[${index}]`}
                          key={index}
                          index={index}
                        />
                      ))} */}
                    </Table>
                    <div className="flex gap-5">
                      <Button
                        color="blue"
                        size="xs"
                        className="mt-5"
                        onClick={() =>
                          push({
                            kod: "",
                            origKod: "",
                            nameParts: "",
                            brand: 0,
                            liquidity: Liquidity.Fast,
                            count: 0,
                            price: 0,
                            salesPrice: 0,
                          })
                        }
                      >
                        Əlavə et <span className="ml-2 ">+</span>
                      </Button>
                      <Button
                        size="xs"
                        color="blue"
                        className="mt-5"
                        onClick={() => {
                          if (values.parts.length > 1) {
                            remove(values.parts.length - 1);
                          }
                        }}
                      >
                        Azalt <span className="ml-2 ">-</span>
                      </Button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="mt-10 flex justify-between mr-[130px] ">
            <div className="flex items-center">
                <label htmlFor="fileUpload" className="text-sm w-[200px]">
                  Excel Fayl Yüklə
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  accept=".xlsx, .xls"
                  className="ml-2 text-sm"
                />
              </div>
              <div>
                <div className="w-[400px] flex flex-col gap-2">
                  <h2>Mesaj</h2>
                  <Field as={Textarea} rows={5} name="message" />
                  <Button color={"blue"} className="w-20" size={"xs"}>
                    Mesaj Yaz
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-20">
              <Button size={"sm"} color={"blue"}>
                Yadda Saxla
              </Button>
              <Button size={"sm"} color={"blue"}>
                Təsdiqlə
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Orders