import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userProfile } from './Actions/userAction.js';
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import Header from "./Components/Header/Header.jsx";
import HomePage from './Components/HomePage/HomePage.jsx';
import CreateCarPage from './Components/CreateCarPage/CreateCarPage.jsx';
import CarDetailsPage from './Components/CarDetailsPage/CarDetailsPage.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-car" element={<CreateCarPage/>}/>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/car/:id" element={<CarDetailsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
