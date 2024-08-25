import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import SignIn from "./pages/SignIn";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";
import Protected from "./components/Protected";
import Layout from "./components/Layout";
import NewCard from "./pages/NewCard";
import NewClient from "./pages/NewClient";
import ClientList from "./pages/ClientList";
import UpdateClient from "./pages/UpdateClient";
import SignInn from "./pages/SignInn";
import Orders from "./pages/Orders";


function App() {

  return (
    <Router>
    <Routes>
      <Route element={<Protected/>}>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/newcard" element={<Layout><NewCard/></Layout>} />
        <Route path="/newcard" element={<Layout><NewCard/></Layout>} />
        <Route path="/newClient" element={<Layout><NewClient/></Layout>} />
        <Route path="/clientList" element={<Layout><ClientList/></Layout>} />
        <Route path="/updateClient/:id" element={<Layout><UpdateClient/></Layout>} />
        <Route path="/orders" element={<Layout><Orders/></Layout>} />

      </Route>
      <Route path="*" element={<NoPage />} />
      <Route path="/sign-in" element={<SignInn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  </Router>
  )
}

export default App
