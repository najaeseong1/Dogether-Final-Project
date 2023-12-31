import React from 'react';
import './AdminMain.scss';
import { useNavigate } from 'react-router-dom';

const AdminMain = () => {
  const redirection = useNavigate();

  const toLink = (loc) => {
    redirection(loc);
  };

  return (
    <>
      <div className='mainmain'>
        <div className='management'>
          <div className='title-management'>
            {/* <p className='logo'>Dogether</p> */}
          </div>

          <div className='profil'>여기는 관리자 계정입니다.</div>
          <div className='img'> </div>
          <div className='header-left'>
            <ul className='left-menu'>
              <button
                className='main-btn'
                onClick={() => toLink('/ordermanagement')}
              >
                주문관리
              </button>
              <button
                className='main-btn'
                onClick={() => toLink('/adoptionmanagement')}
              >
                입양관리
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMain;
