import './App.css';
import { Header, Footer } from './components/layout';
import MainTemplate from './components/main/MainTemplate';
import { Router, Route, Routes } from 'react-router-dom';
import {
  AdoptionStatus,
  Join,
  LikeList,
  Login,
  Modify,
  MyPage,
} from './components/user';
import { Board, BoardDetail, BoardList } from './components/Board';
import PageNotFound from './components/pagenotfound/PageNotFound';
import {
  AdoptionList,
  AdoptionListDetail,
  AdoptionApplication,
} from './components/adopt';
import { Knowledge } from './components/knowledges';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content-wrapper'>
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
            path='/user/Join'
            element={<Join />}
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
            path='/adoptionlist'
            element={<AdoptionList />}
          />
          <Route
            path='/adoptionlistdetail'
            element={<AdoptionListDetail />}
          />
          <Route
            path='/adoptionapplication'
            element={<AdoptionApplication />}
          />
          <Route
            path='/knowledges/knowledge'
            element={<Knowledge />}
          />
          <Route
            path='*'
            element={<PageNotFound />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
