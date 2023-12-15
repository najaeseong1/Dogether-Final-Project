import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainTemplate from './components/main/MainTemplate';
import Login from './components/user/Login';
import AdoptionList from './components/adopt/AdoptionList';
import { Route, Routes } from 'react-router-dom';
import AdoptionListDetail from './components/adopt/AdoptionListDetail';
import AdoptionApplication from './components/adopt/AdoptionApplication';
import Knowledge from './components/knowledges/Knowledge';
import Join from './components/user/Join';


function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content-wrapper'>
       
        <Routes>

          <Route
            path='/AdoptionList'
            element={<AdoptionList />}
          />
          <Route
            path='/AdoptionListDetail'
            element={<AdoptionListDetail />}
          />
          <Route 
            path='/AdoptionApplication'
            element={<AdoptionApplication />}
          />
          <Route 
            path='/Knowledge'
            element={<Knowledge/>}
          />
          <Route
            path='/Login'
            element={<Login/>}
          />
          <Route
            path='/Join'
            element={<Join/>}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
