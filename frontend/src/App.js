import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainTemplate from './components/main/MainTemplate';
import Login from './components/user/Login';
import { Router, Route, Routes } from 'react-router-dom';
import Join from './components/user/Join';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content-wrapper">
        <>
          <Routes>
            <Route
              path="/user/login"
              element={<Login />}
            />
            <Route
              path="/user/Join"
              element={<Join />}
            />
          </Routes>
        </>
      </div>
      <Footer />
    </div>
  );
}

export default App;
