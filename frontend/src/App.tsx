import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import NoPage from "./pages/NoPage";
import Protected from "./components/Protected";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Orders from './pages/Orders';
import NewCard from './pages/NewCard';
import NewClient from './pages/NewClient';
import ClientList from './pages/ClientList';
import UpdateClient from './pages/UpdateClient';



function App() {
  return (
    <Router>
     <Routes>
      <Route element={<Protected/>}>
      <Route path="/" element={<Layout><Home /></Layout>} />    
      <Route path="/orders" element={<Layout><Orders/></Layout>} />     
      <Route path="/newCard" element={<Layout><NewCard/></Layout>} />     
      <Route path="/newClient" element={<Layout><NewClient/></Layout>} />       
      <Route path="/clientList" element={<Layout><ClientList/></Layout>} />   
      <Route path="/updateClient/:id" element={<Layout><UpdateClient/></Layout>} />       
  
      </Route>
      <Route path="*" element={<NoPage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      </Routes>
    </Router>
  )
}

export default App
