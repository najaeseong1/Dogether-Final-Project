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
import { Board, BoardDetail, BoardList } from './components/board';
import PageNotFound from './components/pagenotfound/PageNotFound';
import {
  AdoptionList,
  AdoptionListDetail,
  AdoptionApplication,
} from './components/adopt';
import { Knowledge, Quiz } from './components/knowledges';
import ProductDetail from './components/product/ProductDetail';
import Product from './components/product/Product';
import BoardUpdate from './components/board/BoardUpdate';
import AdminMain from './components/admin/AdminMain';
import AdoptionManagement from './components/admin/AdoptionManagement';
import FindId from './components/user/FindId';
import FindPassword from './components/user/FindPassword';
import ScrollToTop from './global/ScrollToTop';
import { AuthContextProvider } from './global/utils/AuthContext';
import OrderManagement from './components/admin/OrderManagement';
import OrderHistory from './components/user/OrderHistory';
import Cart from './components/product/cart';
import KakaoLoginHandler from './components/user/KakaoLoginHandler';

function App() {
  return (
    <AuthContextProvider>
      <div className='wrapper'>
        <Header />
        <div className='content-wrapper'>
          <ScrollToTop />
          <Routes>
            <Route
              path='/user/kakaologin'
              element={<KakaoLoginHandler />}
            />
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
              path='/boardDetail/:boardNo'
              element={<BoardDetail />}
            />
            <Route
              path='/boardupdate/:boardNo'
              element={<BoardUpdate />}
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
              path='user/findid'
              element={<FindId />}
            />
            <Route
              path='/user/findpassword'
              element={<FindPassword />}
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
              path='/user/orderhistory'
              element={<OrderHistory />}
            />
            <Route
              path='/user/adoptionstatus'
              element={<AdoptionStatus />}
            />
            <Route
              path='/adopt'
              element={<AdoptionList />}
            />
            <Route
              path='/adopt/detail/:desertionNo'
              element={<AdoptionListDetail />}
            />
            <Route
              path='/contract/:userId/:desertionNo'
              element={<AdoptionApplication />}
            />
            <Route
              path='/knowledges/knowledge'
              element={<Knowledge />}
            />
            <Route
              path='/knowledges/quiz'
              element={<Quiz />}
            />
            <Route
              path='*'
              element={<PageNotFound />}
            />
            <Route
              path='/product'
              element={<Product />}
            />
            <Route
              path='/product/productdetail'
              element={<ProductDetail />}
            />
            <Route
              path='/adminmain'
              element={<AdminMain />}
            />
            <Route
              path='/AdoptionManagement'
              element={<AdoptionManagement />}
            />
            <Route
              path='/ordermanagement'
              element={<OrderManagement />}
            />
            <Route
              path='*'
              element={<PageNotFound />}
            />
            <Route
              path='/product'
              element={<Product />}
            />
            <Route
              path='/cart'
              element={<Cart />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
