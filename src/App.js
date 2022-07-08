import ReactDOM from 'react-dom';
import LoginScreen from './Component/loginScreen';
import Questions from './Component/questions';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DetailsFill from './Component/details';

function App() {
  // const PrivateOutlet = () => {
  //   const token = localStorage.getItem("token");
  //   return token ? <Outlet /> : <Navigate to="/" />;
  // };
  // const UserRoute = () => {
  //   const userRole = localStorage.getItem("userRole");
  //   return userRole === "simple" ? <Outlet /> : <Navigate to="/" />;
  // };
  // const AdminRoute = () => {
  //   const userRole = localStorage.getItem("userRole");
  //   return userRole === "admin" ? <Outlet /> : <Navigate to="/" />;
  // };
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="details" element= {<DetailsFill />} />
      <Route path="questions" element={<Questions />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
