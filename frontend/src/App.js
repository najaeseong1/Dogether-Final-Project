import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MainTemplate from './components/main/MainTemplate';
import Login from './components/user/Login';

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
