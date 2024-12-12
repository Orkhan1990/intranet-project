import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "flowbite-react";

interface ClientInterface {
  id: number;
  companyName: string;
  av: number;
  partsDiscount: number;
}



const ClientList = () => {
  const [clients, setClients] = useState<ClientInterface[]>([]);
  const [error, setError] = useState(false);
 


  useEffect(() => {
    const getAllClients = async () => {
      try {
        const res = await fetch(
          "http://localhost:3013/api/v1/client/getClients",
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
        }
        setClients(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    getAllClients();
  }, []);

  const handleChange = (id:number,field:string,value:number) => {
    setClients((prevClients)=>prevClients.map((client)=>client.id===id?{...client,[field]:value}:client));
  };

  
  const handleSubmit = async (id: number) => {

    const clientUpdate=clients.find(client=>client.id===id);

    if(!clientUpdate){
      return;
    }


    try {
      const res = await fetch(
        `http://localhost:3013/api/v1/client/discountClient/${id}`,
        {
          method: "POST",
          credentials: "include", // added this part
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clientUpdate),
        }
      );

      const data = await res.json();
      console.log(data);
    } catch (error: any) {
      setError(error.message);
    }
  };


  
  return (
    <div className="min-h-screen p-10">
      <form action="">
        <Table>
          <Table.Head>
            <Table.HeadCell>Say</Table.HeadCell>
            <Table.HeadCell>Şirkət adı</Table.HeadCell>
            <Table.HeadCell>AV</Table.HeadCell>
            <Table.HeadCell>Ehtiyyat hissəsi</Table.HeadCell>
            <Table.HeadCell>Ehtiyyat hissəsi</Table.HeadCell>
            <Table.HeadCell>Ehtiyyat hissəsi</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {clients.map((item: ClientInterface, index: number) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.companyName}
                </Table.Cell>
                <Table.Cell>
                  <input
                    onBlur={() => handleSubmit(item.id)}
                    type="text"
                    name="av"
                    onChange={(e)=>handleChange(item.id,"av",Number(e.target.value))}
                    className="border border-black outline-none w-10 p-1"
                    value={item.av}
                  />
                </Table.Cell>
                <Table.Cell>
                  <input
                    onBlur={() => handleSubmit(item.id)}
                    type="text"
                    name="partsDiscount"
                    onChange={(e)=>handleChange(item.id,"partsDiscount",Number(e.target.value))}
                    className="border border-black outline-none w-10 p-1"
                    value={item.partsDiscount}
                  />
                </Table.Cell>
                <Table.Cell>
                  <input
                    onBlur={() => handleSubmit(item.id)}
                    type="text"
                    name="partsDiscount"
                    onChange={(e)=>handleChange(item.id,"partsDiscount",Number(e.target.value))}
                    className="border border-black outline-none w-10 p-1"
                    value={item.partsDiscount}
                  />
                </Table.Cell>
                <Table.Cell>
                  <input
                    onBlur={() => handleSubmit(item.id)}
                    type="text"
                    name="partsDiscount"
                    onChange={(e)=>handleChange(item.id,"partsDiscount",Number(e.target.value))}
                    className="border border-black outline-none w-10 p-1"
                    value={item.partsDiscount}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/updateClient/${item.id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </form>
      <Link to="/newClient" ><Button color={"blue"} className="my-5" size={"xs"}>Əlavə et +</Button></Link>

    </div>
  );
};

export default ClientList;
