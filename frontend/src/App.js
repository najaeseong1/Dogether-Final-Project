import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainTemplate from './components/main/MainTemplate';
import { Router, Route, Routes } from 'react-router-dom';
import MyPage from './components/user/MyPage';
import Modify from './components/user/Modify';
import LikeList from './components/user/LikeList';
import AdoptionStatus from './components/user/AdoptionStatus';
import Login from './components/user/Login';
import Join from './components/user/Join';
import Board from './components/Board/Board';
import BoardDetail from './components/Board/BoardDetail';
import BoardList from './components/Board/BoardList';
import PageNotFound from './components/pagenotfound/PageNotFound';

function App() {
  return (
    <>
      <Header />
      <div className='wrapper'>
        <Routes>
          <Route path='/' element={<MainTemplate />} />
          <Route path='/board' element={<BoardList />} />
          <Route path='/boardRegist' element={<Board />} />
          <Route path='/boardDetail' element={<BoardDetail />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
