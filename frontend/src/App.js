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

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content-wrapper'>
        <Routes>
          <Route path='/board' element={<BoardList />} />

          <Route path='/boardRegist' element={<Board />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
