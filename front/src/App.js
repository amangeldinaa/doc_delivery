import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Signin from "./Pages/Auth.js";
import Courier from "./Pages/Courier";
import Psc from "./Pages/Psc";
import ClientSignin from "./Pages/User";
import AdminFirstPage from "./Pages/Admin/AdminFirstPage";
import AdminPage from "./Pages/Admin/AdminPage";
import Con from "./Pages/ConPage";
import SigninCon from "./Pages/ConPage/ConAuth";
import Cor from "./Pages/Cor";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/courier" element={<Courier />} />
          <Route path="/psc" element={<Psc />} />
          <Route path="/user" element={<ClientSignin />} />
          {/* <Route path="/admin" element={<AdminFirstPage />} /> */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/con" element={<SigninCon />} />
          <Route path="/con-info" element={<Con />} />
          <Route path="/courier-info" element={<Cor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
