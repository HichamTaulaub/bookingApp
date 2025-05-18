import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import PaymentPage from "./pages/payment/PaymentPage";
import Agadir from "./pages/list/Agadir";
import './main.css';
import Onlyhotels from "./pages/list/Onlyhotels";



function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
        <Route path="/agadir" element={<Agadir/>}/>
        <Route path="/paris" element={<Agadir/>}/>
        <Route path="/london" element={<Agadir/>}/>
         <Route path="/hotel" element={<Onlyhotels/>}/>
         <Route path="/apartments" element={<Onlyhotels/>}/>
         <Route path="/resorts" element={<Onlyhotels/>}/>
         <Route path="/villas" element={<Onlyhotels/>}/>
         <Route path="/cabins" element={<Onlyhotels/>}/>
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
