import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NoPage from "./pages/NoPage";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import SignUp from "./pages/Auth/SignUp";
import NewCard from "./pages/NewCard";
import NewClient from "./pages/Client/NewClient";
import ClientList from "./pages/Client/ClientList";
import ImportWarehouse from "./pages/Warehouse/ImportWarehouse";
import Suppliers from "./pages/Supplier/Suppliers";
import UpdateClient from "./pages/Client/UpdateClient";
import AddSuppliers from "./pages/Supplier/AddSuppliers";
import SignIn from "./pages/Auth/SignIn";
import UpdateSupplier from "./pages/Supplier/UpdateSupplier";
import Warehouse from "./pages/Warehouse/Warehouse";
import CreateOrders from "./pages/Order/CreateOrders";
import Order from "./pages/Order/Order";
import EditOrder from "./pages/Order/EditOrder";
import Calculation from "./pages/Calculation/Calculation";
import PriceList from "./pages/PriceList/PriceList";
import Statistics from "./pages/Statistics/Statistics";
import ImportPrixod from "./pages/Prixod/ImportPrixod";
import { PrixodList } from "./pages/Prixod/PrixodList";
import NotConfirmPrixod from "./pages/Prixod/NotConfirmPrixod";
import EditPrixod from "./pages/Prixod/EditPrixod";
import WorkerPercentage from "./pages/WorkerPercentage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Protected />}>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/createOrder"
            element={
              <Layout>
                <CreateOrders />
              </Layout>
            }
          />
          <Route
            path="/newCard"
            element={
              <Layout>
                <NewCard />
              </Layout>
            }
          />
          <Route
            path="/newClient"
            element={
              <Layout>
                <NewClient />
              </Layout>
            }
          />
          <Route
            path="/clientList"
            element={
              <Layout>
                <ClientList />
              </Layout>
            }
          />
          <Route
            path="/updateClient/:id"
            element={
              <Layout>
                <UpdateClient />
              </Layout>
            }
          />
          <Route
            path="/importWarehouse"
            element={
              <Layout>
                <ImportWarehouse />
              </Layout>
            }
          />
          <Route
            path="/wareHouse"
            element={
              <Layout>
                <Warehouse />
              </Layout>
            }
          />
          <Route
            path="/suppliers"
            element={
              <Layout>
                <Suppliers />
              </Layout>
            }
          />
          <Route
            path="/newSuppliers"
            element={
              <Layout>
                <AddSuppliers />
              </Layout>
            }
          />
          <Route
            path="/updateSupplier/:id"
            element={
              <Layout>
                <UpdateSupplier />
              </Layout>
            }
          />
          <Route
            path="/orders"
            element={
              <Layout>
                <Order />
              </Layout>
            }
          />
          <Route
            path="/editOrder/:id"
            element={
              <Layout>
                <EditOrder />
              </Layout>
            }
          />
          <Route path="/calculation" element={<Calculation />} />
          <Route
            path="/priceList"
            element={
              <Layout>
                <PriceList />
              </Layout>
            }
          />
          <Route
            path="/statistics"
            element={
              <Layout>
                <Statistics />
              </Layout>
            }
          />
          <Route
            path="/importPrixod"
            element={
              <Layout>
                <ImportPrixod />
              </Layout>
            }
          />

           <Route
            path="/prixodList"
            element={
              <Layout>
                <PrixodList/>
              </Layout>
            }
          />

           <Route
            path="/prixod5"
            element={
              <Layout>
                <NotConfirmPrixod/>
              </Layout>
            }
          />

            <Route
            path="/editPrixod/:id"
            element={
              <Layout>
                <EditPrixod/>
              </Layout>
            }
          />

            <Route
            path="/workerPercentage"
            element={
              <Layout>
                <WorkerPercentage/>
              </Layout>
            }
          />

          
        </Route>
        <Route path="*" element={<NoPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
