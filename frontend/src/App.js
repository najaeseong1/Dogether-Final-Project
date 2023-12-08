import logo from './logo.svg';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import MainTemplate from './main/MainTemplate';
import Login from './user/Login';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content-wrapper'></div>
      <Footer />
    </div>
  );
}

export default App;
