import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import NoPage from "./pages/NoPage";
import Protected from "./components/Protected";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Orders from './pages/OrderParts';
import NewCard from './pages/NewCard';
import NewClient from './pages/NewClient';
import ClientList from './pages/ClientList';
import UpdateClient from './pages/UpdateClient';
import ImportWarehouse from './pages/ImportWarehouse';
import Suppliers from './pages/Suppliers';
import AddSuppliers from './pages/AddSuppliers';



function App() {
  return (
    <Router>
     <Routes>
      <Route element={<Protected/>}>
      <Route path="/" element={<Layout><Home /></Layout>} />    
      <Route path="/orderParts" element={<Layout><Orders/></Layout>} />     
      <Route path="/newCard" element={<Layout><NewCard/></Layout>} />     
      <Route path="/newClient" element={<Layout><NewClient/></Layout>} />       
      <Route path="/clientList" element={<Layout><ClientList/></Layout>} />   
      <Route path="/updateClient/:id" element={<Layout><UpdateClient/></Layout>} />
      <Route path="/importWarehouse" element={<Layout><ImportWarehouse/></Layout>} />    
      <Route path="/suppliers" element={<Layout><Suppliers/></Layout>} /> 
      <Route path="/newSuppliers" element={<Layout><AddSuppliers/></Layout>} />       
      
   
       
      </Route>
      <Route path="*" element={<NoPage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      </Routes>
    </Router>
  )
}

export default App
