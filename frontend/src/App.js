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
    <div className='wrapper'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />

              <Footer />
            </>
          }
        />

        <Route
          path='/board'
          element={
            <>
              <Header />
              <BoardList />
              <Footer />
            </>
          }
        />
        <Route
          path='/boardRegist'
          element={
            <>
              <Header />
              <Board />
              <Footer />
            </>
          }
        />
        <Route
          path='/boardDetail'
          element={
            <>
              <Header />
              <BoardDetail />
              <Footer />
            </>
          }
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
