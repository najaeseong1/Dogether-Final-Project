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
    <div className="wrapper">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<MainTemplate />}
        />
        <Route
          path="/board"
          element={<BoardList />}
        />
        <Route
          path="/boardRegist"
          element={<Board />}
        />
        <Route
          path="/boardDetail"
          element={<BoardDetail />}
        />
        <Route
          path="/user/login"
          element={<Login />}
        />
        <Route
          path="/user/Join"
          element={<Join />}
        />
        <Route
          path="/user/mypage"
          element={<MyPage />}
        />
        <Route
          path="/user/modify"
          element={<Modify />}
        />
        <Route
          path="/user/likelist"
          element={<LikeList />}
        />
        <Route
          path="/user/adoptionstatus"
          element={<AdoptionStatus />}
        />
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
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
