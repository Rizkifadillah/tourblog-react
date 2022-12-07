import './App.css';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authSlice';
import AddEditTour from './pages/AddEditTour';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user))
  },[])  

//   const clientId = '118153928101-f0d6gjhtb4rq2f8m5o314o8vnj49qpj7.apps.googleusercontent.com';

//   useEffect(() => {
//    const initClient = () => {
//          gapi.client.init({
//          clientId: clientId,
//          scope: ''
//        });
//     };
//     gapi.load('client:auth2', initClient);
// });
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/addTour" element={<AddEditTour/>} />
          <Route path="/editTour/:id" element={<AddEditTour/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
