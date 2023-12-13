import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainTemplate from './components/main/MainTemplate';

import { Route, Routes } from 'react-router-dom';
import MyPage from './components/user/MyPage';
import Modify from './components/user/Modify';
import LikeList from './components/user/LikeList';
import AdoptionStatus from './components/user/AdoptionStatus';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content-wrapper'></div>
      <Routes>
        <Route
          path='/'
          element={<MainTemplate />}
        />

        <Route
          path='/user/mypage'
          element={<MyPage />}
        />
        <Route
          path='/user/modify'
          element={<Modify />}
        />
        <Route
          path='/user/likelist'
          element={<LikeList />}
        />
        <Route
          path='/user/adoptionstatus'
          element={<AdoptionStatus />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
