import React from 'react';
import './AdminMain.scss';
import { useNavigate } from 'react-router-dom';

const AdminMain = () => {
  const redirection = useNavigate();
  const toLink = (loc) => {
    redirection(loc);
  };
  return (
    <div className='management'>
      <div
        onClick={() => toLink('/adoptionmanagement')}
        className='adoption-management'
      >
        <p>입양관리</p>
      </div>
      <div
        onClick={() => toLink('/ordermanagement')}
        className='order-management'
      >
        <p>주문관리</p>
      </div>
    </div>
  );
};

export default AdminMain;
