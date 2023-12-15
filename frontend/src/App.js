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
import Join from './components/user/Join';
import Modify from './components/user/Modify';
import MyPage from './components/user/MyPage';
import LikeList from './components/user/LikeList';
import AdoptionStatus from './components/user/AdoptionStatus';
import ProductDetail from './components/product/ProductDetail';
import Product from './components/product/Product';

function App() {
  return (
    <>
      <Header />
      <div className='wrapper'>
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
            path='/user/join'
            element={<Join />}
          />
          <Route
            path='/user/login'
            element={<Login />}
          />
          <Route
            path='*'
            element={<PageNotFound />}
          />
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
          <Route
            path='/product'
            element={<Product />}
          />
          <Route
            path='/product/productdetail'
            element={<ProductDetail />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
