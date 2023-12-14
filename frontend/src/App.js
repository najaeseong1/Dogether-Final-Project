import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainTemplate from './components/main/MainTemplate';
import Login from './components/user/Login';
import Board from './components/Board/Board';
import { Route, Routes } from 'react-router-dom';
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
