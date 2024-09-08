import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import NoPage from "./pages/NoPage";
import Protected from "./components/Protected";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';



function App() {
  return (
    <Router>
     <Routes>
      <Route element={<Protected/>}>
      <Route path="/" element={<Layout><Home /></Layout>} />       
      </Route>
      <Route path="*" element={<NoPage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      </Routes>
    </Router>
  )
}

export default App
