import "./App.css";
import { Header, Footer } from "./components/layout";
import MainTemplate from "./components/main/MainTemplate";
import { Router, Route, Routes } from "react-router-dom";
import {
  AdoptionStatus,
  Join,
  LikeList,
  Login,
  Modify,
  MyPage,
} from "./components/user";
import { Board, BoardDetail, BoardList } from "./components/Board";
import PageNotFound from "./components/pagenotfound/PageNotFound";
import { Knowledge, Quiz } from "./components/knowledges";

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
        <Route
          path="/quiz"
          element={<Quiz />}
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
