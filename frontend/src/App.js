import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainTemplate from './components/main/MainTemplate';

import { Route, Routes } from 'react-router-dom';
import MyPage from './components/user/MyPage';
import Modify from './components/user/Modify';
import LikeList from './components/user/LikeList';
import AdoptionStatus from './components/user/AdoptionStatus';
import Login from './components/user/Login';
import Board from './components/Board/Board';

import BoardDetail from './components/Board/BoardDetail';
import BoardList from './components/Board/BoardList';
import PageNotFound from './components/pagenotfound/PageNotFound';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<MainTemplate />}
        />
        <Route
          path='/board'
          element={<BoardList />}
        />
        <Route
          path='/boardRegist'
          element={<Board />}
        />
        <Route
          path='/boardDetail'
          element={<BoardDetail />}
        />
        <Route
          path='/user/login'
          element={<Login />}
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
        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
