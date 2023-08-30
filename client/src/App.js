import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProtectedPage from "./components/ProtectedPage";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import Profile from "./pages/Profile";


function App() {
  const {loading} = useSelector((state)=> state.loaders);
  return (
    <div>
      {loading && <Spinner/>}
      <BrowserRouter>
      <Routes>
        {/* //wrapping the home page in a secured way so that all the checks and validations applied on
        //the portected page will also apply on the home page   */}
        <Route path="/" element={<ProtectedPage><Home/></ProtectedPage>}/>
        <Route path="/profile" element={<ProtectedPage><Profile/></ProtectedPage>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
